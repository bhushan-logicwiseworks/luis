export interface GetMapList {
    Id: string;
    FirstName: string;
    LastName: string;
    City: string;
    State: string;
    Zip: string;
    name: string;
    latitude: number;
    longitude: number;
}

export type GetMapListResponse = GetMapList[];

export type Map = GetMapList;

export interface GetSalesReps {
    Id: string;
    Name: string;
}

export type GetMapSalesRepsResponse = GetSalesReps[];
