export interface IntakeDisplay {
    patientId: number;
    language: string;
    firstName: string;
    lastName: string;
    dob: string;
    entryDate: string;
    referId: number;
    refFirstName: string;
    refLastName: string;
    refCity: string;
    refState: string;
    salesId: number;
    salesRepName: string;
    patientCategory: string;
    patientStatus: string;
    payorId: number;
    billTo: string;
    medicarePatient: string;
    completedPwoReceived: string;
    insuranceVerified: string;
    contactAttempt1: string;
    contactAttempt2: string;
}

export type GetIntakesResponse = IntakeDisplay[];
