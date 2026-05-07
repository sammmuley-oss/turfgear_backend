import type { Request, Response } from 'express';
import { dashboardService } from '../services/dashboardService.js';

function apiResponse<T>(data: T) {
  return { success: true, data, timestamp: new Date().toISOString() };
}

export const dashboardController = {
  /** GET /api/dashboard/metrics */
  getMetrics(_req: Request, res: Response): void {
    res.json(apiResponse(dashboardService.getMetrics()));
  },

  /** GET /api/dashboard/cities */
  getCities(_req: Request, res: Response): void {
    res.json(apiResponse(dashboardService.getCities()));
  },

  /** GET /api/dashboard/activities */
  getActivities(_req: Request, res: Response): void {
    res.json(apiResponse(dashboardService.getActivities()));
  },

  /** GET /api/dashboard/health */
  getHealth(_req: Request, res: Response): void {
    res.json(apiResponse(dashboardService.getSystemHealth()));
  },
};
