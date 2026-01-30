import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <FeaturesSection />
    </PageWrapper>
  );
}
