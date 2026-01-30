import React from "react";
import VintageContainer from "./VintageContainer";

export default function Card({ children, className = "" }) {
  return (
    <VintageContainer className={className} variant="raised" padding="lg">
      {children}
    </VintageContainer>
  );
}
