export interface PatientCategory {
    id: number;
    code: string;
    description: string;
}

export type GetPatientCategoryResponse = PatientCategory[];
