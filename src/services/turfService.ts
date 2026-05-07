import type { CityOverview } from '../types';
import { mockCities } from '../mock';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const turfService = {
  async getAllTurfs(): Promise<CityOverview[]> {
    await delay();
    return mockCities;
  },

  async getTurfByCity(city: string): Promise<CityOverview | null> {
    await delay(200);
    return mockCities.find(c => c.name === city) ?? null;
  },
};
