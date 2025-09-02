export interface ClaimsFor837Display {
    branchCode: string;
    billTo: string;
    tranType: string;
    mspcob: boolean;
    payorCategory: string;
    payTo: string;
    claimFile: string;
    name: string;
    claimCount: number;
    charges: number;
}

export type GetClaimsFor837Response = ClaimsFor837Display[];
