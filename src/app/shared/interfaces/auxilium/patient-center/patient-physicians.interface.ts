export class PatientPhysicians {
    id: number;
    doctorId: number;
    order: number;
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    fax: string;
}
export type GetPhysiciansResponse = PatientPhysicians[];
