// ─── Socket Event Constants (mirrors backend) ───
export const SOCKET_EVENTS = {
  MACHINE_UPDATE: 'machine:update',
  MACHINE_OFFLINE: 'machine:offline',
  MACHINE_ONLINE: 'machine:online',
  INVENTORY_UPDATE: 'inventory:update',
  LOCKER_UPDATE: 'locker:update',
  TURF_UPDATE: 'turf:update',
  REVENUE_UPDATE: 'revenue:update',
  TELEMETRY_UPDATE: 'telemetry:update',
  DIAGNOSTICS_UPDATE: 'diagnostics:update',
  ALERT_NEW: 'alert:new',
  ACTIVITY_NEW: 'activity:new',
  SYSTEM_HEARTBEAT: 'system:heartbeat',
  CONNECTION_STATUS: 'connection:status',
  MACHINE_SUBSCRIBE: 'machine:subscribe',
  MACHINE_UNSUBSCRIBE: 'machine:unsubscribe',
  ADMIN_PING: 'admin:ping',
} as const;

// ─── Payload Types ───
export interface MachineUpdatePayload {
  machineId: string;
  status: string;
  lastHeartbeat: string;
  activeRentals: number;
  revenueToday: number;
  stockLevel: number;
  uptime: number;
  occupancy: number;
}

export interface LockerUpdatePayload {
  machineId: string;
  lockerId: string;
  status: string;
  stockQty: number;
  equipment: string;
}

export interface DiagnosticsUpdatePayload {
  machineId: string;
  diagnostics: Array<{ id: string; value: number; status: string }>;
}

export interface RevenueUpdatePayload {
  machineId: string;
  revenueToday: number;
  lastTransaction: number;
}

export interface AlertPayload {
  id: string;
  type: string;
  title: string;
  message: string;
  machineId: string;
  city: string;
  severity: string;
  timestamp: string;
}

export interface ActivityPayload {
  id: string;
  type: string;
  text: string;
  timestamp: string;
  machineId?: string;
}

export interface TurfUpdatePayload {
  machineId: string;
  isOccupied: boolean;
  activePlayers: number;
  sessionTimer: string;
}
