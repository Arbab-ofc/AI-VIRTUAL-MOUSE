import React from "react";

export default function Slider({ value, min = 1, max = 10, onChange }) {
  return (
    <input
      type="range"
      className="retro-slider"
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}
