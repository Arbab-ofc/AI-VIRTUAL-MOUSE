import React from "react";
import VintageContainer from "../common/VintageContainer";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "About", to: "/about" }
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16">
      <VintageContainer className="mx-auto max-w-[1400px]" variant="flat" padding="lg">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-vintage bg-[#8CC2FF] text-[#2D2B2A] retro-shadow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 13.5V11a2 2 0 0 1 4 0v2.5" />
                  <path d="M8 11V7a2 2 0 0 1 4 0v4" />
                  <path d="M12 11V6a2 2 0 1 1 4 0v5" />
                  <path d="M16 11V8a2 2 0 1 1 4 0v7a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-slate-900 font-display">Virtual Mouse</span>
            </div>
            <p className="mt-3 text-sm text-slate-700">Control your computer naturally.</p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-700">
            {navLinks.map((link) => (
              <a key={link.to} href={link.to} className="hover:text-slate-900">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-700">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-slate-900">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
            <span>© {year} Virtual Mouse</span>
          </div>
        </div>
      </VintageContainer>
    </footer>
  );
}
