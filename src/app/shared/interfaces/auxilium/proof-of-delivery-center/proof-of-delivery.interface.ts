export interface ProofOfDeliveryDetail {
    id: number;
    vendor: string;
    patientid: number;
    ponumber: string;
    shipdate: string; // You can use Date instead of string if preferred
    trackingnumber: string;
    shippingcarrier: string;
    shipstatus: string;
    results: string;
    iscomplete: boolean;
    fileattached: boolean;
}

export type GetProofOfDeliveryResponse = ProofOfDeliveryDetail[];

export interface PODSearchDetail {
    patientId: number;
    invoiceNo: string;
    shipDate: string;
    shipdate: string;
    trackingNumber: string;
}
