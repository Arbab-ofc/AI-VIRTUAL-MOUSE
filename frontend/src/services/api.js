import { API_BASE_URL } from "../utils/constants";

const defaultHeaders = {
  "Content-Type": "application/json"
};

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: defaultHeaders,
    ...options
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Request failed");
  }

  return response.json();
}

export const api = {
  start: () => request("/api/control/start", { method: "POST" }),
  stop: () => request("/api/control/stop", { method: "POST" }),
  pause: () => request("/api/control/pause", { method: "POST" }),
  resume: () => request("/api/control/resume", { method: "POST" }),
  reset: () => request("/api/control/reset", { method: "POST" }),
  updateSensitivity: (value) =>
    request("/api/control/sensitivity", {
      method: "PUT",
      body: JSON.stringify({ value })
    }),
  status: () => request("/api/status")
};
