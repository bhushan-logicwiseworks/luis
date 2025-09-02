export interface InsuranceInfo {
    id: number;
    payorId: number;
    rank: number;
    billTo: string;
    name: string;
    policy: string;
    deductibleAmount: number;
    copayAmount: number;
    phone: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    primaryBillForm: string;
}

export type InsuranceInfoList = InsuranceInfo[];
