import React from "react";
import { Link } from "react-router-dom";
import VintageContainer from "../common/VintageContainer";
import Button from "../common/Button";

export default function HeroSection() {
  return (
    <section className="mx-auto mt-12 max-w-[1200px]">
      <VintageContainer padding="lg" className="grid gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col justify-center gap-6">
          <span className="text-xs font-semibold tracking-[0.3em] text-blue-600">
            GESTURE CONTROL TECHNOLOGY
          </span>
          <h1 className="text-3xl font-bold leading-tight text-slate-800 md:text-5xl">
            Control Your Computer With Hand Gestures
          </h1>
          <p className="max-w-[500px] text-lg text-slate-600">
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
        </div>
        <div className="flex items-center justify-center">
          <div className="relative aspect-[4/3] w-full rounded-vintage bg-gradient-to-br from-slate-100 to-slate-200 p-6">
            <div className="absolute inset-6 rounded-vintage border border-dashed border-slate-300">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-500">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-vintage-flat">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <path d="M5 8h14" />
                    <path d="M5 12h14" />
                    <path d="M5 16h14" />
                  </svg>
                </div>
                <div className="text-sm">Abstract Hand Landmarks</div>
              </div>
              <div className="absolute -left-3 top-6 h-2 w-2 rounded-full bg-blue-500" />
              <div className="absolute right-6 top-10 h-2 w-2 rounded-full bg-blue-500" />
              <div className="absolute left-10 bottom-8 h-2 w-2 rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </VintageContainer>
    </section>
  );
}
