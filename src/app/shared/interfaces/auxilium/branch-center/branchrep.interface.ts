export interface BranchRepDisplay {
    id: number;
    branchcode: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    pin: string;
    medicaid: string;
    otherpin: string;
    phone: string;
    tax: number;
    taxcounty: number;
    taxlocal: number;
    fedid: string;
    email: string;
    npi: string;
    adduserid: string;
    adddate: string;
    fax: string;
    notes: string;
    contact1: string;
    title1: string;
    contact2: string;
    title2: string;
    taxonomy: string;
}

export type GetBranchRepsResponse = BranchRepDisplay[];
