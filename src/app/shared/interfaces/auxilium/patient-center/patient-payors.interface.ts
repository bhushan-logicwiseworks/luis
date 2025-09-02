export class PatientPayors {
    id: number;
    rank: string;
    billTo: string;
    name: string;
    policy: string;
    deductibleAmount: number;
    phone: string;
    address: string;
    city: string;
    state: string;
}
export type GetPatientResponse = PatientPayors[];
