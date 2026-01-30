import React from "react";

const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
  secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
  success: "bg-green-500 text-white hover:bg-green-600",
  danger: "bg-red-500 text-white hover:bg-red-600"
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
