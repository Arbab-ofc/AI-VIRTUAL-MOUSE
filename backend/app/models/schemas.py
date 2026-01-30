"""Pydantic schemas for API and WebSocket payloads."""

from __future__ import annotations

from datetime import datetime
from typing import Dict, Optional, Tuple

from pydantic import BaseModel, Field


class StatusResponse(BaseModel):
    """Represents the current virtual mouse system status."""

    state: str
    hand_detected: bool
    gesture: Optional[str]
    fps: int
    resolution: Tuple[int, int]


class ControlResponse(BaseModel):
    """Represents a response for control actions."""

    status: str
    message: str


class SensitivityRequest(BaseModel):
    """Represents a request to update cursor sensitivity."""

    value: int = Field(ge=1, le=10)


class WebSocketMessage(BaseModel):
    """Represents a WebSocket status update message."""

    type: str
    data: Dict
    timestamp: datetime
