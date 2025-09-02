export interface DropdownDisplay {
    id: number;
    code: string;
    description: string;
}
export interface BillingEntity {
    id: number;
    rank: number;
    billTo: string;
    name: string;
    policy: string;
    deductibleAmount: number;
    copayAmount: number;
    phone: string;
    address: string;
    address2: string | null;
    city: string;
    state: string;
    zip: string | null;
}
export interface DoctorInfo {
    id: number;
    phykey: string;
    doctorId: number;
    order: number;
    firstName: string;
    lastName: string;
    address1: string | null;
    address2: string | null;
    city: string;
    state: string;
    zip: string;
    phone: string;
    fax: string;
    isActive: boolean;
    npi: string;
    pecos: string;
}
export interface ICDCode {
    id: number;
    icdcodeId: number;
    order: number;
    icd10code: string;
    description: string;
}
export type GetDropdownDisplay = DropdownDisplay[];
