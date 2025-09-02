export interface ItemPriceById {
    id: number;
    itemid: number;
    pricecode: string;
    branchid: number;
    hcpcscode: string;
    rxflag: string;
    cmnformid: number;
    billtype: string;
    rentmod: string;
    rentmod2: string;
    rentmod3: string;
    rentmod4: string;
    rentsubmitted: number;
    rentallowed: number;
    rentday: number;
    rentweek: number;
    lonrent: number;
    salemod: string;
    salemod2: string;
    salemod3: string;
    salemod4: string;
    salesubmitted: number;
    saleallowed: number;
    lonsale: number;
    pos: string;
    tos: string;
    authreq: string;
    drordergroup: string;
    dispensingfee: string;
    capexempt: boolean;
    spanhold: boolean;
    revenuecode: string;
    expiredate: string; // or Date if you're using Date objects
    effectivedate: string; // or Date if you're using Date objects
    adduserid: string;
    adddate: string; // or Date if you're using Date objects
    markuppercent: number;
    markupamount: number;
    lot: boolean;
    quantityallowed: number;
    qtyorderedbyphy: number;
    norollup: boolean;
    quantitydivider: number;
    cappedrentalmonths: number;
    roundtonearestdollar: boolean;
}
