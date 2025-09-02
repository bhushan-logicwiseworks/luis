export interface VendorRecord {
    vendorPartNo: string;
    dateLastOrdered: string;
    dateLastReceived: string;
    lastCost: number;
    id: number;
    unitOfMeasure: string;
    contractPrice: number;
    vendorCode: number;
}
export type GetVendorsResponse = VendorRecord[];
