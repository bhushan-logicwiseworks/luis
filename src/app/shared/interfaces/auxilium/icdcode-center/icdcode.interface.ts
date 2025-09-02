export interface ICDCodeDisplay {
    id?: number;
    icd9code: string;
    status: string;
    description: string;
    changeindicator: string;
    codestatus: string;
    shortdescription: string;
    mediumdescription: string;
    longdescription: string;
    icd10code: string;
    icd10description: string;
    flags: string;
    adduserid: number;
    inactivedate: Date;
    adddate: Date;
}

export type GetIcdCodeResponse = ICDCodeDisplay[];
