import React from "react";
import VintageContainer from "../common/VintageContainer";

function getFpsColor(fps) {
  if (fps > 24) return "text-green-600";
  if (fps >= 15) return "text-amber-500";
  return "text-red-500";
}

function getStateColor(state) {
  if (state === "running") return "text-green-600";
  if (state === "paused") return "text-amber-500";
  return "text-slate-500";
}

export default function SystemInfoPanel({ fps, isConnected, systemState, resolution }) {
  const connectionLabel = isConnected ? "Connected" : "Disconnected";
  const connectionColor = isConnected ? "text-green-600" : "text-red-500";

  return (
    <VintageContainer variant="flat" padding="lg" className="fade-up">
      <div className="grid gap-6 md:grid-cols-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 shadow-vintage-flat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20v-6" />
              <path d="M6 20V10" />
              <path d="M18 20V4" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-500">Frame Rate</p>
            <p className={`text-sm font-semibold ${getFpsColor(fps)}`}>{fps} fps</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 shadow-vintage-flat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13a10 10 0 0 1 14 0" />
              <path d="M8.5 16.5a5 5 0 0 1 7 0" />
              <path d="M12 20h.01" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-500">Connection</p>
            <p className={`text-sm font-semibold ${connectionColor}`}>{connectionLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 shadow-vintage-flat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-500">Resolution</p>
            <p className="text-sm font-semibold text-slate-700">{resolution}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 shadow-vintage-flat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-500">Status</p>
            <p className={`text-sm font-semibold ${getStateColor(systemState)}`}>{systemState}</p>
          </div>
        </div>
      </div>
    </VintageContainer>
  );
}
