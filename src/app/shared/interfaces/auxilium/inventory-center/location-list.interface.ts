export interface LocationList {
    id: number;
    locationId: number;
    onHand: number;
    allocated: number;
    onOrder: number;
    available?: number;
    locationCode?: string;
    locationName?: string;
    binCode?: string;
}
export type GetLocationListResponse = LocationList[];
