export interface BillTypeDisplay {
    id?: number;
    billtype: string;
    title: string;
    shipcount: number;
    skipcount: number;
    description: string;
    period: string;
    adduserid: number;
    adddate: Date;
}

export type GetBillTypeResponse = BillTypeDisplay[];
