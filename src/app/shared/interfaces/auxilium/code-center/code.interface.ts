export interface CodeDisplay {
    id?: number;
    code: string;
    codetype: string;
    description: string;
    adduserid: string;
    adddate: string;
    syslock: boolean;
    effectivedate: Date;
    expiredate: Date;
    path: string;
    action: string;
    notes: string;
    miscflag1: boolean;
}

export type GetCodesResponse = CodeDisplay[];
