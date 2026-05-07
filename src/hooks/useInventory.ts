import { useState, useEffect, useCallback } from 'react';
import type { InventoryItem } from '../types';
import { inventoryService } from '../services';

export function useInventory(machineId?: string) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = machineId
        ? await inventoryService.getInventoryByMachine(machineId)
        : await inventoryService.getInventory();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inventory');
    } finally {
      setIsLoading(false);
    }
  }, [machineId]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return { items, isLoading, error, refetch: fetchInventory };
}
