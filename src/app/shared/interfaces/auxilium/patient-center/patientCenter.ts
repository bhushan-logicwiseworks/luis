import { Moment } from 'moment';

export interface Patient {
    id: number;
    patAlpha: string;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    cell: string;
    sex: string;
    referId: number;
    salesId: number;
    dob: string | Date | Moment;
    patientStatus: string;
    patientCategory: string;
    entryDate: string | Date | Moment;
    addUserId: string;
}

export type GetPatientResponse = Patient[];
