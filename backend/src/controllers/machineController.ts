import type { Request, Response } from 'express';
import { machineService } from '../services/machineService.js';

function apiResponse<T>(data: T, message?: string) {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

function apiError(message: string, status: number = 404) {
  return { success: false, data: null, message, timestamp: new Date().toISOString() };
}

function getMachineId(req: Request): string {
  const id = req.params.machineId;
  return Array.isArray(id) ? id[0] : id;
}

export const machineController = {
  /** GET /api/machines */
  getAll(req: Request, res: Response): void {
    const machines = machineService.getAll();
    res.json(apiResponse(machines, `${machines.length} machines found`));
  },

  /** GET /api/machines/cities */
  getCities(req: Request, res: Response): void {
    const cities = machineService.getUniqueCities();
    res.json(apiResponse(cities));
  },

  /** GET /api/machines/:machineId */
  getById(req: Request, res: Response): void {
    const machineId = getMachineId(req);
    const machine = machineService.getById(machineId);
    if (!machine) {
      res.status(404).json(apiError(`Machine ${machineId} not found`));
      return;
    }
    res.json(apiResponse(machine));
  },

  /** GET /api/machines/:machineId/analytics */
  getAnalytics(req: Request, res: Response): void {
    const machineId = getMachineId(req);
    const analytics = machineService.getAnalytics(machineId);
    if (!analytics) {
      res.status(404).json(apiError(`Machine ${machineId} not found`));
      return;
    }
    res.json(apiResponse(analytics));
  },

  /** GET /api/machines/:machineId/diagnostics */
  getDiagnostics(req: Request, res: Response): void {
    const machineId = getMachineId(req);
    const machine = machineService.getById(machineId);
    if (!machine) {
      res.status(404).json(apiError(`Machine ${machineId} not found`));
      return;
    }
    res.json(apiResponse(machineService.getDiagnostics(machineId)));
  },

  /** GET /api/machines/:machineId/events */
  getEvents(req: Request, res: Response): void {
    const machineId = getMachineId(req);
    const machine = machineService.getById(machineId);
    if (!machine) {
      res.status(404).json(apiError(`Machine ${machineId} not found`));
      return;
    }
    res.json(apiResponse(machineService.getEvents(machineId)));
  },
};
