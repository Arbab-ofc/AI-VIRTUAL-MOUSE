import { useCallback, useEffect, useRef, useState } from "react";
import { WS_BASE_URL } from "../utils/constants";

export default function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const socketRef = useRef(null);
  const heartbeatRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const clearTimers = () => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const disconnect = useCallback(() => {
    clearTimers();
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const connect = useCallback(() => {
    if (socketRef.current) {
      return;
    }

    const socket = new WebSocket(`${WS_BASE_URL}/ws/status`);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      setConnectionAttempts(0);
      heartbeatRef.current = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "heartbeat" }));
        }
      }, 30000);
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        setLastMessage(payload);
      } catch (error) {
        console.error("Failed to parse message", error);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      socketRef.current = null;
      clearTimers();
      setConnectionAttempts((attempts) => attempts + 1);
    };

    socket.onerror = () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  useEffect(() => {
    if (!isConnected && connectionAttempts > 0 && connectionAttempts <= 5) {
      const delay = Math.min(1000 * 2 ** (connectionAttempts - 1), 10000);
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, delay);
    }
  }, [connect, connectionAttempts, isConnected]);

  const sendMessage = useCallback((data) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  }, []);

  return {
    isConnected,
    lastMessage,
    connectionAttempts,
    connect,
    disconnect,
    sendMessage
  };
}
