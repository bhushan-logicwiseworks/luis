export interface LocationCodeDisplay {
    id: number;
    locationcode: string;
    itemid: number;
    locationid: number;
    onhand: number;
    allocated: number;
    onorder: number;
    notes: string;
    lastcost: number;
    averagecost: number;
    minimumorder: number;
    activation: string;
    locationtype: string;
}

export type GetLocationCodeListResponse = LocationCodeDisplay[];
