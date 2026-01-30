import React from "react";
import VintageContainer from "../common/VintageContainer";

const steps = [
  {
    title: "Grant Camera Access",
    description: "Allow browser camera permissions so the system can detect your hand." 
  },
  {
    title: "Position Your Hand",
    description: "Hold your hand within the camera frame with good lighting." 
  },
  {
    title: "Start the System",
    description: "Open the dashboard and press Start Virtual Mouse." 
  },
  {
    title: "Perform Gestures",
    description: "Use the gesture legend to move, click, and scroll." 
  },
  {
    title: "Stop When Done",
    description: "Stop the system to safely release the camera." 
  }
];

export default function InstructionSection() {
  return (
    <section className="mx-auto max-w-[900px] py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">How to Use Virtual Mouse</h2>
        <p className="mt-3 text-slate-600">Follow these steps to start controlling your cursor with gestures.</p>
      </div>
      <div className="relative mt-10">
        <div className="absolute left-6 top-0 h-full w-px border-l-2 border-dashed border-slate-200" />
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <VintageContainer key={step.title} className="relative pl-16" padding="lg">
              <div className="absolute left-2 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{step.title}</h3>
              <p className="mt-2 text-slate-600">{step.description}</p>
            </VintageContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
