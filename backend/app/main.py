"""FastAPI application entry point for the virtual mouse backend."""

from __future__ import annotations

import threading
import time
from contextlib import asynccontextmanager
from typing import Dict, Optional

import cv2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import FRONTEND_ORIGIN, TARGET_FPS
from app.routers import control, websocket
from app.services.camera_service import CameraService
from app.services.gesture_classifier import GestureClassifier
from app.services.hand_detector import HandDetector
from app.services.mouse_controller import MouseController


class AppState:
    """Holds shared state for the virtual mouse system."""

    def __init__(self) -> None:
        """Initialize shared state and services."""

        self.camera_service = CameraService()
        self.hand_detector = HandDetector()
        self.gesture_classifier = GestureClassifier()
        self.mouse_controller = MouseController()
        self.system_state = "stopped"
        self.hand_detected = False
        self.current_gesture: Optional[str] = None
        self.finger_states: Dict[str, bool] = {
            "thumb": False,
            "index": False,
            "middle": False,
            "ring": False,
            "pinky": False,
        }
        self.confidence = 0.0
        self.fps = 0
        self.sensitivity = 5
        self.cursor_position = {"x": 0, "y": 0}
        self._process_thread: Optional[threading.Thread] = None
        self._processing = False
        self._frame_lock = threading.Lock()
        self._latest_frame: Optional[cv2.Mat] = None
        self._previous_landmarks = None
        self._last_fps_time = time.monotonic()
        self._frame_count = 0

    def start(self) -> bool:
        """Start camera capture and processing thread."""

        self.camera_service.start()
        if not self.camera_service.is_active():
            return False
        start_time = time.monotonic()
        while time.monotonic() - start_time < 1.0:
            if self.camera_service.get_frame() is not None:
                break
            time.sleep(0.05)
        else:
            self.camera_service.stop()
            return False
        self.system_state = "running"
        self._processing = True
        if not self._process_thread or not self._process_thread.is_alive():
            self._process_thread = threading.Thread(target=self._process_loop, daemon=True)
            self._process_thread.start()
        return True

    def stop(self) -> None:
        """Stop processing and release resources."""

        self.system_state = "stopped"
        self._processing = False
        if self._process_thread and self._process_thread.is_alive():
            self._process_thread.join(timeout=1.0)
        self.camera_service.stop()
        self.mouse_controller.end_drag()

    def pause(self) -> None:
        """Pause mouse actions while keeping detection running."""

        if self.system_state != "stopped":
            self.system_state = "paused"

    def resume(self) -> None:
        """Resume mouse actions."""

        if self.system_state != "stopped":
            self.system_state = "running"

    def get_latest_frame(self) -> Optional[cv2.Mat]:
        """Return the latest processed frame for streaming."""

        with self._frame_lock:
            if self._latest_frame is None:
                return None
            return self._latest_frame.copy()

    def _process_loop(self) -> None:
        """Main processing loop for gesture detection and mouse control."""

        target_delay = 1.0 / max(TARGET_FPS, 1)
        while self._processing:
            frame = self.camera_service.get_frame()
            if frame is None:
                time.sleep(0.05)
                continue

            landmarks = self.hand_detector.detect(frame)
            if landmarks is None:
                self.hand_detected = False
                self.current_gesture = None
                self.finger_states = {k: False for k in self.finger_states}
                self.confidence = 0.0
                self._previous_landmarks = None
                self.mouse_controller.end_drag()
            else:
                self.hand_detected = True
                positions = self.hand_detector.get_landmark_positions(landmarks, frame.shape)
                gesture, fingers, confidence = self.gesture_classifier.classify(
                    positions,
                    self._previous_landmarks,
                )
                self.current_gesture = gesture
                self.finger_states = fingers
                self.confidence = confidence
                self._previous_landmarks = positions

                if self.system_state == "running":
                    self._apply_mouse_action(gesture, positions)

                self.hand_detector.draw_landmarks(frame, landmarks)

            self._update_fps()
            with self._frame_lock:
                self._latest_frame = frame
            time.sleep(target_delay)

    def _apply_mouse_action(self, gesture: str, landmarks: list[dict]) -> None:
        """Translate a gesture into mouse controller actions."""

        screen_w, screen_h = self.mouse_controller.get_screen_size()
        index_tip = landmarks[8]
        frame_w = max(1, self.camera_service.get_resolution()[0])
        frame_h = max(1, self.camera_service.get_resolution()[1])
        cursor_x = int((index_tip["x"] / frame_w) * screen_w)
        cursor_y = int((index_tip["y"] / frame_h) * screen_h)
        self.cursor_position = {"x": cursor_x, "y": cursor_y}

        if gesture == "POINTER":
            self.mouse_controller.move_cursor(cursor_x, cursor_y)
        elif gesture == "LEFT_CLICK":
            self.mouse_controller.left_click()
        elif gesture == "RIGHT_CLICK":
            self.mouse_controller.right_click()
        elif gesture == "DOUBLE_CLICK":
            self.mouse_controller.double_click()
        elif gesture == "OPEN_PALM":
            self.mouse_controller.reset_position()
        elif gesture == "SCROLL":
            if self._previous_landmarks:
                prev = self._previous_landmarks[8]
                delta = index_tip["y"] - prev["y"]
                if delta < -10:
                    self.mouse_controller.scroll("up")
                elif delta > 10:
                    self.mouse_controller.scroll("down")
        elif gesture == "DRAG":
            self.mouse_controller.start_drag()
            self.mouse_controller.move_cursor(cursor_x, cursor_y)
        else:
            self.mouse_controller.end_drag()

    def _update_fps(self) -> None:
        """Update the FPS counter based on processed frames."""

        self._frame_count += 1
        now = time.monotonic()
        if now - self._last_fps_time >= 1.0:
            self.fps = int(self._frame_count / (now - self._last_fps_time))
            self._frame_count = 0
            self._last_fps_time = now


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        app.state.app_state = AppState()
        yield
        app.state.app_state.stop()

    app = FastAPI(title="AI-Based Virtual Mouse", lifespan=lifespan)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[FRONTEND_ORIGIN],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    @app.get("/")
    async def root() -> dict:
        """Health check endpoint for hosting platforms."""

        return {"status": "ok"}

    app.include_router(control.router)
    app.include_router(websocket.router)
    return app


app = create_app()
