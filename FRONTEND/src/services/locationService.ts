import { apiRequest } from './apiClient';

export interface Region {
  id: string;
  code: string;
  name: string;
}

export interface Province {
  id: string;
  regionId: string;
  code: string;
  name: string;
}

export const locationService = {
  getRegions: async () => {
    return apiRequest<Region[]>('/locations/regions', {
      method: 'GET',
    });
  },
  getProvinces: async (regionId?: string) => {
    const query = regionId ? `?regionId=${regionId}` : '';
    return apiRequest<Province[]>(`/locations/provinces${query}`, {
      method: 'GET',
    });
  },
};
