import { Moment } from 'moment';

type BooleanType = 'Y' | 'N';
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
    inactiveDate: string | Date | Moment;
    patientStatus: string;
    patientCategory: string;
    entryDate: string | Date;
    addUserId: string;
    salesid?: number;
    cellphone?: string;
    contactNote?: string;
    sendtext?: BooleanType;
    call: BooleanType;
    sendemail: BooleanType;
    sendmail: BooleanType;
    fieldservicerepid: number;
    inventorylocation: string;
    patientcategory: string;
    branchId: number;
    delete: BooleanType;
    phykey2: string;
    recalldate: string | Date | Moment;
}

export type GetPatientResponse = Patient[];
