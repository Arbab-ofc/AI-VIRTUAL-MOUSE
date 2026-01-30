import React from "react";
import { Link } from "react-router-dom";
import VintageContainer from "../common/VintageContainer";
import Button from "../common/Button";

export default function HeroSection() {
  return (
    <section className="mx-auto mt-12 max-w-[1200px]">
      <VintageContainer padding="lg" className="relative overflow-hidden fade-up">
        <div className="absolute -left-12 -top-16 h-40 w-40 rounded-full bg-blue-200/50 blur-2xl" />
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-200/40 blur-2xl" />
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <div className="flex flex-col justify-center gap-6">
            <div className="inline-flex items-center gap-3">
              <span className="vintage-badge px-4 py-2 text-[11px] font-semibold tracking-[0.35em] text-blue-700 uppercase">
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
            <div className="mt-4 grid max-w-[420px] grid-cols-3 gap-3 text-center text-xs text-slate-600">
              <div className="vintage-badge px-3 py-2">30 FPS</div>
              <div className="vintage-badge px-3 py-2">Low Latency</div>
              <div className="vintage-badge px-3 py-2">Webcam Only</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-[4/3] w-full min-h-[260px] rounded-vintage-lg p-6 vintage-inset shadow-vintage-flat ring-1 ring-slate-200 bg-gradient-to-br from-indigo-100 via-sky-100 to-amber-100">
              <div className="absolute inset-0 rounded-vintage-lg vintage-gloss" />
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-pink-300/70 blur-2xl" />
              <div className="absolute -right-6 top-4 h-28 w-28 rounded-full bg-cyan-300/60 blur-2xl" />
              <div className="absolute bottom-4 left-6 h-24 w-24 rounded-full bg-amber-300/60 blur-2xl" />
              <div className="relative h-full rounded-vintage-lg bg-white/70 p-5 shadow-vintage-raised">
                <div className="grid h-full grid-cols-2 gap-4">
                  <div className="flex flex-col justify-between rounded-vintage bg-gradient-to-b from-white to-slate-100 p-4 shadow-vintage-flat">
                    <div className="text-xs font-semibold text-blue-700 uppercase tracking-[0.3em]">Live</div>
                    <div className="text-2xl font-bold text-slate-800 font-display">Gesture Hub</div>
                    <div className="text-sm text-slate-600">3D depth, glossy layers, and playful light.</div>
                  </div>
                  <div className="relative rounded-vintage bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 shadow-vintage-flat">
                    <div className="absolute left-3 top-3 h-12 w-12 rounded-full bg-white/80 shadow-vintage-raised" />
                    <div className="absolute right-4 top-8 h-8 w-8 rounded-full bg-white/80 shadow-vintage-raised" />
                    <div className="absolute left-6 bottom-4 h-10 w-10 rounded-full bg-white/80 shadow-vintage-raised" />
                    <div className="absolute bottom-3 right-3 h-14 w-14 rounded-full bg-white/80 shadow-vintage-raised" />
                  </div>
                  <div className="col-span-2 flex items-center justify-between rounded-vintage bg-white/80 px-4 py-3 shadow-vintage-flat">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-green-500 shadow-vintage-flat" />
                      <span className="text-sm text-slate-700">3D Retro UI Mode</span>
                    </div>
                    <div className="text-sm font-semibold text-blue-600">Ready</div>
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
