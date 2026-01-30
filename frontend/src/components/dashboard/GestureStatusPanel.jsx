import React from "react";
import VintageContainer from "../common/VintageContainer";

const fingerLabels = ["Thumb", "Index", "Middle", "Ring", "Pinky"];

export default function GestureStatusPanel({ currentGesture, fingerStates, confidence }) {
  const displayGesture = currentGesture || "Idle";
  const active = Boolean(currentGesture && currentGesture !== "IDLE");
  const confidencePercent = Math.round((confidence || 0) * 100);

  return (
    <VintageContainer className="min-h-[280px] fade-up" padding="lg">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 13.5V11a2 2 0 0 1 4 0v2.5" />
          <path d="M8 11V7a2 2 0 0 1 4 0v4" />
          <path d="M12 11V6a2 2 0 1 1 4 0v5" />
          <path d="M16 11V8a2 2 0 1 1 4 0v7a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1" />
        </svg>
        Current Gesture
      </div>

      <div className="mt-6 text-center">
        <div className={`text-3xl font-semibold font-display ${active ? "text-blue-600" : "text-slate-400"}`}>
          {displayGesture}
        </div>
        <div className="mt-2 text-sm text-slate-500">Detected Action</div>
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        {fingerLabels.map((label, index) => {
          const key = label.toLowerCase();
          const isExtended = fingerStates?.[key];
          return (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs transition-all duration-200 ${
                  isExtended
                    ? "bg-blue-500 text-white scale-105 shadow-vintage-flat"
                    : "bg-slate-200 text-slate-400 shadow-vintage-flat"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-[11px] text-slate-500">{label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Confidence</span>
          <span>{confidencePercent}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-200"
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>
    </VintageContainer>
  );
}
