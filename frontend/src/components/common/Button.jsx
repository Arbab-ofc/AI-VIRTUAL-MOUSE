import React from "react";

const variantStyles = {
  primary:
    "bg-gradient-to-b from-blue-500 to-blue-700 border border-blue-700/60 text-white hover:from-blue-500 hover:to-blue-800",
  secondary:
    "bg-gradient-to-b from-white to-slate-100 border border-slate-300 text-slate-700 hover:from-white hover:to-slate-200",
  success:
    "bg-gradient-to-b from-green-400 to-green-600 border border-green-600/70 text-white hover:to-green-700",
  danger:
    "bg-gradient-to-b from-red-400 to-red-600 border border-red-600/70 text-white hover:to-red-700"
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
      className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 active:scale-[0.98] vintage-btn ${variantStyles[variant]} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
