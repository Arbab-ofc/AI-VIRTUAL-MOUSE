"""Hand detection service using MediaPipe Hands."""

from __future__ import annotations

import os
import urllib.request
from typing import List, Optional

import cv2
import mediapipe as mp
from mediapipe.tasks.python import core as mp_core
from mediapipe.tasks.python import vision as mp_vision
from mediapipe.tasks.python.vision.core import vision_task_running_mode as mp_running_mode

from app.config import (
    DETECTION_CONFIDENCE,
    HAND_LANDMARKER_MODEL_PATH,
    HAND_LANDMARKER_MODEL_URL,
    TRACKING_CONFIDENCE,
)


class HandDetector:
    """Detects hand landmarks and provides helper utilities."""

    def __init__(self) -> None:
        """Initialize the MediaPipe Hands detector."""

        self._use_tasks = self._solutions_available() is False
        self._hands = None
        self._hand_landmarker = None
        self._connections = None

        if not self._use_tasks:
            self._mp_hands = mp.solutions.hands
            self._hands = self._mp_hands.Hands(
                max_num_hands=1,
                min_detection_confidence=DETECTION_CONFIDENCE,
                min_tracking_confidence=TRACKING_CONFIDENCE,
            )
            self._drawer = mp.solutions.drawing_utils
            self._drawing_styles = mp.solutions.drawing_styles
        else:
            self._ensure_model()
            base_options = mp_core.base_options.BaseOptions(model_asset_path=HAND_LANDMARKER_MODEL_PATH)
            options = mp_vision.HandLandmarkerOptions(
                base_options=base_options,
                running_mode=mp_running_mode.VisionTaskRunningMode.IMAGE,
                num_hands=1,
                min_hand_detection_confidence=DETECTION_CONFIDENCE,
                min_hand_presence_confidence=DETECTION_CONFIDENCE,
                min_tracking_confidence=TRACKING_CONFIDENCE,
            )
            self._hand_landmarker = mp_vision.HandLandmarker.create_from_options(options)
            self._connections = mp_vision.HandLandmarksConnections.HAND_CONNECTIONS

    def detect(self, frame_bgr: cv2.Mat) -> Optional[List]:
        """Detect hand landmarks in the given BGR frame."""

        rgb_frame = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
        if self._use_tasks:
            image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)
            result = self._hand_landmarker.detect(image)
            if not result.hand_landmarks:
                return None
            return result.hand_landmarks[0]

        result = self._hands.process(rgb_frame)
        if not result.multi_hand_landmarks:
            return None
        return result.multi_hand_landmarks[0]

    def get_landmark_positions(self, landmarks, frame_shape) -> List[dict]:
        """Convert normalized landmark positions to pixel coordinates."""

        height, width = frame_shape[:2]
        positions = []
        if hasattr(landmarks, "landmark"):
            iterable = landmarks.landmark
        else:
            iterable = landmarks
        for idx, lm in enumerate(iterable):
            positions.append(
                {
                    "id": idx,
                    "x": int(lm.x * width),
                    "y": int(lm.y * height),
                    "z": lm.z,
                }
            )
        return positions

    def draw_landmarks(self, frame_bgr: cv2.Mat, landmarks) -> None:
        """Draw hand landmarks onto the frame."""

        if self._use_tasks:
            height, width = frame_bgr.shape[:2]
            for connection in self._connections:
                start = landmarks[connection.start]
                end = landmarks[connection.end]
                start_point = (int(start.x * width), int(start.y * height))
                end_point = (int(end.x * width), int(end.y * height))
                cv2.line(frame_bgr, start_point, end_point, (0, 180, 255), 2)
            for landmark in landmarks:
                point = (int(landmark.x * width), int(landmark.y * height))
                cv2.circle(frame_bgr, point, 4, (255, 255, 255), -1)
            return

        self._drawer.draw_landmarks(
            frame_bgr,
            landmarks,
            self._mp_hands.HAND_CONNECTIONS,
            self._drawing_styles.get_default_hand_landmarks_style(),
            self._drawing_styles.get_default_hand_connections_style(),
        )

    @staticmethod
    def _solutions_available() -> bool:
        """Return whether mediapipe.solutions is available."""

        return hasattr(mp, "solutions")

    @staticmethod
    def _ensure_model() -> None:
        """Download the hand landmarker model if missing."""

        if os.path.exists(HAND_LANDMARKER_MODEL_PATH):
            return
        os.makedirs(os.path.dirname(HAND_LANDMARKER_MODEL_PATH), exist_ok=True)
        urllib.request.urlretrieve(HAND_LANDMARKER_MODEL_URL, HAND_LANDMARKER_MODEL_PATH)
