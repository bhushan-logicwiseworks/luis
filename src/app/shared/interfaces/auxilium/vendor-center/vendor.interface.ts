export interface VendorDisplay {
    id?: number;
    adddate: string;
    address1: string;
    address2: string;
    adduserid: string;
    city: string;
    company: string;
    contact: string;
    creditlimit: number;
    email: string;
    fax: string;
    notes: string;
    phone: string;
    salesid: number;
    state: string;
    taxrate: number;
    terms: string;
    vendorcode: string;
    zip: string;
}

export type GetVendorsResponse = VendorDisplay[];
