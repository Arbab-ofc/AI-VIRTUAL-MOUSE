/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "primary-hover": "#1D4ED8",
        secondary: "#64748B",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        "surface-alt": "#F1F5F9",
        border: "#E2E8F0",
        "border-dark": "#CBD5E1",
        "text-primary": "#1E293B",
        "text-secondary": "#64748B",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444"
      },
      boxShadow: {
        "vintage-raised": "inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)",
        "vintage-hover": "inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.03), 0 8px 20px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
        "vintage-pressed": "inset 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "vintage-flat": "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
      },
      borderRadius: {
        vintage: "16px",
        "vintage-lg": "20px",
        "vintage-sm": "12px"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
