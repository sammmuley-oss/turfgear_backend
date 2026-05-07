import { dashboardMetrics, cityOverview, activityFeed, systemHealth } from '../mock/machines.js';
import type { DashboardMetric, CityOverview, ActivityEvent, SystemHealthItem } from '../models/index.js';

export const dashboardService = {
  getMetrics(): DashboardMetric[] {
    return dashboardMetrics;
  },

  getCities(): CityOverview[] {
    return cityOverview;
  },

  getActivities(): ActivityEvent[] {
    return activityFeed;
  },

  getSystemHealth(): SystemHealthItem[] {
    return systemHealth;
  },
};
