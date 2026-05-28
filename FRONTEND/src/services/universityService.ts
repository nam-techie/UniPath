import { apiRequest } from './apiClient';
import { University } from '../types/university';

export const universityService = {
  getAllUniversities: async () => {
    return apiRequest<University[]>('/universities', {
      method: 'GET',
    });
  },
};
