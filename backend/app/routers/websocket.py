"""WebSocket endpoint for streaming status updates."""

from __future__ import annotations

import asyncio
from datetime import datetime, timezone
from typing import List

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()


class ConnectionManager:
    """Tracks active WebSocket connections."""

    def __init__(self) -> None:
        """Initialize connection list."""

        self._connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket) -> None:
        """Accept and store a WebSocket connection."""

        await websocket.accept()
        self._connections.append(websocket)

    def disconnect(self, websocket: WebSocket) -> None:
        """Remove a WebSocket connection."""

        if websocket in self._connections:
            self._connections.remove(websocket)

    async def send_json(self, websocket: WebSocket, message: dict) -> None:
        """Send a JSON message to a specific connection."""

        await websocket.send_json(message)


manager = ConnectionManager()


@router.websocket("/ws/status")
async def status_websocket(websocket: WebSocket) -> None:
    """Stream status updates to the client."""

    await manager.connect(websocket)
    try:
        while True:
            state = websocket.app.state.app_state
            payload = {
                "type": "status_update",
                "data": {
                    "state": state.system_state,
                    "hand_detected": state.hand_detected,
                    "gesture": state.current_gesture,
                    "fingers": state.finger_states,
                    "confidence": state.confidence,
                    "fps": state.fps,
                    "cursor_position": state.cursor_position,
                },
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
            await manager.send_json(websocket, payload)
            if state.system_state in {"running", "paused"}:
                await asyncio.sleep(1 / 30)
            else:
                await asyncio.sleep(1.0)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception:
        manager.disconnect(websocket)
