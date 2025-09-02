export interface SalesRepDisplay {
    id?: number;
    salesCode: string;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    city: string;
    state: any;
    zip: string;
    phone: string;
    fax: string;
    cell: string;
    email: string;
    branchId: number;
    territory: string;
    authrep: string;
    isActive: boolean;
    addUserId: string;
    addDate: Date;
}

export type GetSalesRepsResponse = SalesRepDisplay[];
