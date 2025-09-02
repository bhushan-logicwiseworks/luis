export interface PriceListItem {
    id: number;
    effectivedate: string;
    expiredate: string;
    pricecode: string;
    description: string;
    hcpcscode: string;
    itemcode: string;
    descriptioN2: string;
}
export type GetPriceListResponse = PriceListItem[];
