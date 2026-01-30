import React from "react";

const variantStyles = {
  primary:
    "bg-[#8CC2FF] text-[#2D2B2A] hover:bg-[#6FB3FF]",
  secondary:
    "bg-[#FFE7C2] text-[#2D2B2A] hover:bg-[#FFD59E]",
  success:
    "bg-[#78E2D0] text-[#2D2B2A] hover:bg-[#5FD6C4]",
  danger:
    "bg-[#FF9BB0] text-[#2D2B2A] hover:bg-[#FF819C]"
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  disabled = false,
  onClick,
  type = "button"
}) {
  return (
    <button
      type={type}
      className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 active:scale-[0.98] retro-button ${variantStyles[variant]} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
