interface BatchEligibilityResponse {
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    patientId: number;
    payorId: number | null;
    billTo: string | null;
    policy: string | null;
}

export type GetBatchEligibility = BatchEligibilityResponse[];
