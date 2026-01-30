import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route
        path="/about"
        element={
          <Suspense fallback={<div className="pt-24 text-center text-slate-500">Loading...</div>}>
            <AboutPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
