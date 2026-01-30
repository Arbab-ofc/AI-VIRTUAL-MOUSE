import React from "react";

const statusColors = {
  active: "bg-green-500 animate-pulse",
  inactive: "bg-slate-300",
  warning: "bg-amber-500",
  error: "bg-red-500"
};

export default function StatusIndicator({ label, status = "inactive" }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <span className={`h-3 w-3 rounded-full ${statusColors[status]}`} />
      <span>{label}</span>
    </div>
  );
}
