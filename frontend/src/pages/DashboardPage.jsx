import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import CameraFeedPanel from "../components/dashboard/CameraFeedPanel";
import GestureStatusPanel from "../components/dashboard/GestureStatusPanel";
import ControlPanel from "../components/dashboard/ControlPanel";
import SystemInfoPanel from "../components/dashboard/SystemInfoPanel";
import useVirtualMouse from "../hooks/useVirtualMouse";

export default function DashboardPage() {
  const {
    systemState,
    handDetected,
    currentGesture,
    fingerStates,
    confidence,
    fps,
    sensitivity,
    resolution,
    error,
    isConnected,
    connectionAttempts,
    startMouse,
    stopMouse,
    pauseMouse,
    resumeMouse,
    resetPosition,
    setSensitivity,
    reconnect
  } = useVirtualMouse();

  return (
    <PageWrapper>
      <section className="mx-auto max-w-[1400px]">
        {!isConnected && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            <span>
              Connection lost. Attempt {connectionAttempts} of 5.
            </span>
            <button
              type="button"
              onClick={reconnect}
              className="rounded-lg border border-amber-300 px-3 py-1 text-xs font-medium"
            >
              Reconnect
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:row-span-2">
            <CameraFeedPanel isConnected={isConnected} handDetected={handDetected} />
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <GestureStatusPanel currentGesture={currentGesture} fingerStates={fingerStates} confidence={confidence} />
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <ControlPanel
              systemState={systemState}
              sensitivity={sensitivity}
              onStart={startMouse}
              onStop={stopMouse}
              onPause={pauseMouse}
              onResume={resumeMouse}
              onReset={resetPosition}
              onSensitivityChange={setSensitivity}
            />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <SystemInfoPanel
              fps={fps}
              isConnected={isConnected}
              systemState={systemState}
              resolution={resolution}
            />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
