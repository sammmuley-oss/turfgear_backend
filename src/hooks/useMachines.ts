import { useState, useEffect, useCallback } from 'react';
import type { Machine } from '../types';
import { machineService } from '../services';

export function useMachines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMachines = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [data, cityList] = await Promise.all([
        machineService.getAllMachines(),
        machineService.getUniqueCities(),
      ]);
      setMachines(data);
      setCities(cityList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load machines');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  return { machines, cities, isLoading, error, refetch: fetchMachines };
}
