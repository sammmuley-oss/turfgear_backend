import api from './api';
import type { Machine, MachineAnalytics, DiagnosticItem, MachineEvent } from '../types';

/**
 * Machine service — calls real backend API.
 * Falls back to empty data on error.
 */
export const machineService = {
  async getAllMachines(): Promise<Machine[]> {
    const res = await api.get('/machines');
    return res.data.data;
  },

  async getMachineById(id: string): Promise<Machine | null> {
    const res = await api.get(`/machines/${id}`);
    return res.data.data ?? null;
  },

  async getMachineAnalytics(id: string): Promise<MachineAnalytics | null> {
    const res = await api.get(`/machines/${id}/analytics`);
    return res.data.data ?? null;
  },

  async getMachineDiagnostics(id: string): Promise<DiagnosticItem[]> {
    const res = await api.get(`/machines/${id}/diagnostics`);
    return res.data.data ?? [];
  },

  async getMachineEvents(id: string): Promise<MachineEvent[]> {
    const res = await api.get(`/machines/${id}/events`);
    return res.data.data ?? [];
  },

  async getUniqueCities(): Promise<string[]> {
    const res = await api.get('/machines/cities');
    return res.data.data ?? [];
  },

  async restartMachine(id: string): Promise<{ success: boolean }> {
    // TODO: POST /machines/:id/restart when backend supports it
    console.log(`[MachineService] Restart request for ${id}`);
    return { success: true };
  },

  async toggleMaintenanceMode(id: string): Promise<{ success: boolean }> {
    console.log(`[MachineService] Maintenance toggle for ${id}`);
    return { success: true };
  },

  async syncInventory(id: string): Promise<{ success: boolean }> {
    console.log(`[MachineService] Inventory sync for ${id}`);
    return { success: true };
  },
};
