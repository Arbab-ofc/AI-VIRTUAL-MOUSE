import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "About", to: "/about" }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md shadow-vintage-flat rounded-b-[20px]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-vintage bg-blue-50 text-blue-600 shadow-vintage-flat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 13.5V11a2 2 0 0 1 4 0v2.5" />
              <path d="M8 11V7a2 2 0 0 1 4 0v4" />
              <path d="M12 11V6a2 2 0 1 1 4 0v5" />
              <path d="M16 11V8a2 2 0 1 1 4 0v7a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-slate-800">Virtual Mouse</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 underline underline-offset-8"
                    : "text-slate-600 hover:text-blue-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            GitHub
          </a>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-vintage border border-slate-200 bg-white shadow-vintage-flat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="mx-auto max-w-[1400px] border-b border-slate-200 bg-white/95 px-6 py-4 shadow-vintage-flat backdrop-blur">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium ${
                      isActive ? "text-blue-600" : "text-slate-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-base font-medium text-slate-600"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
