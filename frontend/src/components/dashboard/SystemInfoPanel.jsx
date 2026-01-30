import React from "react";
import VintageContainer from "../common/VintageContainer";

function getFpsColor(fps) {
  if (fps > 24) return "text-[#2D2B2A]";
  if (fps >= 15) return "text-[#2D2B2A]";
  return "text-[#2D2B2A]";
}

function getStateColor(state) {
  if (state === "running") return "text-[#2D2B2A]";
  if (state === "paused") return "text-[#2D2B2A]";
  return "text-slate-700";
}

export default function SystemInfoPanel({ fps, isConnected, systemState, resolution }) {
  const connectionLabel = isConnected ? "Connected" : "Disconnected";
  const connectionColor = "text-[#2D2B2A]";

  return (
    <VintageContainer variant="flat" padding="lg" className="fade-up">
      <div className="grid gap-6 md:grid-cols-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8CC2FF] retro-shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20v-6" />
              <path d="M6 20V10" />
              <path d="M18 20V4" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-700">Frame Rate</p>
            <p className={`text-sm font-semibold ${getFpsColor(fps)}`}>{fps} fps</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#78E2D0] retro-shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13a10 10 0 0 1 14 0" />
              <path d="M8.5 16.5a5 5 0 0 1 7 0" />
              <path d="M12 20h.01" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-700">Connection</p>
            <p className={`text-sm font-semibold ${connectionColor}`}>{connectionLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC86F] retro-shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-700">Resolution</p>
            <p className="text-sm font-semibold text-slate-900">{resolution}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF9BB0] retro-shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-700">Status</p>
            <p className={`text-sm font-semibold ${getStateColor(systemState)}`}>{systemState}</p>
          </div>
        </div>
      </div>
    </VintageContainer>
  );
}
