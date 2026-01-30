import React from "react";

const paddingMap = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-8"
};

const variantMap = {
  raised: "retro-shadow",
  flat: "retro-inset",
  interactive: "retro-shadow"
};

export default function VintageContainer({
  children,
  className = "",
  variant = "raised",
  padding = "md",
  onClick
}) {
  const baseClasses = `retro-window transition-all duration-200 ease-out ${paddingMap[padding] || paddingMap.md} ${variantMap[variant] || variantMap.raised}`;
  const interactiveClasses = variant === "interactive" ? "cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5" : "";

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
