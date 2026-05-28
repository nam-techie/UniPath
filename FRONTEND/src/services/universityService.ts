import { apiRequest } from './apiClient';
import { University } from '../types/university';
import { PageResponse } from '../types/common';

export const universityService = {
  getAllUniversities: async (page: number = 0, size: number = 10) => {
    return apiRequest<PageResponse<University>>(`/universities?page=${page}&size=${size}`, {
      method: 'GET',
    });
  },
};
