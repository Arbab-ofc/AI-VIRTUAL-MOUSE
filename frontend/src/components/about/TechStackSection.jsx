import React from "react";
import VintageContainer from "../common/VintageContainer";

const frontendStack = ["React", "Tailwind CSS", "Vite", "WebSocket API"];
const backendStack = ["FastAPI", "OpenCV", "MediaPipe", "PyAutoGUI"];

export default function TechStackSection() {
  return (
    <section className="mx-auto max-w-[1200px] py-12">
      <VintageContainer padding="lg" className="grid gap-6 md:grid-cols-2 fade-up">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Frontend Technologies</h3>
          <ul className="mt-4 space-y-2 text-slate-600">
            {frontendStack.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Backend Technologies</h3>
          <ul className="mt-4 space-y-2 text-slate-600">
            {backendStack.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </VintageContainer>
    </section>
  );
}
