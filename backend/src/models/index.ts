// ─── Enums ───
export enum MachineStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE',
}

export enum LockerStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  OFFLINE = 'offline',
  DAMAGED = 'damaged',
  LOW_STOCK = 'low_stock',
}

export enum DiagnosticStatus {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  CRITICAL = 'critical',
}

export enum EventSeverity {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

// ─── Locker ───
export interface Locker {
  lockerId: string;
  equipment: string;
  sport: string;
  stockQty: number;
  maxQty: number;
  rfidStatus: 'active' | 'inactive' | 'error';
  status: LockerStatus;
  sensorHealth: number;
  hasDamageWarning: boolean;
  lastAccessed: string;
}

// ─── Machine Analytics ───
export interface MachineAnalytics {
  revenueToday: number;
  activeRentals: number;
  successfulPayments: number;
  failedTransactions: number;
  stockUtilization: number;
  avgRentalDuration: string;
}

// ─── Diagnostics ───
export interface DiagnosticItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: DiagnosticStatus;
  iconName: string;
}

// ─── Events ───
export interface MachineEvent {
  id: string;
  timestamp: string;
  severity: EventSeverity;
  text: string;
  type: string;
}

// ─── Turf Occupancy ───
export interface TurfBooking {
  time: string;
  team: string;
  players: number;
  status: 'active' | 'upcoming' | 'completed';
}

export interface TurfOccupancy {
  isOccupied: boolean;
  currentSession: string | null;
  activePlayers: number;
  sessionTimer: string;
  nextBooking: string | null;
  schedule: TurfBooking[];
}

// ─── Machine ───
export interface Machine {
  machineId: string;
  city: string;
  turfName: string;
  turfAddress: string;
  status: MachineStatus;
  uptime: number;
  lastHeartbeat: string;
  ipAddress: string;
  firmwareVersion: string;
  occupancy: number;
  activeRentals: number;
  stockLevel: number;
  revenueToday: number;
  totalRevenue: number;
  installedDate: string;
  lockers: Locker[];
  analytics: MachineAnalytics;
  diagnostics: DiagnosticItem[];
  events: MachineEvent[];
  turfOccupancy: TurfOccupancy;
}

// ─── API Response ───
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// ─── Dashboard ───
export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  iconName: string;
}

export interface CityOverview {
  name: string;
  machines: number;
  activeUsers: number;
  revenueToday: number;
  turfOccupancy: number;
}

export interface ActivityEvent {
  id: string;
  type: string;
  text: string;
  timestamp: string;
}

export interface SystemHealthItem {
  id: string;
  label: string;
  status: 'healthy' | 'degraded' | 'down';
  value: number;
  unit: string;
  iconName: string;
}
