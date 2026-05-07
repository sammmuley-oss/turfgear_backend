import { useState, useEffect, useCallback } from 'react';
import type { Machine } from '../types';
import { machineService } from '../services';

export function useMachineDetails(machineId: string | undefined) {
  const [machine, setMachine] = useState<Machine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMachine = useCallback(async () => {
    if (!machineId) {
      setError('No machine ID provided');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await machineService.getMachineById(machineId);
      if (!data) {
        setError(`Machine ${machineId} not found`);
      } else {
        setMachine(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load machine');
    } finally {
      setIsLoading(false);
    }
  }, [machineId]);

  useEffect(() => {
    fetchMachine();
  }, [fetchMachine]);

  return { machine, isLoading, error, refetch: fetchMachine };
}
