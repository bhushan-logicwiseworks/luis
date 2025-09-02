export interface HotKeysDisplay {
    id?: number;
    keylabel: string;
    command: string;
    itemid1: number;
    itemid2: number;
    itemid3: number;
    itemid4: number;
    itemid5: number;
    itemid6: number;
    itemid7: number;
    adduserid: number;
    adddate: Date;
    billtype1: string;
    billtype2: string;
    billtype3: string;
    billtype4: string;
    billtype5: string;
    billtype6: string;
    billtype7: string;
    branchid: number;
}

export type GetHotKeysResponse = HotKeysDisplay[];
