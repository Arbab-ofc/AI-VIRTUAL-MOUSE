import React from "react";
import VintageContainer from "../common/VintageContainer";

const gestures = [
  {
    name: "Cursor Movement",
    action: "Move index finger to control cursor position."
  },
  {
    name: "Left Click",
    action: "Quickly bend index finger downward."
  },
  {
    name: "Right Click",
    action: "Quickly bend middle finger downward."
  },
  {
    name: "Double Click",
    action: "Tap index finger twice rapidly."
  },
  {
    name: "Drag and Drop",
    action: "Pinch thumb and index, move, then release."
  },
  {
    name: "Scroll",
    action: "Extend index and middle fingers, move vertically."
  }
];

export default function GestureLegend() {
  return (
    <section className="mx-auto max-w-[1200px] py-12">
      <VintageContainer padding="lg">
        <div>
          <h3 className="text-2xl font-semibold text-slate-900 font-display">Gesture Reference Guide</h3>
          <p className="mt-2 text-slate-700">Learn the gestures that control the system.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {gestures.map((gesture) => (
            <VintageContainer key={gesture.name} variant="interactive" padding="sm" className="flex items-center gap-4 fade-up">
              <div className="flex h-16 w-16 items-center justify-center rounded-vintage bg-[#8CC2FF] text-[#2D2B2A] retro-shadow">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 13.5V11a2 2 0 0 1 4 0v2.5" />
                  <path d="M8 11V7a2 2 0 0 1 4 0v4" />
                  <path d="M12 11V6a2 2 0 1 1 4 0v5" />
                  <path d="M16 11V8a2 2 0 1 1 4 0v7a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-semibold text-slate-900">{gesture.name}</h4>
                <p className="text-sm text-slate-700">{gesture.action}</p>
              </div>
            </VintageContainer>
          ))}
        </div>
      </VintageContainer>
    </section>
  );
}
