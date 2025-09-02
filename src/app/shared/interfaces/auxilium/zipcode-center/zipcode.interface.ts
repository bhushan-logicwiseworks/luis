export interface ZipCodeDisplay {
    id?: number;
    zipcode: string;
    state: string;
    city: string;
    flag: number;
    branchid: number;
    county: string;
    msa: string;
    cba: string;
    areacodes: number;
    primary: string;
    cityalias: string;
    region: number;
    division: string;
    adduserid: string;
    adddate: string;
}

export type GetZipCodesResponse = ZipCodeDisplay[];
