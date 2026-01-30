"""Gesture classification logic based on hand landmarks."""

from __future__ import annotations

import math
import time
from typing import Dict, List, Optional, Tuple

from app.config import CLICK_COOLDOWN_MS


class GestureClassifier:
    """Classifies hand gestures and finger states."""

    def __init__(self) -> None:
        """Initialize gesture classifier state."""

        self._last_left_click = 0.0
        self._last_right_click = 0.0
        self._last_double_click = 0.0
        self._last_left_click_for_double = 0.0
        self._pinching = False

    def get_finger_states(self, landmarks: List[dict]) -> Dict[str, bool]:
        """Determine which fingers are extended based on landmark positions."""

        idx = {lm["id"]: lm for lm in landmarks}
        thumb_tip = idx[4]
        thumb_ip = idx[3]
        wrist = idx[0]
        index_mcp = idx[5]

        is_right_hand = index_mcp["x"] > wrist["x"]
        if is_right_hand:
            thumb_extended = thumb_tip["x"] > thumb_ip["x"]
        else:
            thumb_extended = thumb_tip["x"] < thumb_ip["x"]

        index_extended = idx[8]["y"] < idx[6]["y"]
        middle_extended = idx[12]["y"] < idx[10]["y"]
        ring_extended = idx[16]["y"] < idx[14]["y"]
        pinky_extended = idx[20]["y"] < idx[18]["y"]

        return {
            "thumb": thumb_extended,
            "index": index_extended,
            "middle": middle_extended,
            "ring": ring_extended,
            "pinky": pinky_extended,
        }

    def calculate_confidence(self, landmarks: List[dict]) -> float:
        """Return a simple confidence proxy for the gesture."""

        if not landmarks:
            return 0.0
        return 0.85

    def classify(
        self,
        landmarks: List[dict],
        previous_landmarks: Optional[List[dict]],
    ) -> Tuple[str, Dict[str, bool], float]:
        """Classify the gesture based on landmark positions and movement."""

        finger_states = self.get_finger_states(landmarks)
        confidence = self.calculate_confidence(landmarks)

        if all(not state for state in finger_states.values()):
            return "FIST", finger_states, confidence

        if all(state for state in finger_states.values()):
            return "OPEN_PALM", finger_states, confidence

        if finger_states["index"] and not finger_states["middle"] and not finger_states["ring"] and not finger_states["pinky"]:
            return "POINTER", finger_states, confidence

        if finger_states["index"] and finger_states["middle"] and not finger_states["ring"] and not finger_states["pinky"]:
            return "SCROLL", finger_states, confidence

        pinch_distance = self._distance(landmarks[4], landmarks[8])
        if pinch_distance < 35:
            self._pinching = True
            return "DRAG", finger_states, confidence
        if self._pinching:
            self._pinching = False

        if previous_landmarks:
            left_click = self._detect_click(landmarks, previous_landmarks, finger="index")
            right_click = self._detect_click(landmarks, previous_landmarks, finger="middle")
            now = time.monotonic()
            if left_click and now - self._last_left_click > CLICK_COOLDOWN_MS / 1000.0:
                self._last_left_click = now
                if now - self._last_left_click_for_double < 0.4:
                    if now - self._last_double_click > CLICK_COOLDOWN_MS / 1000.0:
                        self._last_double_click = now
                        self._last_left_click_for_double = 0.0
                        return "DOUBLE_CLICK", finger_states, confidence
                self._last_left_click_for_double = now
                return "LEFT_CLICK", finger_states, confidence
            if right_click and now - self._last_right_click > CLICK_COOLDOWN_MS / 1000.0:
                self._last_right_click = now
                return "RIGHT_CLICK", finger_states, confidence

        return "IDLE", finger_states, confidence

    @staticmethod
    def _distance(a: dict, b: dict) -> float:
        """Return Euclidean distance between two landmarks."""

        return math.hypot(a["x"] - b["x"], a["y"] - b["y"])

    @staticmethod
    def _detect_click(landmarks: List[dict], previous_landmarks: List[dict], finger: str) -> bool:
        """Detect a quick downward tap for the specified finger."""

        finger_map = {"index": 8, "middle": 12}
        tip_id = finger_map[finger]
        prev = previous_landmarks[tip_id]
        curr = landmarks[tip_id]
        delta_y = curr["y"] - prev["y"]
        return delta_y > 15
