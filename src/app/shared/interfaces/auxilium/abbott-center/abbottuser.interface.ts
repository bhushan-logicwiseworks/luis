export interface AbbottUserDisplay {
    id: number;
    email: string;
    zipcodes: string;
    addedby: string;
    addeddate: string;
    modifiedby: string;
    modifieddate: string;
}

export type GetAbbottUserResponse = AbbottUserDisplay[];
