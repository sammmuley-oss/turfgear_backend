import { useState, useEffect, useCallback } from 'react';
import type { DashboardMetric, CityOverview, ActivityEvent, SystemHealthItem } from '../types';
import { analyticsService } from '../services';

export function useAnalytics() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [cities, setCities] = useState<CityOverview[]>([]);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealthItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [m, c, a, h] = await Promise.all([
        analyticsService.getDashboardMetrics(),
        analyticsService.getCityOverview(),
        analyticsService.getActivityFeed(),
        analyticsService.getSystemHealth(),
      ]);
      setMetrics(m);
      setCities(c);
      setActivities(a);
      setSystemHealth(h);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { metrics, cities, activities, systemHealth, isLoading, error, refetch: fetchAll };
}
