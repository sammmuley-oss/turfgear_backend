import type { Server } from 'socket.io';
import { SOCKET_EVENTS } from './events.js';
import type {
  MachineUpdatePayload, LockerUpdatePayload, DiagnosticsUpdatePayload,
  RevenueUpdatePayload, AlertPayload, ActivityPayload, TurfUpdatePayload,
} from './events.js';
import { machines } from '../mock/machines.js';

/**
 * Telemetry Emitter — simulates real IoT machine telemetry.
 * Replace with real MQTT/hardware feeds when ESP32 devices are connected.
 */
export class TelemetryEmitter {
  private io: Server;
  private intervals: NodeJS.Timeout[] = [];
  private activityCounter = 0;
  private alertCounter = 0;

  constructor(io: Server) {
    this.io = io;
  }

  start(): void {
    console.log('  📡 Telemetry emitter started');

    // Machine status updates — every 4 seconds
    this.intervals.push(setInterval(() => this.emitMachineUpdate(), 4000));

    // Locker updates — every 8 seconds
    this.intervals.push(setInterval(() => this.emitLockerUpdate(), 8000));

    // Diagnostics — every 6 seconds
    this.intervals.push(setInterval(() => this.emitDiagnosticsUpdate(), 6000));

    // Revenue ticks — every 10 seconds
    this.intervals.push(setInterval(() => this.emitRevenueUpdate(), 10000));

    // Activity feed — every 5 seconds
    this.intervals.push(setInterval(() => this.emitActivityEvent(), 5000));

    // Turf updates — every 12 seconds
    this.intervals.push(setInterval(() => this.emitTurfUpdate(), 12000));

    // Alerts — every 15-25 seconds (random)
    this.scheduleNextAlert();

    // System heartbeat — every 3 seconds
    this.intervals.push(setInterval(() => {
      this.io.emit(SOCKET_EVENTS.SYSTEM_HEARTBEAT, {
        timestamp: new Date().toISOString(),
        connectedClients: this.io.engine?.clientsCount ?? 0,
      });
    }, 3000));
  }

  stop(): void {
    this.intervals.forEach(clearInterval);
    this.intervals = [];
    console.log('  📡 Telemetry emitter stopped');
  }

  // ─── Machine Updates ───
  private emitMachineUpdate(): void {
    const onlineMachines = machines.filter(m => m.status === 'ONLINE');
    if (onlineMachines.length === 0) return;

    const machine = onlineMachines[Math.floor(Math.random() * onlineMachines.length)];
    const revDelta = Math.floor(Math.random() * 300);
    machine.revenueToday += revDelta;
    machine.activeRentals = Math.max(0, machine.activeRentals + (Math.random() > 0.5 ? 1 : -1));
    machine.stockLevel = Math.max(5, Math.min(100, machine.stockLevel + (Math.random() > 0.6 ? -2 : 1)));
    machine.occupancy = Math.max(0, Math.min(100, machine.occupancy + Math.floor(Math.random() * 10 - 5)));
    machine.lastHeartbeat = `${Math.floor(Math.random() * 10)} sec ago`;

    const payload: MachineUpdatePayload = {
      machineId: machine.machineId,
      status: machine.status,
      lastHeartbeat: machine.lastHeartbeat,
      activeRentals: machine.activeRentals,
      revenueToday: machine.revenueToday,
      stockLevel: machine.stockLevel,
      uptime: machine.uptime,
      occupancy: machine.occupancy,
    };

    this.io.emit(SOCKET_EVENTS.MACHINE_UPDATE, payload);
    // Also emit to machine-specific room
    this.io.to(`machine:${machine.machineId}`).emit(SOCKET_EVENTS.MACHINE_UPDATE, payload);
  }

  // ─── Locker Updates ───
  private emitLockerUpdate(): void {
    const onlineMachines = machines.filter(m => m.status === 'ONLINE');
    if (onlineMachines.length === 0) return;

    const machine = onlineMachines[Math.floor(Math.random() * onlineMachines.length)];
    const locker = machine.lockers[Math.floor(Math.random() * machine.lockers.length)];

    const statuses = ['available', 'rented', 'available', 'available'] as const;
    locker.status = statuses[Math.floor(Math.random() * statuses.length)] as any;
    if (locker.status === 'rented' && locker.stockQty > 0) locker.stockQty--;
    if (locker.status === 'available' && locker.stockQty < locker.maxQty) locker.stockQty++;

    const payload: LockerUpdatePayload = {
      machineId: machine.machineId,
      lockerId: locker.lockerId,
      status: locker.status,
      stockQty: locker.stockQty,
      equipment: locker.equipment,
    };

    this.io.emit(SOCKET_EVENTS.LOCKER_UPDATE, payload);
    this.io.to(`machine:${machine.machineId}`).emit(SOCKET_EVENTS.LOCKER_UPDATE, payload);
  }

  // ─── Diagnostics ───
  private emitDiagnosticsUpdate(): void {
    const onlineMachines = machines.filter(m => m.status === 'ONLINE');
    if (onlineMachines.length === 0) return;

    const machine = onlineMachines[Math.floor(Math.random() * onlineMachines.length)];
    const updatedDiags = machine.diagnostics.map(d => {
      const fluctuation = Math.floor(Math.random() * 6 - 3);
      const newValue = Math.max(0, Math.min(100, d.value + fluctuation));
      d.value = newValue;
      d.status = newValue >= 80 ? 'healthy' : newValue >= 50 ? 'warning' : 'critical';
      return { id: d.id, value: d.value, status: d.status };
    });

    const payload: DiagnosticsUpdatePayload = {
      machineId: machine.machineId,
      diagnostics: updatedDiags,
    };

    this.io.to(`machine:${machine.machineId}`).emit(SOCKET_EVENTS.DIAGNOSTICS_UPDATE, payload);
  }

  // ─── Revenue ───
  private emitRevenueUpdate(): void {
    const onlineMachines = machines.filter(m => m.status === 'ONLINE');
    if (onlineMachines.length === 0) return;

    const machine = onlineMachines[Math.floor(Math.random() * onlineMachines.length)];
    const amount = [150, 200, 250, 300, 400, 500][Math.floor(Math.random() * 6)];
    machine.revenueToday += amount;
    machine.analytics.revenueToday = machine.revenueToday;
    machine.analytics.successfulPayments++;

    const payload: RevenueUpdatePayload = {
      machineId: machine.machineId,
      revenueToday: machine.revenueToday,
      lastTransaction: amount,
    };

    this.io.emit(SOCKET_EVENTS.REVENUE_UPDATE, payload);
  }

  // ─── Activity Feed ───
  private emitActivityEvent(): void {
    this.activityCounter++;
    const templates = [
      { type: 'rental', gen: (m: string) => `Football rented at ${m}` },
      { type: 'locker', gen: (m: string) => `Locker L-${String(Math.floor(Math.random()*8)+1).padStart(2,'0')} accessed at ${m}` },
      { type: 'payment', gen: (_m: string) => `Payment received ₹${[150,200,250,300,400][Math.floor(Math.random()*5)]} — UPI` },
      { type: 'rfid', gen: (_m: string) => `RFID tag verified — Player #${1000 + Math.floor(Math.random()*500)}` },
      { type: 'machine', gen: (m: string) => `Health check passed — ${m}` },
      { type: 'rental', gen: (m: string) => `Cricket bat returned at ${m}` },
      { type: 'payment', gen: (_m: string) => `Deposit refund ₹${[200,300,500][Math.floor(Math.random()*3)]} processed` },
    ];

    const onlineMachines = machines.filter(m => m.status === 'ONLINE');
    const machine = onlineMachines[Math.floor(Math.random() * onlineMachines.length)];
    const template = templates[Math.floor(Math.random() * templates.length)];

    const payload: ActivityPayload = {
      id: `live-act-${this.activityCounter}`,
      type: template.type,
      text: template.gen(machine?.turfName ?? 'Unknown'),
      timestamp: 'Just now',
      machineId: machine?.machineId,
    };

    this.io.emit(SOCKET_EVENTS.ACTIVITY_NEW, payload);
  }

  // ─── Turf Updates ───
  private emitTurfUpdate(): void {
    const onlineMachines = machines.filter(m => m.status === 'ONLINE');
    if (onlineMachines.length === 0) return;

    const machine = onlineMachines[Math.floor(Math.random() * onlineMachines.length)];
    const occ = machine.turfOccupancy;

    // Increment timer if occupied
    if (occ.isOccupied) {
      const parts = occ.sessionTimer.split(':').map(Number);
      parts[2]++;
      if (parts[2] >= 60) { parts[2] = 0; parts[1]++; }
      if (parts[1] >= 60) { parts[1] = 0; parts[0]++; }
      occ.sessionTimer = parts.map(p => String(p).padStart(2, '0')).join(':');
      occ.activePlayers = Math.max(2, Math.min(22, occ.activePlayers + (Math.random() > 0.7 ? 1 : 0)));
    }

    const payload: TurfUpdatePayload = {
      machineId: machine.machineId,
      isOccupied: occ.isOccupied,
      activePlayers: occ.activePlayers,
      sessionTimer: occ.sessionTimer,
    };

    this.io.to(`machine:${machine.machineId}`).emit(SOCKET_EVENTS.TURF_UPDATE, payload);
  }

  // ─── Alerts (random interval) ───
  private scheduleNextAlert(): void {
    const delay = 15000 + Math.random() * 15000; // 15-30 seconds
    const timeout = setTimeout(() => {
      this.emitAlert();
      this.scheduleNextAlert();
    }, delay);
    this.intervals.push(timeout as any);
  }

  private emitAlert(): void {
    this.alertCounter++;
    const alerts = [
      { type: 'warning', title: 'Low Stock Detected', gen: (m: string) => `Badminton rackets running low at ${m}` },
      { type: 'error', title: 'Sensor Failure', gen: (m: string) => `Temperature sensor offline at ${m}` },
      { type: 'info', title: 'Revenue Milestone', gen: (_m: string) => `Daily revenue crossed ₹10,000` },
      { type: 'warning', title: 'Locker Jam', gen: (m: string) => `Locker L-07 mechanism stuck at ${m}` },
      { type: 'error', title: 'Network Issue', gen: (m: string) => `Connection degraded at ${m}` },
      { type: 'success', title: 'Machine Restored', gen: (m: string) => `${m} back online after maintenance` },
    ];

    const template = alerts[Math.floor(Math.random() * alerts.length)];
    const machine = machines[Math.floor(Math.random() * machines.length)];

    const payload: AlertPayload = {
      id: `alert-${this.alertCounter}`,
      type: template.type,
      title: template.title,
      message: template.gen(machine.turfName),
      machineId: machine.machineId,
      city: machine.city,
      severity: template.type,
      timestamp: new Date().toISOString(),
    };

    this.io.emit(SOCKET_EVENTS.ALERT_NEW, payload);
  }
}
