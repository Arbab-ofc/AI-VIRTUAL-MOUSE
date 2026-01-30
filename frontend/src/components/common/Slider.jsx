import React from "react";

export default function Slider({ value, min = 1, max = 10, onChange }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      className="vintage-slider"
      min={min}
      max={max}
      value={value}
      style={{
        background: `linear-gradient(90deg, #3B82F6 0%, #3B82F6 ${fill}%, #E2E8F0 ${fill}%, #E2E8F0 100%)`
      }}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}
