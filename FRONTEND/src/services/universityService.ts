import { apiRequest } from './apiClient';
import { University } from '../types/university';
import { PageResponse } from '../types/common';

export const universityService = {
  getAllUniversities: async (page: number = 0, size: number = 10, regionId?: string, provinceId?: string) => {
    let query = `?page=${page}&size=${size}`;
    if (regionId) query += `&regionId=${regionId}`;
    if (provinceId) query += `&provinceId=${provinceId}`;
    
    return apiRequest<PageResponse<University>>(`/universities${query}`, {
      method: 'GET',
    });
  },
};
