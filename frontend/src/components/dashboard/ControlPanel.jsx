import React from "react";
import VintageContainer from "../common/VintageContainer";
import Button from "../common/Button";
import Slider from "../common/Slider";

export default function ControlPanel({
  systemState,
  sensitivity,
  onStart,
  onStop,
  onPause,
  onResume,
  onReset,
  onSensitivityChange
}) {
  const isRunning = systemState === "running";
  const isPaused = systemState === "paused";

  return (
    <VintageContainer padding="lg" className="fade-up">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20" />
          <path d="M5 12h14" />
        </svg>
        Mouse Control
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Button
          variant="success"
          className="w-full"
          disabled={isRunning}
          onClick={onStart}
        >
          ▶ Start Virtual Mouse
        </Button>
        <Button
          variant="danger"
          className="w-full"
          disabled={!isRunning && !isPaused}
          onClick={onStop}
        >
          ■ Stop Virtual Mouse
        </Button>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Cursor Sensitivity</span>
          <span className="font-semibold text-slate-800">{sensitivity}</span>
        </div>
        <div className="mt-3">
          <Slider value={sensitivity} min={1} max={10} onChange={onSensitivityChange} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={onReset}>Reset Position</Button>
        <button
          type="button"
          onClick={isPaused ? onResume : onPause}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    </VintageContainer>
  );
}
