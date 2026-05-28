export interface AdmissionRequirement {
  method: string;
  blocks: string[];
  minScore?: number;
  year?: number;
  minIelts?: number;
}

export interface TuitionFee {
  amount: number;
  period: string;
  year?: number;
}

export interface ProgramResponse {
  id: string;
  universityId: string;
  universityName: string;
  universityLogo?: string;
  universityCode?: string;
  fieldOfStudyId?: string;
  name: string;
  programType?: string;
  teachingLanguage?: string;
  admissionRequirements: AdmissionRequirement[];
  tuitionFees: TuitionFee[];
}
