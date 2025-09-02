export interface PayorEntity {
    id: number;
    billto: string;
    branchid: number;
    name: string;
    phone: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    pricecode: string;
    ar: string;
    percentpaid: number;
    primarybillform: string;
    account: string;
    payortype: string;
    pin: string;
    adddate: string;
    adduserid: string;
    patAlpha?: string;
    firstName?: string;
    lastName?: string;
    county?: string;
    email?: string;
    cell?: string;
    referId?: number;
    salesId?: number;
    dob?: string;
    patientStatus?: string;
    patientCategory?: string;
    entryDate?: string;
}

export type GetPayorResponse = PayorEntity[];
