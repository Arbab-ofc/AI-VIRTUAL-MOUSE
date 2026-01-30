import { useCallback, useEffect, useState } from "react";
import useWebSocket from "./useWebSocket";
import { api } from "../services/api";

const defaultFingers = {
  thumb: false,
  index: false,
  middle: false,
  ring: false,
  pinky: false
};

export default function useVirtualMouse() {
  const { isConnected, lastMessage, connectionAttempts, connect } = useWebSocket();
  const [systemState, setSystemState] = useState("idle");
  const [handDetected, setHandDetected] = useState(false);
  const [currentGesture, setCurrentGesture] = useState(null);
  const [fingerStates, setFingerStates] = useState(defaultFingers);
  const [confidence, setConfidence] = useState(0);
  const [fps, setFps] = useState(0);
  const [sensitivity, setSensitivity] = useState(5);
  const [resolution, setResolution] = useState("640 x 480");
  const [error, setError] = useState(null);

  useEffect(() => {
    api.status()
      .then((data) => {
        setSystemState(data.state || "idle");
        setHandDetected(data.hand_detected);
        setCurrentGesture(data.gesture);
        setFps(data.fps || 0);
        if (data.resolution) {
          setResolution(`${data.resolution[0]} x ${data.resolution[1]}`);
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to load status");
      });
  }, []);

  useEffect(() => {
    if (lastMessage?.type === "status_update") {
      const { data } = lastMessage;
      setSystemState(data.state);
      setHandDetected(Boolean(data.hand_detected));
      setCurrentGesture(data.gesture || null);
      setFingerStates(data.fingers || defaultFingers);
      setConfidence(data.confidence || 0);
      setFps(data.fps || 0);
    }
  }, [lastMessage]);

  const startMouse = useCallback(async () => {
    setError(null);
    try {
      await api.start();
      setSystemState("running");
    } catch (err) {
      setError(err.message || "Failed to start system");
    }
  }, []);

  const stopMouse = useCallback(async () => {
    setError(null);
    try {
      const response = await api.stop();
      setSystemState(response.status);
    } catch (err) {
      setError(err.message || "Failed to stop system");
    }
  }, []);

  const pauseMouse = useCallback(async () => {
    setError(null);
    try {
      const response = await api.pause();
      setSystemState(response.status);
    } catch (err) {
      setError(err.message || "Failed to pause system");
    }
  }, []);

  const resumeMouse = useCallback(async () => {
    setError(null);
    try {
      const response = await api.resume();
      setSystemState(response.status);
    } catch (err) {
      setError(err.message || "Failed to resume system");
    }
  }, []);

  const resetPosition = useCallback(async () => {
    setError(null);
    try {
      await api.reset();
    } catch (err) {
      setError(err.message || "Failed to reset cursor");
    }
  }, []);

  const updateSensitivity = useCallback(async (value) => {
    setError(null);
    try {
      const response = await api.updateSensitivity(value);
      setSensitivity(response.sensitivity);
    } catch (err) {
      setError(err.message || "Failed to update sensitivity");
    }
  }, []);

  const reconnect = useCallback(() => {
    connect();
  }, [connect]);

  return {
    systemState,
    handDetected,
    currentGesture,
    fingerStates,
    confidence,
    fps,
    sensitivity,
    resolution,
    error,
    isConnected,
    connectionAttempts,
    startMouse,
    stopMouse,
    pauseMouse,
    resumeMouse,
    resetPosition,
    setSensitivity: updateSensitivity,
    reconnect
  };
}
