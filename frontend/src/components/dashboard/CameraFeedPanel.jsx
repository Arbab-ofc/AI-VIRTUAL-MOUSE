import React from "react";
import VintageContainer from "../common/VintageContainer";
import StatusIndicator from "../common/StatusIndicator";
import { API_BASE_URL } from "../../utils/constants";

export default function CameraFeedPanel({ isConnected, handDetected }) {
  const statusLabel = handDetected ? "Hand Detected" : "No Hand";
  const statusType = handDetected ? "active" : "inactive";

  return (
    <VintageContainer className="relative overflow-hidden" padding="none">
      <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-slate-50 px-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 3h-8" />
            <path d="M12 7v-4" />
          </svg>
          Live Camera Feed
        </div>
        <StatusIndicator label={statusLabel} status={statusType} />
      </div>
      <div className={`relative aspect-video bg-slate-900 ${handDetected ? "ring-2 ring-green-400/40" : ""}`}>
        <img
          src={`${API_BASE_URL}/api/video_feed`}
          alt="Camera feed"
          className="h-full w-full object-cover"
        />
        {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 text-sm text-slate-200">
            Connecting...
          </div>
        )}
        {isConnected && !handDetected && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-300">
            Camera feed will appear here
          </div>
        )}
      </div>
    </VintageContainer>
  );
}
