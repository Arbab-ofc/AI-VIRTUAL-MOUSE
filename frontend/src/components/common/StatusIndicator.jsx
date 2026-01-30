import React from "react";

const statusColors = {
  active: "bg-[#78E2D0] animate-pulse",
  inactive: "bg-[#FFE7C2]",
  warning: "bg-[#FFC86F]",
  error: "bg-[#FF9BB0]"
};

export default function StatusIndicator({ label, status = "inactive" }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-700">
      <span className={`h-3 w-3 rounded-full border-2 border-[#2D2B2A] ${statusColors[status]}`} />
      <span>{label}</span>
    </div>
  );
}
