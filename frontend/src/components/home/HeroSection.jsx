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
            <div className="relative aspect-[4/3] w-full rounded-vintage-lg bg-gradient-to-br from-slate-100 to-slate-200 p-6 vintage-inset">
              <div className="absolute inset-5 rounded-vintage bg-white/80 shadow-vintage-flat vintage-gloss">
                <div className="absolute inset-5 rounded-vintage border border-dashed border-slate-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-500">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-vintage-raised">
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 13.5V11a2 2 0 0 1 4 0v2.5" />
                      <path d="M8 11V7a2 2 0 0 1 4 0v4" />
                      <path d="M12 11V6a2 2 0 1 1 4 0v5" />
                      <path d="M16 11V8a2 2 0 1 1 4 0v7a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1" />
                    </svg>
                  </div>
                  <div className="text-sm">Landmark Tracking</div>
                </div>
                <div className="absolute -left-2 top-8 h-2 w-2 rounded-full bg-blue-500 shadow-vintage-flat" />
                <div className="absolute right-8 top-10 h-2 w-2 rounded-full bg-blue-500 shadow-vintage-flat" />
                <div className="absolute left-12 bottom-8 h-2 w-2 rounded-full bg-blue-500 shadow-vintage-flat" />
                <div className="absolute right-12 bottom-12 h-2 w-2 rounded-full bg-blue-500 shadow-vintage-flat" />
              </div>
            </div>
          </div>
        </div>
      </VintageContainer>
    </section>
  );
}
