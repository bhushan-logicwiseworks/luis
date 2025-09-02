export interface PatientReferral {
    id: number;
    code: string;
    description: string;
}

export type GetPatientReferralResponse = PatientReferral[];
