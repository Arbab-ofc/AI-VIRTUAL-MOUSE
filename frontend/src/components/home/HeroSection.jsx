import React from "react";
import { Link } from "react-router-dom";
import VintageContainer from "../common/VintageContainer";
import Button from "../common/Button";

export default function HeroSection() {
  return (
    <section className="mx-auto mt-12 max-w-[1200px]">
      <VintageContainer padding="lg" className="relative overflow-hidden fade-up">
          <div className="absolute -left-12 -top-16 h-40 w-40 rounded-full bg-[#FFC86F]/40 blur-2xl" />
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#78E2D0]/40 blur-2xl" />
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
            <div className="flex flex-col justify-center gap-6">
              <div className="inline-flex items-center gap-3">
              <span className="retro-chip text-[11px] font-semibold tracking-[0.35em] text-[#2D2B2A] uppercase">
                Gesture Control Technology
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-tight text-slate-800 md:text-5xl font-display">
              Control Your Computer With Hand Gestures
            </h1>
            <p className="max-w-[520px] text-lg text-slate-600">
              Experience a seamless, touchless interface powered by real-time computer vision. The AI-Based Virtual Mouse
              converts intuitive hand movements into precise cursor actions with zero hardware beyond your webcam.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button variant="primary">Open Dashboard</Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary">Learn More</Button>
              </Link>
            </div>
            <div className="mt-4 grid max-w-[420px] grid-cols-3 gap-3 text-center text-xs text-slate-700">
              <div className="retro-chip">30 FPS</div>
              <div className="retro-chip">Low Latency</div>
              <div className="retro-chip">Webcam Only</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-[4/3] w-full min-h-[260px] rounded-vintage-lg p-6 retro-panel bg-gradient-to-br from-[#8CC2FF] via-[#B5A7FF] to-[#FFC86F]">
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-[#FF9BB0]/70 blur-2xl" />
              <div className="absolute -right-6 top-4 h-28 w-28 rounded-full bg-[#78E2D0]/60 blur-2xl" />
              <div className="absolute bottom-4 left-6 h-24 w-24 rounded-full bg-[#FFC86F]/60 blur-2xl" />
              <div className="relative h-full rounded-vintage-lg bg-[#FFF5E9] p-5 retro-card">
                <div className="grid h-full grid-cols-2 gap-4">
                  <div className="flex flex-col justify-between rounded-vintage bg-[#FFE7C2] p-4 retro-card">
                    <div className="text-xs font-semibold text-slate-900 uppercase tracking-[0.3em]">Live</div>
                    <div className="text-2xl font-bold text-slate-900 font-display">Gesture Hub</div>
                    <div className="text-sm text-slate-700">3D depth, glossy layers, and playful light.</div>
                  </div>
                  <div className="relative rounded-vintage bg-[#8CC2FF] retro-card">
                    <div className="absolute left-3 top-3 h-12 w-12 rounded-full bg-[#FF9BB0]" />
                    <div className="absolute right-4 top-8 h-8 w-8 rounded-full bg-[#78E2D0]" />
                    <div className="absolute left-6 bottom-4 h-10 w-10 rounded-full bg-[#FFC86F]" />
                    <div className="absolute bottom-3 right-3 h-14 w-14 rounded-full bg-[#B5A7FF]" />
                  </div>
                  <div className="col-span-2 flex items-center justify-between rounded-vintage bg-[#FFF5E9] px-4 py-3 retro-card">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-[#78E2D0] border-2 border-[#2D2B2A]" />
                      <span className="text-sm text-slate-800">3D Retro UI Mode</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VintageContainer>
    </section>
  );
}
