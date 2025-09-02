export interface PayorOverride {
    id: number;
    payorId: number;
    billto: string;
    itemId: number;
    itemCode: string;
    description: string;
    billType: string;
    confirm: string;
    quantity: number;
    hcpc: string;
    submitted: number;
    allowed: number;
    duePrimary: number;
    createdBy: string;
    createdDate: string;
    modifiedDate: string;
    modifiedBy: string;
}

export type GetPayorOverrideResponse = PayorOverride[];
