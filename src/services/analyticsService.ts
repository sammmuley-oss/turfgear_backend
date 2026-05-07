import api from './api';
import type { DashboardMetric, CityOverview, ActivityEvent, SystemHealthItem, RevenueSummary, RevenueData } from '../types';
import { mockRevenueSummary, mockRevenueData } from '../mock';

/**
 * Analytics service — calls real backend API for dashboard data.
 * Revenue endpoints still use mock data until backend supports them.
 */
export const analyticsService = {
  async getDashboardMetrics(): Promise<DashboardMetric[]> {
    const res = await api.get('/dashboard/metrics');
    return res.data.data;
  },

  async getCityOverview(): Promise<CityOverview[]> {
    const res = await api.get('/dashboard/cities');
    return res.data.data;
  },

  async getActivityFeed(): Promise<ActivityEvent[]> {
    const res = await api.get('/dashboard/activities');
    return res.data.data;
  },

  async getSystemHealth(): Promise<SystemHealthItem[]> {
    const res = await api.get('/dashboard/health');
    return res.data.data;
  },

  async getRevenueSummary(): Promise<RevenueSummary> {
    // TODO: GET /dashboard/revenue when backend supports it
    return mockRevenueSummary;
  },

  async getRevenueData(): Promise<RevenueData[]> {
    return mockRevenueData;
  },
};
