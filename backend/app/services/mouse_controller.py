"""Mouse controller for translating gestures into OS actions."""

from __future__ import annotations

import os
import time
from typing import Optional

try:
    import pyautogui
except Exception:  # pragma: no cover - headless environments without GUI support
    pyautogui = None

from app.config import CLICK_COOLDOWN_MS, SMOOTHING_FACTOR
from app.utils.smoothing import ExponentialSmoother


class MouseController:
    """Controls the system mouse with smoothing and safety limits."""

    def __init__(self) -> None:
        """Initialize mouse controller with screen metrics."""

        self._enabled = self._check_gui_available()
        if self._enabled and pyautogui:
            pyautogui.FAILSAFE = False
            self._screen_width, self._screen_height = pyautogui.size()
        else:
            # Headless fallback to keep API running.
            self._screen_width, self._screen_height = 1280, 720
        self._smoother = ExponentialSmoother(alpha=SMOOTHING_FACTOR)
        self._sensitivity = 5
        self._last_click = 0.0
        self._last_move = 0.0
        self._dragging = False

    def set_sensitivity(self, value: int) -> None:
        """Set cursor sensitivity on a 1-10 scale."""

        self._sensitivity = max(1, min(10, value))

    def move_cursor(self, x: int, y: int) -> None:
        """Move cursor to the given screen coordinates with smoothing."""

        if not self._enabled or not pyautogui:
            return
        now = time.monotonic()
        if now - self._last_move < 1 / 60:
            return
        self._last_move = now

        scaled_x = int(x * (self._sensitivity / 5))
        scaled_y = int(y * (self._sensitivity / 5))
        target_x = max(0, min(self._screen_width - 1, scaled_x))
        target_y = max(0, min(self._screen_height - 1, scaled_y))

        smoothed_x, smoothed_y = self._smoother.update(target_x, target_y)
        pyautogui.moveTo(smoothed_x, smoothed_y)

    def left_click(self) -> None:
        """Perform a left click with debounce."""

        if not self._enabled or not pyautogui:
            return
        if not self._can_click():
            return
        pyautogui.click(button="left")
        self._last_click = time.monotonic()

    def right_click(self) -> None:
        """Perform a right click with debounce."""

        if not self._enabled or not pyautogui:
            return
        if not self._can_click():
            return
        pyautogui.click(button="right")
        self._last_click = time.monotonic()

    def double_click(self) -> None:
        """Perform a double click action."""

        if not self._enabled or not pyautogui:
            return
        if not self._can_click():
            return
        pyautogui.doubleClick()
        self._last_click = time.monotonic()

    def scroll(self, direction: str, amount: int = 60) -> None:
        """Scroll the mouse wheel in the given direction."""

        if not self._enabled or not pyautogui:
            return
        scroll_amount = amount if direction == "up" else -amount
        pyautogui.scroll(scroll_amount)

    def start_drag(self) -> None:
        """Start a drag operation if not already dragging."""

        if not self._enabled or not pyautogui:
            return
        if not self._dragging:
            pyautogui.mouseDown()
            self._dragging = True

    def end_drag(self) -> None:
        """End a drag operation if currently dragging."""

        if not self._enabled or not pyautogui:
            self._dragging = False
            return
        if self._dragging:
            pyautogui.mouseUp()
            self._dragging = False

    def reset_position(self) -> None:
        """Reset cursor position to the center of the screen."""

        if not self._enabled or not pyautogui:
            return
        pyautogui.moveTo(self._screen_width // 2, self._screen_height // 2)

    def get_screen_size(self) -> tuple[int, int]:
        """Return the screen size in pixels."""

        return self._screen_width, self._screen_height

    def _can_click(self) -> bool:
        """Return whether a click is allowed based on cooldown."""

        return (time.monotonic() - self._last_click) > (CLICK_COOLDOWN_MS / 1000.0)

    @staticmethod
    def _check_gui_available() -> bool:
        """Return True if a GUI display is available for mouse control."""

        if os.getenv("DISABLE_MOUSE") == "1":
            return False
        if os.name != "nt" and not os.getenv("DISPLAY"):
            return False
        return True
