import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-background gradient-bg relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-100/60 blur-[120px]" />
      <Header />
      <main className="px-4 pb-12 pt-24 md:px-8 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
