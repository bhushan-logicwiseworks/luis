export interface SaveProofOfDelivery {
    id: number;
    vendor: string;
    patientid: number;
    ponumber: string;
    shipdate: string; // Use Date instead if preferred
    trackingnumber: string;
    shippingcarrier: string;
    shipstatus: string;
    emailstatus: string;
    results: string;
    iscomplete: boolean;
    fileattached: boolean;
}
