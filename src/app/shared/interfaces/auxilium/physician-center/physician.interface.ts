export interface PhysicianDisplay {
    id?: number;
    phykey: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    fax: string;
    upin: string;
    medicaid: string;
    assignment: string;
    medicare: string;
    groupid: string;
    taxonomy: string;
    addUserId: string;
    addDate: Date;
    stateid: string;
    emplid: string;
    otherid: string;
    npi: string;
    supervisor: string;
    email: string;
    facility: string;
    phoneextension: string;
    credentials: string;
    suffix: string;
    branchid: number;
    isActive: boolean;
    memo: string;
}

export type GetPhysicianResponse = PhysicianDisplay[];
