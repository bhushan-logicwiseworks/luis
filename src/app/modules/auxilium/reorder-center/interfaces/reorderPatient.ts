import { Moment } from 'moment';

export interface ReorderPatient {
    address?: string;
    address2?: string;
    call?: boolean;
    cellPhone?: string;
    city?: string;
    email?: string;
    id: number;
    firstName?: string;
    lastName?: string;
    sex?: string;
    phone?: string;
    sendEmail?: boolean;
    sendMail?: boolean;
    sendText?: boolean;
    state?: string;
    workPhone?: string;
    zip?: string;
    emergencyName?: string;
    emergencyPhone?: string;
}

export interface ReorderPatientDoctor {
    address?: string;
    address2?: string;
    city?: string;
    fax?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    state?: string;
    zip?: string;
}

export interface ReorderPatientInsurance {
    address?: string;
    address2?: string;
    city?: string;
    name?: string;
    phone?: string;
    policy?: string;
    state?: string;
    zip?: string;
}

export interface ReorderPatientAlternateShipping {
    address: string;
    address2: string;
    city: string;
    effectiveDate: string | Date | Moment;
    expireDate: string | Date | Moment;
    id: string;
    state: string;
    zip: string;
}

export interface MixedDatesForMultipleReturnedObjects {
    authDate?: string;
    cmn?: string;
    dos?: string;
    message?: string;
    shipDate?: string;
    shipDate5?: string;
    state?: string;
}

export interface ReorderPatientNotes {
    addDate?: string | Date | Moment;
    addedBy?: string;
    contactType?: string;
    description?: string;
    entityID?: number;
    entityType?: string;
    note?: string;
    patientID: number;
}

export interface ReorderProducts {
    description: string;
    itemId: string | number;
    quantity: string | number;
    shippingQuantity: string | number;
}

export interface PrismAuthorize {
    patientId: string;
    response: string;
    flag: string;
    error: string;
    loading: boolean;
}

export interface ReorderDisplay {
    type?: string;
    patientId?: number;
    lastDateBilled?: string;
    cmnExpire?: string;
    authDate?: string;
    branchCode?: string;
    firstName?: string;
    lastName?: string;
    state?: string;
    language?: string;
    patientCategory?: string;
    phone?: string;
    cellPhone?: string;
    email?: string;
}

export type GetReordersResponse = ReorderDisplay[];
