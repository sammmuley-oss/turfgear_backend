import { useState, useEffect, useRef, useCallback } from 'react';
import type { SocketMachineUpdate } from '../types';

/**
 * Hook for realtime machine status via Socket.IO.
 * Currently simulates updates. Replace with real socket when backend is ready.
 */
export function useRealtimeStatus() {
  const [updates, _setUpdates] = useState<SocketMachineUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const connect = useCallback(() => {
    // Simulate socket connection
    setIsConnected(true);
    console.log('[Socket] Connected (mock)');
  }, []);

  const disconnect = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsConnected(false);
    console.log('[Socket] Disconnected');
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { updates, isConnected, connect, disconnect };
}
