import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 right-10 h-40 w-40 rounded-full bg-[#FFC86F]/40 blur-2xl" />
      <div className="pointer-events-none absolute top-1/3 -left-16 h-48 w-48 rounded-full bg-[#78E2D0]/30 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#FF9BB0]/30 blur-3xl" />
      <Header />
      <main className="px-4 pb-12 pt-24 md:px-8 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
