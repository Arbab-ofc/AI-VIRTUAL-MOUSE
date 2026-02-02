import React from "react";
import VintageContainer from "../common/VintageContainer";

const fingerPositions = [
  {
    title: "Index Up (Pointer)",
    position: "Index extended, other fingers relaxed",
    action: "Move cursor"
  },
  {
    title: "Index Tap",
    position: "Quick downward bend of index finger",
    action: "Left click"
  },
  {
    title: "Middle Tap",
    position: "Quick downward bend of middle finger",
    action: "Right click"
  },
  {
    title: "Index Double Tap",
    position: "Two fast taps of index finger",
    action: "Double click"
  },
  {
    title: "Pinch Hold",
    position: "Thumb and index pinch, hold while moving",
    action: "Drag and drop"
  },
  {
    title: "Two Fingers Up",
    position: "Index + middle extended, move vertically",
    action: "Scroll"
  },
  {
    title: "Open Palm",
    position: "All fingers extended",
    action: "Reset cursor"
  }
];

export default function FingerPositionGuidePanel() {
  return (
    <VintageContainer padding="lg" className="fade-up">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 13.5V11a2 2 0 0 1 4 0v2.5" />
          <path d="M8 11V7a2 2 0 0 1 4 0v4" />
          <path d="M12 11V6a2 2 0 1 1 4 0v5" />
          <path d="M16 11V8a2 2 0 1 1 4 0v7a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1" />
        </svg>
        3D Finger Positions
      </div>
      <p className="mt-2 text-sm text-slate-600">
        Match finger positions to actions for precise control.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fingerPositions.map((item) => (
          <div
            key={item.title}
            className="rounded-vintage bg-[#FFF5E9] border-2 border-[#2D2B2A] p-4 retro-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                <p className="mt-1 text-xs text-slate-700">{item.position}</p>
              </div>
              <span className="retro-chip text-[10px] font-semibold uppercase tracking-[0.2em]">Action</span>
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-900">
              {item.action}
            </div>
          </div>
        ))}
      </div>
    </VintageContainer>
  );
}
