import { apiRequest } from './apiClient';
import { ProgramResponse } from '../types/program';
import { PageResponse } from '../types/common';

export const programService = {
  getAllPrograms: async (page: number = 0, size: number = 10, regionId?: string, provinceId?: string, fieldOfStudy?: string, minTuition?: number, maxTuition?: number) => {
    let query = `?page=${page}&size=${size}`;
    if (regionId) query += `&regionId=${regionId}`;
    if (provinceId) query += `&provinceId=${provinceId}`;
    if (fieldOfStudy) query += `&fieldOfStudy=${fieldOfStudy}`;
    if (minTuition !== undefined) query += `&minTuition=${minTuition}`;
    if (maxTuition !== undefined) query += `&maxTuition=${maxTuition}`;

    return apiRequest<PageResponse<ProgramResponse>>(`/programs${query}`, {
      method: 'GET',
    });
  },
  getRecommendedPrograms: async (block: string, score: number, page: number = 0, size: number = 10) => {
    return apiRequest<PageResponse<ProgramResponse>>(`/programs/recommend?block=${block}&score=${score}&page=${page}&size=${size}`, {
      method: 'GET',
    });
  },
};
