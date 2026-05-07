import { NotificationType } from '../types';
import type {
  DashboardMetric,
  CityOverview,
  ActivityEvent,
  SystemHealthItem,
  InventoryItem,
  RevenueData,
  RevenueSummary,
  NotificationAlert,
} from '../types';

// ─── Dashboard Metrics ───
export const mockDashboardMetrics: DashboardMetric[] = [
  { id: 'total-machines', label: 'Total Machines', value: '42', trend: '+3 this month', trendDirection: 'up', iconName: 'Cpu' },
  { id: 'machines-online', label: 'Machines Online', value: '38', trend: '90.4% uptime', trendDirection: 'up', iconName: 'Wifi' },
  { id: 'active-rentals', label: 'Active Rentals', value: '17', trend: '+5 in last hour', trendDirection: 'up', iconName: 'ShoppingCart' },
  { id: 'todays-revenue', label: "Today's Revenue", value: '₹24,500', trend: '+12.3% vs yesterday', trendDirection: 'up', iconName: 'DollarSign' },
  { id: 'total-cities', label: 'Total Cities', value: '4', trend: 'Expanding to 2 more', trendDirection: 'neutral', iconName: 'MapPin' },
  { id: 'low-stock', label: 'Low Stock Alerts', value: '6', trend: '3 critical', trendDirection: 'down', iconName: 'AlertTriangle' },
];

// ─── City Overview ───
export const mockCities: CityOverview[] = [
  { name: 'Pimpri', machines: 12, activeUsers: 34, revenueToday: 8400, turfOccupancy: 78 },
  { name: 'Pune', machines: 15, activeUsers: 52, revenueToday: 12600, turfOccupancy: 85 },
  { name: 'Mumbai', machines: 10, activeUsers: 28, revenueToday: 9200, turfOccupancy: 65 },
  { name: 'Nashik', machines: 5, activeUsers: 11, revenueToday: 3100, turfOccupancy: 42 },
];

// ─── Activity Feed ───
export const mockActivities: ActivityEvent[] = [
  { id: 'act-1', type: 'rental', text: 'Football rented at Pimpri Turf — SWP-PIM-01', timestamp: '2 min ago' },
  { id: 'act-2', type: 'locker', text: 'Locker L-02 opened at Deccan Turf Zone', timestamp: '5 min ago' },
  { id: 'act-3', type: 'payment', text: 'Payment received ₹250 — UPI via Razorpay', timestamp: '8 min ago' },
  { id: 'act-4', type: 'rfid', text: 'RFID tag verified — Player #1047', timestamp: '12 min ago' },
  { id: 'act-5', type: 'machine', text: 'Machine SWP-NSK-01 switched to maintenance', timestamp: '18 min ago' },
  { id: 'act-6', type: 'alert', text: 'Low stock alert — Badminton Rackets at SWP-PUN-02', timestamp: '25 min ago' },
  { id: 'act-7', type: 'rental', text: 'Cricket bat returned at Andheri Sports Hub', timestamp: '30 min ago' },
  { id: 'act-8', type: 'payment', text: 'Deposit refund ₹500 — Cash at kiosk', timestamp: '35 min ago' },
];

// ─── System Health ───
export const mockSystemHealth: SystemHealthItem[] = [
  { id: 'server', label: 'Server Health', status: 'healthy', value: 99.8, unit: '% uptime', iconName: 'Server' },
  { id: 'api', label: 'API Response', status: 'healthy', value: 42, unit: 'ms avg', iconName: 'Gauge' },
  { id: 'socket', label: 'Socket Connections', status: 'healthy', value: 38, unit: 'active', iconName: 'Radio' },
  { id: 'database', label: 'Database Status', status: 'degraded', value: 87, unit: '% capacity', iconName: 'Database' },
];

// ─── Inventory ───
export const mockInventory: InventoryItem[] = [
  { id: 'inv-1', equipment: 'Football', sport: 'Football', totalStock: 24, available: 18, rented: 5, damaged: 1, machineId: 'SWP-PIM-01', city: 'Pimpri', lastRestocked: '2 days ago' },
  { id: 'inv-2', equipment: 'Cricket Bat', sport: 'Cricket', totalStock: 18, available: 10, rented: 7, damaged: 1, machineId: 'SWP-PUN-01', city: 'Pune', lastRestocked: '5 days ago' },
  { id: 'inv-3', equipment: 'Badminton Racket', sport: 'Badminton', totalStock: 20, available: 4, rented: 14, damaged: 2, machineId: 'SWP-MUM-01', city: 'Mumbai', lastRestocked: '1 week ago' },
  { id: 'inv-4', equipment: 'Tennis Racket', sport: 'Tennis', totalStock: 12, available: 8, rented: 4, damaged: 0, machineId: 'SWP-PIM-02', city: 'Pimpri', lastRestocked: '3 days ago' },
  { id: 'inv-5', equipment: 'Shuttlecocks', sport: 'Badminton', totalStock: 50, available: 35, rented: 12, damaged: 3, machineId: 'SWP-PUN-02', city: 'Pune', lastRestocked: '1 day ago' },
];

// ─── Revenue ───
export const mockRevenueSummary: RevenueSummary = {
  totalRevenue: 765500,
  thisMonth: 124800,
  today: 24500,
  growth: 12.3,
};

export const mockRevenueData: RevenueData[] = [
  { date: '2026-05-01', revenue: 18200, transactions: 72, city: 'Pune' },
  { date: '2026-05-02', revenue: 21500, transactions: 86, city: 'Pune' },
  { date: '2026-05-03', revenue: 19800, transactions: 79, city: 'Mumbai' },
  { date: '2026-05-04', revenue: 25100, transactions: 101, city: 'Pimpri' },
  { date: '2026-05-05', revenue: 22400, transactions: 89, city: 'Pimpri' },
  { date: '2026-05-06', revenue: 28300, transactions: 113, city: 'Mumbai' },
  { date: '2026-05-07', revenue: 24500, transactions: 98, city: 'Nashik' },
];

// ─── Notifications ───
export const mockNotifications: NotificationAlert[] = [
  { id: 'n1', type: NotificationType.MACHINE_OFFLINE, title: 'Machine Offline', message: 'SWP-PUN-02 went offline at Kothrud', timestamp: '5 min ago', read: false, machineId: 'SWP-PUN-02', city: 'Pune' },
  { id: 'n2', type: NotificationType.LOW_STOCK, title: 'Low Stock Alert', message: 'Badminton Rackets low at SWP-MUM-01', timestamp: '12 min ago', read: false, machineId: 'SWP-MUM-01', city: 'Mumbai' },
  { id: 'n3', type: NotificationType.PAYMENT, title: 'Payment Received', message: '₹2,400 collected today from Pimpri', timestamp: '30 min ago', read: true, city: 'Pimpri' },
  { id: 'n4', type: NotificationType.ERROR, title: 'RFID Error', message: 'Scanner malfunction on SWP-NSK-01 L-07', timestamp: '1 hr ago', read: true, machineId: 'SWP-NSK-01', city: 'Nashik' },
  { id: 'n5', type: NotificationType.SUCCESS, title: 'Sync Complete', message: 'Inventory synced across all Pimpri machines', timestamp: '2 hrs ago', read: true, city: 'Pimpri' },
];
