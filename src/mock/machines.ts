import {
  MachineStatus,
  LockerStatus,
  RfidStatus,
  DiagnosticStatus,
  EventSeverity,
  BookingStatus,
} from '../types';
import type {
  Machine,
  Locker,
  MachineAnalytics,
  DiagnosticItem,
  MachineEvent,
  TurfOccupancy,
  MachineAction,
} from '../types';

// ─── Factories ───
function makeLockers(prefix: string): Locker[] {
  const items: Omit<Locker, 'lockerId'>[] = [
    { equipment: 'Football', sport: 'Football', stockQty: 3, maxQty: 4, rfidStatus: RfidStatus.ACTIVE, status: LockerStatus.AVAILABLE, sensorHealth: 98, hasDamageWarning: false, lastAccessed: '10 min ago' },
    { equipment: 'Cricket Bat', sport: 'Cricket', stockQty: 2, maxQty: 3, rfidStatus: RfidStatus.ACTIVE, status: LockerStatus.RENTED, sensorHealth: 95, hasDamageWarning: false, lastAccessed: '2 min ago' },
    { equipment: 'Badminton Racket', sport: 'Badminton', stockQty: 1, maxQty: 4, rfidStatus: RfidStatus.ACTIVE, status: LockerStatus.LOW_STOCK, sensorHealth: 92, hasDamageWarning: false, lastAccessed: '5 min ago' },
    { equipment: 'Cricket Ball Set', sport: 'Cricket', stockQty: 5, maxQty: 6, rfidStatus: RfidStatus.ACTIVE, status: LockerStatus.AVAILABLE, sensorHealth: 100, hasDamageWarning: false, lastAccessed: '15 min ago' },
    { equipment: 'Shin Guards', sport: 'Football', stockQty: 0, maxQty: 4, rfidStatus: RfidStatus.INACTIVE, status: LockerStatus.OFFLINE, sensorHealth: 0, hasDamageWarning: false, lastAccessed: '2 hrs ago' },
    { equipment: 'Tennis Racket', sport: 'Tennis', stockQty: 2, maxQty: 2, rfidStatus: RfidStatus.ACTIVE, status: LockerStatus.AVAILABLE, sensorHealth: 97, hasDamageWarning: false, lastAccessed: '20 min ago' },
    { equipment: 'Goalkeeper Gloves', sport: 'Football', stockQty: 1, maxQty: 3, rfidStatus: RfidStatus.ERROR, status: LockerStatus.DAMAGED, sensorHealth: 34, hasDamageWarning: true, lastAccessed: '1 hr ago' },
    { equipment: 'Shuttlecocks', sport: 'Badminton', stockQty: 8, maxQty: 10, rfidStatus: RfidStatus.ACTIVE, status: LockerStatus.AVAILABLE, sensorHealth: 99, hasDamageWarning: false, lastAccessed: '8 min ago' },
  ];
  return items.map((item, i) => ({ lockerId: `${prefix}-L${String(i + 1).padStart(2, '0')}`, ...item }));
}

function makeAnalytics(rev: number, rentals: number): MachineAnalytics {
  return {
    revenueToday: rev,
    activeRentals: rentals,
    successfulPayments: Math.floor(rev / 200),
    failedTransactions: Math.floor(Math.random() * 3),
    stockUtilization: 60 + Math.floor(Math.random() * 30),
    avgRentalDuration: `${(1 + Math.random() * 2).toFixed(1)} hrs`,
  };
}

function makeDiagnostics(online: boolean): DiagnosticItem[] {
  const base: DiagnosticItem[] = [
    { id: 'cpu', label: 'CPU Load', value: online ? 23 : 0, unit: '%', status: DiagnosticStatus.HEALTHY, iconName: 'Cpu' },
    { id: 'ram', label: 'RAM Usage', value: online ? 58 : 0, unit: '%', status: DiagnosticStatus.HEALTHY, iconName: 'Gauge' },
    { id: 'network', label: 'Network Signal', value: online ? 92 : 0, unit: '%', status: DiagnosticStatus.HEALTHY, iconName: 'Signal' },
    { id: 'rfid', label: 'RFID Scanner', value: online ? 100 : 0, unit: '%', status: DiagnosticStatus.HEALTHY, iconName: 'ScanLine' },
    { id: 'locker-ctrl', label: 'Locker Controller', value: online ? 100 : 0, unit: '%', status: DiagnosticStatus.HEALTHY, iconName: 'Lock' },
    { id: 'camera', label: 'Camera Status', value: online ? 95 : 0, unit: '%', status: DiagnosticStatus.HEALTHY, iconName: 'Camera' },
    { id: 'sensors', label: 'Sensor Array', value: online ? 88 : 0, unit: '%', status: online ? DiagnosticStatus.WARNING : DiagnosticStatus.CRITICAL, iconName: 'Thermometer' },
    { id: 'api', label: 'API Latency', value: online ? 38 : 999, unit: 'ms', status: online ? DiagnosticStatus.HEALTHY : DiagnosticStatus.CRITICAL, iconName: 'Wifi' },
  ];
  if (!online) return base.map(d => ({ ...d, status: DiagnosticStatus.CRITICAL }));
  return base;
}

function makeEvents(machineId: string): MachineEvent[] {
  return [
    { id: 'e1', timestamp: '3:42 PM', severity: EventSeverity.INFO, text: 'Locker L-02 opened — Cricket Bat dispensed', type: 'locker' },
    { id: 'e2', timestamp: '3:40 PM', severity: EventSeverity.SUCCESS, text: 'Payment verified ₹250 — UPI via Razorpay', type: 'payment' },
    { id: 'e3', timestamp: '3:38 PM', severity: EventSeverity.SUCCESS, text: 'RFID authenticated — Player #1047', type: 'rfid' },
    { id: 'e4', timestamp: '3:30 PM', severity: EventSeverity.INFO, text: 'Turf booked — Football 4:00 PM slot', type: 'booking' },
    { id: 'e5', timestamp: '3:15 PM', severity: EventSeverity.WARNING, text: 'Low stock detected — Badminton Rackets (1 remaining)', type: 'alert' },
    { id: 'e6', timestamp: '2:50 PM', severity: EventSeverity.INFO, text: 'Locker L-04 returned — Cricket Ball Set', type: 'locker' },
    { id: 'e7', timestamp: '2:30 PM', severity: EventSeverity.SUCCESS, text: 'Payment received ₹400 — Cash at kiosk', type: 'payment' },
    { id: 'e8', timestamp: '2:10 PM', severity: EventSeverity.ERROR, text: 'RFID scanner error on Locker L-07 — manual override used', type: 'error' },
    { id: 'e9', timestamp: '1:45 PM', severity: EventSeverity.INFO, text: `Machine ${machineId} health check passed`, type: 'system' },
    { id: 'e10', timestamp: '1:00 PM', severity: EventSeverity.WARNING, text: 'Sensor array degraded — Locker L-07 temperature warning', type: 'hardware' },
  ];
}

function makeOccupancy(occupied: boolean): TurfOccupancy {
  return {
    isOccupied: occupied,
    currentSession: occupied ? 'Cricket Match — Team Alpha vs Team Beta' : null,
    activePlayers: occupied ? 12 : 0,
    sessionTimer: occupied ? '01:23:45' : '00:00:00',
    nextBooking: 'Football — 5:00 PM',
    schedule: [
      { time: '3:00 PM – 4:00 PM', team: 'Team Alpha vs Beta', players: 12, status: occupied ? BookingStatus.ACTIVE : BookingStatus.COMPLETED },
      { time: '5:00 PM – 6:00 PM', team: 'FC Pimpri', players: 10, status: BookingStatus.UPCOMING },
      { time: '7:00 PM – 8:30 PM', team: 'Night Warriors', players: 14, status: BookingStatus.UPCOMING },
    ],
  };
}

// ─── Machine Data ───
export const mockMachines: Machine[] = [
  {
    machineId: 'SWP-PIM-01', city: 'Pimpri', turfName: 'Sports Arena Pimpri', turfAddress: 'Sector 22, PCMC, Pimpri-Chinchwad',
    status: MachineStatus.ONLINE, uptime: 99.2, lastHeartbeat: '2 sec ago', ipAddress: '192.168.1.101', firmwareVersion: 'v2.4.1',
    occupancy: 78, activeRentals: 4, stockLevel: 85, revenueToday: 4200, totalRevenue: 142500, installedDate: '2025-11-15',
    lockers: makeLockers('PIM01'), analytics: makeAnalytics(4200, 4), diagnostics: makeDiagnostics(true), events: makeEvents('SWP-PIM-01'), turfOccupancy: makeOccupancy(true),
  },
  {
    machineId: 'SWP-PUN-01', city: 'Pune', turfName: 'Deccan Turf Zone', turfAddress: 'FC Road, Shivajinagar, Pune',
    status: MachineStatus.ONLINE, uptime: 98.7, lastHeartbeat: '5 sec ago', ipAddress: '192.168.2.101', firmwareVersion: 'v2.4.1',
    occupancy: 85, activeRentals: 6, stockLevel: 62, revenueToday: 5800, totalRevenue: 198000, installedDate: '2025-10-01',
    lockers: makeLockers('PUN01'), analytics: makeAnalytics(5800, 6), diagnostics: makeDiagnostics(true), events: makeEvents('SWP-PUN-01'), turfOccupancy: makeOccupancy(true),
  },
  {
    machineId: 'SWP-MUM-01', city: 'Mumbai', turfName: 'Andheri Sports Hub', turfAddress: 'Lokhandwala, Andheri West, Mumbai',
    status: MachineStatus.ONLINE, uptime: 97.5, lastHeartbeat: '8 sec ago', ipAddress: '192.168.3.101', firmwareVersion: 'v2.3.8',
    occupancy: 65, activeRentals: 3, stockLevel: 45, revenueToday: 6100, totalRevenue: 215000, installedDate: '2025-09-10',
    lockers: makeLockers('MUM01'), analytics: makeAnalytics(6100, 3), diagnostics: makeDiagnostics(true), events: makeEvents('SWP-MUM-01'), turfOccupancy: makeOccupancy(false),
  },
  {
    machineId: 'SWP-NSK-01', city: 'Nashik', turfName: 'Nashik Central Turf', turfAddress: 'College Road, Nashik',
    status: MachineStatus.MAINTENANCE, uptime: 85.3, lastHeartbeat: '12 min ago', ipAddress: '192.168.4.101', firmwareVersion: 'v2.3.5',
    occupancy: 0, activeRentals: 0, stockLevel: 30, revenueToday: 0, totalRevenue: 67000, installedDate: '2026-01-20',
    lockers: makeLockers('NSK01'), analytics: makeAnalytics(0, 0), diagnostics: makeDiagnostics(false), events: makeEvents('SWP-NSK-01'), turfOccupancy: makeOccupancy(false),
  },
  {
    machineId: 'SWP-PIM-02', city: 'Pimpri', turfName: 'Chinchwad Park Turf', turfAddress: 'Chinchwad Station Rd, PCMC',
    status: MachineStatus.ONLINE, uptime: 99.8, lastHeartbeat: '1 sec ago', ipAddress: '192.168.1.102', firmwareVersion: 'v2.4.1',
    occupancy: 52, activeRentals: 2, stockLevel: 78, revenueToday: 3200, totalRevenue: 95000, installedDate: '2026-02-01',
    lockers: makeLockers('PIM02'), analytics: makeAnalytics(3200, 2), diagnostics: makeDiagnostics(true), events: makeEvents('SWP-PIM-02'), turfOccupancy: makeOccupancy(true),
  },
  {
    machineId: 'SWP-PUN-02', city: 'Pune', turfName: 'Kothrud Sports Complex', turfAddress: 'Paud Rd, Kothrud, Pune',
    status: MachineStatus.OFFLINE, uptime: 72.1, lastHeartbeat: '45 min ago', ipAddress: '192.168.2.102', firmwareVersion: 'v2.3.5',
    occupancy: 0, activeRentals: 0, stockLevel: 20, revenueToday: 1200, totalRevenue: 48000, installedDate: '2026-03-15',
    lockers: makeLockers('PUN02'), analytics: makeAnalytics(1200, 0), diagnostics: makeDiagnostics(false), events: makeEvents('SWP-PUN-02'), turfOccupancy: makeOccupancy(false),
  },
];

// ─── Machine Actions ───
export const mockMachineActions: MachineAction[] = [
  { id: 'restart', label: 'Restart Machine', description: 'Soft reboot the machine controller', iconName: 'RefreshCw', variant: 'primary' },
  { id: 'lock-all', label: 'Lock All Lockers', description: 'Emergency lock all compartments', iconName: 'LockKeyhole', variant: 'warning' },
  { id: 'diagnostics', label: 'Run Diagnostics', description: 'Full hardware health scan', iconName: 'Stethoscope', variant: 'default' },
  { id: 'sync', label: 'Sync Inventory', description: 'Pull latest stock from cloud', iconName: 'PackageCheck', variant: 'default' },
  { id: 'maintenance', label: 'Maintenance Mode', description: 'Take machine offline for service', iconName: 'Wrench', variant: 'danger' },
];

// ─── Helpers ───
export function getMockMachineById(id: string): Machine | undefined {
  return mockMachines.find(m => m.machineId === id);
}

export function getMockUniqueCities(): string[] {
  return [...new Set(mockMachines.map(m => m.city))];
}
