"""REST control endpoints for the virtual mouse system."""

from __future__ import annotations

import time
from typing import Generator

import cv2
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse

from app.models.schemas import ControlResponse, SensitivityRequest, StatusResponse

router = APIRouter(prefix="/api", tags=["control"])


def _get_state(request: Request):
    """Return the shared application state."""

    return request.app.state.app_state


@router.post("/control/start", response_model=ControlResponse)
async def start_system(request: Request) -> ControlResponse:
    """Start the virtual mouse system."""

    state = _get_state(request)
    if state.system_state == "running":
        return ControlResponse(status="running", message="Virtual mouse already running")
    started = state.start()
    if not started:
        raise HTTPException(status_code=503, detail="Camera not available")
    return ControlResponse(status="started", message="Virtual mouse activated")


@router.post("/control/stop", response_model=ControlResponse)
async def stop_system(request: Request) -> ControlResponse:
    """Stop the virtual mouse system."""

    state = _get_state(request)
    state.stop()
    return ControlResponse(status="stopped", message="Virtual mouse deactivated")


@router.post("/control/pause", response_model=ControlResponse)
async def pause_system(request: Request) -> ControlResponse:
    """Pause mouse control without stopping detection."""

    state = _get_state(request)
    state.pause()
    return ControlResponse(status="paused", message="Mouse control paused")


@router.post("/control/resume", response_model=ControlResponse)
async def resume_system(request: Request) -> ControlResponse:
    """Resume mouse control."""

    state = _get_state(request)
    state.resume()
    return ControlResponse(status="running", message="Mouse control resumed")


@router.post("/control/reset", response_model=ControlResponse)
async def reset_system(request: Request) -> ControlResponse:
    """Reset the mouse cursor position to center."""

    state = _get_state(request)
    state.mouse_controller.reset_position()
    return ControlResponse(status="reset", message="Cursor position reset")


@router.put("/control/sensitivity", response_model=dict)
async def update_sensitivity(request: Request, payload: SensitivityRequest) -> dict:
    """Update cursor sensitivity."""

    state = _get_state(request)
    state.mouse_controller.set_sensitivity(payload.value)
    state.sensitivity = payload.value
    return {"sensitivity": payload.value}


@router.get("/status", response_model=StatusResponse)
async def get_status(request: Request) -> StatusResponse:
    """Return the current status of the system."""

    state = _get_state(request)
    return StatusResponse(
        state=state.system_state,
        hand_detected=state.hand_detected,
        gesture=state.current_gesture,
        fps=state.fps,
        resolution=state.camera_service.get_resolution(),
    )


@router.get("/video_feed")
async def video_feed(request: Request) -> StreamingResponse:
    """Stream MJPEG frames from the camera."""

    state = _get_state(request)

    def frame_generator() -> Generator[bytes, None, None]:
        while True:
            frame = state.get_latest_frame()
            if frame is None:
                time.sleep(0.05)
                continue
            success, buffer = cv2.imencode(".jpg", frame)
            if not success:
                continue
            frame_bytes = buffer.tobytes()
            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
            )

    return StreamingResponse(
        frame_generator(),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )
