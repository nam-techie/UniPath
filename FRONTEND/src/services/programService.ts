import { apiRequest } from './apiClient';
import { ProgramResponse } from '../types/program';

export const programService = {
  getAllPrograms: async () => {
    return apiRequest<ProgramResponse[]>('/programs', {
      method: 'GET',
    });
  },
};
