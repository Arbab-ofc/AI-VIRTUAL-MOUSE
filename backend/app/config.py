"""Configuration constants for the virtual mouse backend."""

import os

CAMERA_INDEX = int(os.getenv("CAMERA_INDEX", "0"))
FRAME_WIDTH = int(os.getenv("FRAME_WIDTH", "640"))
FRAME_HEIGHT = int(os.getenv("FRAME_HEIGHT", "480"))
TARGET_FPS = int(os.getenv("TARGET_FPS", "30"))
SMOOTHING_FACTOR = float(os.getenv("SMOOTHING_FACTOR", "0.5"))
CLICK_COOLDOWN_MS = int(os.getenv("CLICK_COOLDOWN_MS", "300"))
DETECTION_CONFIDENCE = float(os.getenv("DETECTION_CONFIDENCE", "0.7"))
TRACKING_CONFIDENCE = float(os.getenv("TRACKING_CONFIDENCE", "0.5"))

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

HAND_LANDMARKER_MODEL_PATH = os.getenv(
    "HAND_LANDMARKER_MODEL_PATH",
    os.path.join(os.path.dirname(__file__), "assets", "hand_landmarker.task"),
)
HAND_LANDMARKER_MODEL_URL = os.getenv(
    "HAND_LANDMARKER_MODEL_URL",
    "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
)
