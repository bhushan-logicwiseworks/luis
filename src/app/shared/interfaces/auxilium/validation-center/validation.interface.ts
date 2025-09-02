export interface Validation {
    id: number;
    entity: string;
    title: string;
    failcode: string;
    failmessage: string;
    isactive: boolean;
    bypassforpayors: string;
    executeforpayors: string;
    notes: string;
    adduserid: string;
    adddate: string;
    columns: string;
    severity: string;
    validateformode: string;
    billformstoskip: string;
}

export type GetValidationResponse = Validation[];
