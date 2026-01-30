import React from "react";
import VintageContainer from "../common/VintageContainer";

const features = [
  {
    title: "Intuitive Hand Gestures",
    description: "Use natural finger movements to click, drag, and scroll without touching a mouse.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 13.5V11a2 2 0 0 1 4 0v2.5" />
        <path d="M8 11V7a2 2 0 0 1 4 0v4" />
        <path d="M12 11V6a2 2 0 1 1 4 0v5" />
        <path d="M16 11V8a2 2 0 1 1 4 0v7a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1" />
      </svg>
    )
  },
  {
    title: "Real-Time Processing",
    description: "Optimized vision models deliver smooth, low-latency tracking at 30 FPS.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    title: "Web-Based Solution",
    description: "No extra hardware required. Launch from your browser with any webcam.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    )
  }
];

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-[1200px] py-20">
      <div className="text-center">
        <span className="text-xs font-semibold tracking-[0.3em] text-blue-600">FEATURES</span>
        <h2 className="mt-3 text-3xl font-bold text-slate-800">Why Choose Virtual Mouse</h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <VintageContainer key={feature.title} variant="interactive" padding="lg" className="fade-up">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              {feature.icon}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-800">{feature.title}</h3>
            <p className="mt-2 text-slate-600">{feature.description}</p>
          </VintageContainer>
        ))}
      </div>
    </section>
  );
}
