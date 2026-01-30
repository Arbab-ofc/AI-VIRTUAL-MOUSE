"""Utilities for smoothing cursor movement."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass
class ExponentialSmoother:
    """Applies exponential smoothing to 2D coordinates."""

    alpha: float
    x: float = 0.0
    y: float = 0.0
    initialized: bool = False

    def update(self, target_x: float, target_y: float) -> tuple[float, float]:
        """Return smoothed coordinates for the given target position."""

        if not self.initialized:
            self.x = target_x
            self.y = target_y
            self.initialized = True
            return self.x, self.y

        self.x = self.alpha * target_x + (1 - self.alpha) * self.x
        self.y = self.alpha * target_y + (1 - self.alpha) * self.y
        return self.x, self.y
