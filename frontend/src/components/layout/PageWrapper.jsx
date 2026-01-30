import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-background gradient-bg">
      <Header />
      <main className="px-4 pb-12 pt-24 md:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
