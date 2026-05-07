import { machines } from '../mock/machines.js';
import type { Machine, MachineAnalytics, DiagnosticItem, MachineEvent } from '../models/index.js';

/**
 * Machine service — business logic layer.
 * Currently reads from mock data. Replace with MongoDB queries when ready.
 */
export const machineService = {
  getAll(): Machine[] {
    return machines;
  },

  getById(machineId: string): Machine | undefined {
    return machines.find(m => m.machineId === machineId);
  },

  getAnalytics(machineId: string): MachineAnalytics | undefined {
    return machines.find(m => m.machineId === machineId)?.analytics;
  },

  getDiagnostics(machineId: string): DiagnosticItem[] {
    return machines.find(m => m.machineId === machineId)?.diagnostics ?? [];
  },

  getEvents(machineId: string): MachineEvent[] {
    return machines.find(m => m.machineId === machineId)?.events ?? [];
  },

  getUniqueCities(): string[] {
    return [...new Set(machines.map(m => m.city))];
  },
};
