export interface ReferralDisplay {
    id?: number;
    referCode: string;
    salesId: number;
    company: string;
    title: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    fax: string;
    cell: string;
    email: string;
    notes: string;
    territory: string;
    status: string;
    taxId: string;
    doesOptIn: boolean;
    addUserid: string;
    addDate: Date;
}

export type GetReferralResponse = ReferralDisplay[];

export interface ReferralDetails {
    adddate: string;
    address: string;
    adduserid: string;
    assignment: string;
    branchid: number;
    city: string;
    company: string;
    contact1: string;
    contact2: string;
    contact3: string;
    contact4: string;
    contact5: string;
    doesoptin: boolean;
    email: string;
    fax: string;
    firstname: string;
    id: number;
    lastname: string;
    level: number;
    notes: string;
    npi: string;
    parentreferralid: number;
    patientid: number;
    phone: string;
    phoneextension: string;
    provider: string;
    refercode: string;
    salesid: number;
    state: string;
    status: string;
    taxid: string;
    taxonomy: string;
    territory: string;
    title: string;
    upin: string;
    zip: string;
}

export type GetReferralDetailsResponse = ReferralDetails[];

export interface ReferralQuickSave {
    id: number;
    firstname: string;
    lastname: string;
    salesId: number;
}
