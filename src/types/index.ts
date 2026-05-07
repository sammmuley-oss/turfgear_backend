// ─── Enums (as const objects for erasableSyntaxOnly compatibility) ───
export const MachineStatus = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  MAINTENANCE: 'MAINTENANCE',
} as const;
export type MachineStatus = (typeof MachineStatus)[keyof typeof MachineStatus];

export const LockerStatus = {
  AVAILABLE: 'available',
  RENTED: 'rented',
  OFFLINE: 'offline',
  DAMAGED: 'damaged',
  LOW_STOCK: 'low_stock',
} as const;
export type LockerStatus = (typeof LockerStatus)[keyof typeof LockerStatus];

export const RfidStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ERROR: 'error',
} as const;
export type RfidStatus = (typeof RfidStatus)[keyof typeof RfidStatus];

export const DiagnosticStatus = {
  HEALTHY: 'healthy',
  WARNING: 'warning',
  CRITICAL: 'critical',
} as const;
export type DiagnosticStatus = (typeof DiagnosticStatus)[keyof typeof DiagnosticStatus];

export const EventSeverity = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;
export type EventSeverity = (typeof EventSeverity)[keyof typeof EventSeverity];

export const NotificationType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  MACHINE_OFFLINE: 'machine_offline',
  LOW_STOCK: 'low_stock',
  PAYMENT: 'payment',
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export const BookingStatus = {
  ACTIVE: 'active',
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
} as const;
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export const UserRole = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  OPERATOR: 'operator',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// ─── Admin User ───
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  lastLogin?: string;
}

export interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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

// ─── Locker ───
export interface Locker {
  lockerId: string;
  equipment: string;
  sport: string;
  stockQty: number;
  maxQty: number;
  rfidStatus: RfidStatus;
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

// ─── Hardware Diagnostics ───
export interface DiagnosticItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: DiagnosticStatus;
  iconName: string; // serializable icon reference
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
  status: BookingStatus;
}

export interface TurfOccupancy {
  isOccupied: boolean;
  currentSession: string | null;
  activePlayers: number;
  sessionTimer: string;
  nextBooking: string | null;
  schedule: TurfBooking[];
}

// ─── City Overview ───
export interface CityOverview {
  name: string;
  machines: number;
  activeUsers: number;
  revenueToday: number;
  turfOccupancy: number;
}

// ─── Inventory ───
export interface InventoryItem {
  id: string;
  equipment: string;
  sport: string;
  totalStock: number;
  available: number;
  rented: number;
  damaged: number;
  machineId: string;
  city: string;
  lastRestocked: string;
}

// ─── Revenue ───
export interface RevenueData {
  date: string;
  revenue: number;
  transactions: number;
  city: string;
}

export interface RevenueSummary {
  totalRevenue: number;
  thisMonth: number;
  today: number;
  growth: number;
}

// ─── Activity ───
export type ActivityType = 'rental' | 'locker' | 'machine' | 'payment' | 'rfid' | 'alert';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  text: string;
  timestamp: string;
}

// ─── Dashboard Metrics ───
export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  iconName: string;
}

// ─── System Health ───
export type HealthStatus = 'healthy' | 'degraded' | 'down';

export interface SystemHealthItem {
  id: string;
  label: string;
  status: HealthStatus;
  value: number;
  unit: string;
  iconName: string;
}

// ─── Notifications / Alerts ───
export interface NotificationAlert {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  machineId?: string;
  city?: string;
}

// ─── Machine Actions ───
export interface MachineAction {
  id: string;
  label: string;
  description: string;
  iconName: string;
  variant: 'primary' | 'warning' | 'danger' | 'default';
}

// ─── API Response Wrappers ───
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Async State ───
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// ─── Socket Events ───
export interface SocketMachineUpdate {
  machineId: string;
  status: MachineStatus;
  lastHeartbeat: string;
  activeRentals: number;
  revenueToday: number;
}

export interface SocketLockerUpdate {
  machineId: string;
  lockerId: string;
  status: LockerStatus;
  stockQty: number;
}

export interface SocketAlertEvent {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  machineId: string;
  timestamp: string;
}
