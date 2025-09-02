export interface ValidationsInformationDisplay {
    id: number;
    billform: string;
    invoiceno: string;
    patientid: number;
    accessionno: string;
    trantype: string;
    balance: number;
    patalpha: string;
    patname: string;
    itemcode: string;
    billto: string;
    policy: string;
    othercode: string;
}

export type GetValidationsInformationResponse = ValidationsInformationDisplay[];
