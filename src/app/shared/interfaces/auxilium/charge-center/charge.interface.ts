export interface ChargeDisplay {
    id?: number;
    billtype: string;
    description: string;
    dueprimary: number;
    duesecondary: number;
    itemid: number;
    prepaid: number;
    submitted: number;
    stopdate: Date;
    lastdatebilled: Date;
    svcdate: Date;
    todate: Date;
    notesexpiredate: Date;
    cmnexpire: Date;
    authdate: Date;
    hcpcscode: string;
    narrative: string;
    notes: string;
    accessionno: string;
    assetNo: string;
    branchcode: string;
    itemcode: string;
    cmnform: number;
}

export type GetChargeResponse = ChargeDisplay[];
