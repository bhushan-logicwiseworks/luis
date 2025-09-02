export interface EmployeeDisplay {
    id?: number;
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    fax: string;
    cell: string;
    email: string;
    isactive: boolean;
    addedBy: string;
    addeddate: Date;
}

export type GetEmployeeResponse = EmployeeDisplay[];
