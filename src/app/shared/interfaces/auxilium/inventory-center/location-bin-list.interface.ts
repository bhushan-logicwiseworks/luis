export interface LocationBinDisplay {
    id: number;
    inventorylocationid: number;
    bincode: string;
    onhand: number;
    allocated: number;
    onorder: number;
}

export type GetLocationBinListResponse = LocationBinDisplay[];
