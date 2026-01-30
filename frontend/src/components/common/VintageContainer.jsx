import React from "react";

const paddingMap = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-8"
};

const variantMap = {
  raised: "shadow-vintage-raised vintage-float",
  flat: "shadow-vintage-flat vintage-inset",
  interactive: "shadow-vintage-raised vintage-float hover:shadow-vintage-hover active:shadow-vintage-pressed"
};

export default function VintageContainer({
  children,
  className = "",
  variant = "raised",
  padding = "md",
  onClick
}) {
  const baseClasses = `vintage-surface vintage-gloss transition-all duration-200 ease-out ${paddingMap[padding] || paddingMap.md} ${variantMap[variant] || variantMap.raised}`;
  const interactiveClasses = variant === "interactive" ? "cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5" : "";

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
