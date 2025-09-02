export interface CreateSaleDto {
    id: number;
    salesCode: string;
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
    isActive: boolean;
    addUserId: string;
    addDate: Date;
}
