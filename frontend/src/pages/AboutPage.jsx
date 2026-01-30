import React from "react";
import PageWrapper from "../components/layout/PageWrapper";
import InstructionSection from "../components/about/InstructionSection";
import GestureLegend from "../components/about/GestureLegend";
import TechStackSection from "../components/about/TechStackSection";

export default function AboutPage() {
  return (
    <PageWrapper>
      <InstructionSection />
      <GestureLegend />
      <TechStackSection />
    </PageWrapper>
  );
}
