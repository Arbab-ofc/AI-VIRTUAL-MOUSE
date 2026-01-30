import React from "react";

export default function Slider({ value, min = 1, max = 10, onChange }) {
  return (
    <input
      type="range"
      className="w-full accent-blue-500 h-2 rounded-full cursor-pointer"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}
