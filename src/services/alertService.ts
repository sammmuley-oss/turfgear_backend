import type { NotificationAlert } from '../types';
import { mockNotifications } from '../mock';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const alertService = {
  async getAlerts(): Promise<NotificationAlert[]> {
    await delay();
    return mockNotifications;
  },

  async markAsRead(id: string): Promise<{ success: boolean }> {
    await delay(150);
    console.log(`[AlertService] Marked ${id} as read`);
    return { success: true };
  },

  async dismissAlert(id: string): Promise<{ success: boolean }> {
    await delay(150);
    console.log(`[AlertService] Dismissed ${id}`);
    return { success: true };
  },
};
