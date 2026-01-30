"""Camera capture service using OpenCV."""

from __future__ import annotations

import threading
import time
from typing import Optional, Tuple

import cv2

from app.config import CAMERA_INDEX, FRAME_HEIGHT, FRAME_WIDTH, TARGET_FPS


class CameraService:
    """Manages camera initialization and frame capture in a background thread."""

    def __init__(self) -> None:
        """Initialize camera service state."""

        self._cap: Optional[cv2.VideoCapture] = None
        self._frame_lock = threading.Lock()
        self._latest_frame: Optional[cv2.Mat] = None
        self._capture_thread: Optional[threading.Thread] = None
        self._running = False
        self._resolution = (FRAME_WIDTH, FRAME_HEIGHT)

    def start(self) -> None:
        """Initialize camera capture and start the capture loop."""

        if self._running:
            return

        self._cap = cv2.VideoCapture(CAMERA_INDEX)
        self._cap.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH)
        self._cap.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT)
        self._cap.set(cv2.CAP_PROP_FPS, TARGET_FPS)
        self._running = True

        self._capture_thread = threading.Thread(target=self._capture_loop, daemon=True)
        self._capture_thread.start()

    def stop(self) -> None:
        """Stop capture and release camera resources."""

        self._running = False
        if self._capture_thread and self._capture_thread.is_alive():
            self._capture_thread.join(timeout=1.0)
        if self._cap:
            self._cap.release()
            self._cap = None
        with self._frame_lock:
            self._latest_frame = None

    def _capture_loop(self) -> None:
        """Continuously read frames from the camera."""

        target_delay = 1.0 / max(TARGET_FPS, 1)
        while self._running:
            if not self._cap or not self._cap.isOpened():
                time.sleep(0.5)
                self._cap = cv2.VideoCapture(CAMERA_INDEX)
                self._cap.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH)
                self._cap.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT)
                self._cap.set(cv2.CAP_PROP_FPS, TARGET_FPS)
                continue

            success, frame = self._cap.read()
            if not success:
                time.sleep(0.1)
                continue

            frame = cv2.flip(frame, 1)
            with self._frame_lock:
                self._latest_frame = frame
            time.sleep(target_delay)

    def get_frame(self) -> Optional[cv2.Mat]:
        """Return the latest captured frame without blocking."""

        with self._frame_lock:
            if self._latest_frame is None:
                return None
            return self._latest_frame.copy()

    def is_active(self) -> bool:
        """Return whether the camera is currently active."""

        return self._running

    def get_resolution(self) -> Tuple[int, int]:
        """Return the current camera resolution."""

        return self._resolution
