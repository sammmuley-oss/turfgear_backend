import { useEffect, useState, useCallback, useRef } from 'react';
import { socketManager } from './socketClient';
import { SOCKET_EVENTS } from './socketEvents';
import type {
  MachineUpdatePayload, LockerUpdatePayload, DiagnosticsUpdatePayload,
  RevenueUpdatePayload, AlertPayload, ActivityPayload, TurfUpdatePayload,
} from './socketEvents';

// ─── Connection Status Hook ───
export function useSocketConnection() {
  const [isConnected, setIsConnected] = useState(socketManager.isConnected);

  useEffect(() => {
    socketManager.connect();
    const unsub = socketManager.onConnectionChange(setIsConnected);
    return unsub;
  }, []);

  return { isConnected, socketId: socketManager.id };
}

// ─── Generic Event Listener Hook ───
function useSocketEvent<T>(event: string, handler: (data: T) => void): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const fn = (data: T) => handlerRef.current(data);
    socketManager.on(event, fn);
    return () => { socketManager.off(event, fn); };
  }, [event]);
}

// ─── Machine Updates Hook (dashboard-level) ───
export function useMachineUpdates(onUpdate: (data: MachineUpdatePayload) => void) {
  useSocketEvent(SOCKET_EVENTS.MACHINE_UPDATE, onUpdate);
}

// ─── Locker Updates Hook ───
export function useLockerUpdates(onUpdate: (data: LockerUpdatePayload) => void) {
  useSocketEvent(SOCKET_EVENTS.LOCKER_UPDATE, onUpdate);
}

// ─── Revenue Updates Hook ───
export function useRevenueUpdates(onUpdate: (data: RevenueUpdatePayload) => void) {
  useSocketEvent(SOCKET_EVENTS.REVENUE_UPDATE, onUpdate);
}

// ─── Activity Stream Hook ───
export function useActivityStream(maxItems: number = 20) {
  const [activities, setActivities] = useState<ActivityPayload[]>([]);

  useSocketEvent<ActivityPayload>(SOCKET_EVENTS.ACTIVITY_NEW, useCallback((data) => {
    setActivities(prev => [data, ...prev].slice(0, maxItems));
  }, [maxItems]));

  return activities;
}

// ─── Alert Stream Hook ───
export function useAlertStream() {
  const [alerts, setAlerts] = useState<AlertPayload[]>([]);

  useSocketEvent<AlertPayload>(SOCKET_EVENTS.ALERT_NEW, useCallback((data) => {
    setAlerts(prev => [data, ...prev].slice(0, 50));
  }, []));

  const clearAlerts = useCallback(() => setAlerts([]), []);
  return { alerts, clearAlerts };
}

// ─── Machine Room Subscription Hook (detail page) ───
export function useMachineRoom(machineId: string | undefined) {
  const [machineUpdate, setMachineUpdate] = useState<MachineUpdatePayload | null>(null);
  const [lockerUpdates, setLockerUpdates] = useState<Map<string, LockerUpdatePayload>>(new Map());
  const [diagnosticsUpdate, setDiagnosticsUpdate] = useState<DiagnosticsUpdatePayload | null>(null);
  const [turfUpdate, setTurfUpdate] = useState<TurfUpdatePayload | null>(null);

  useEffect(() => {
    if (!machineId) return;

    socketManager.subscribeMachine(machineId);

    const onMachine = (data: MachineUpdatePayload) => {
      if (data.machineId === machineId) setMachineUpdate(data);
    };
    const onLocker = (data: LockerUpdatePayload) => {
      if (data.machineId === machineId) {
        setLockerUpdates(prev => new Map(prev).set(data.lockerId, data));
      }
    };
    const onDiag = (data: DiagnosticsUpdatePayload) => {
      if (data.machineId === machineId) setDiagnosticsUpdate(data);
    };
    const onTurf = (data: TurfUpdatePayload) => {
      if (data.machineId === machineId) setTurfUpdate(data);
    };

    socketManager.on(SOCKET_EVENTS.MACHINE_UPDATE, onMachine);
    socketManager.on(SOCKET_EVENTS.LOCKER_UPDATE, onLocker);
    socketManager.on(SOCKET_EVENTS.DIAGNOSTICS_UPDATE, onDiag);
    socketManager.on(SOCKET_EVENTS.TURF_UPDATE, onTurf);

    return () => {
      socketManager.unsubscribeMachine(machineId);
      socketManager.off(SOCKET_EVENTS.MACHINE_UPDATE, onMachine);
      socketManager.off(SOCKET_EVENTS.LOCKER_UPDATE, onLocker);
      socketManager.off(SOCKET_EVENTS.DIAGNOSTICS_UPDATE, onDiag);
      socketManager.off(SOCKET_EVENTS.TURF_UPDATE, onTurf);
    };
  }, [machineId]);

  return { machineUpdate, lockerUpdates, diagnosticsUpdate, turfUpdate };
}
