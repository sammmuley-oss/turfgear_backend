import type { InventoryItem } from '../types';
import { mockInventory } from '../mock';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const inventoryService = {
  async getInventory(): Promise<InventoryItem[]> {
    await delay();
    return mockInventory;
  },

  async getInventoryByMachine(machineId: string): Promise<InventoryItem[]> {
    await delay(200);
    return mockInventory.filter(i => i.machineId === machineId);
  },

  async syncInventory(machineId: string): Promise<{ success: boolean }> {
    await delay(1200);
    console.log(`[InventoryService] Syncing inventory for ${machineId}`);
    return { success: true };
  },
};
