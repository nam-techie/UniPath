import { apiRequest } from './apiClient';
import { ProgramResponse } from '../types/program';
import { PageResponse } from '../types/common';

export const programService = {
  getAllPrograms: async (page: number = 0, size: number = 10) => {
    return apiRequest<PageResponse<ProgramResponse>>(`/programs?page=${page}&size=${size}`, {
      method: 'GET',
    });
  },
};
