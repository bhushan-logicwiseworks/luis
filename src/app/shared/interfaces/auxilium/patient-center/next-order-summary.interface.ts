export interface NextOrderSummary {
    PatientId: string;
    OrderConfDate: string;
    OrderShipDate: string;
    ExpDelivery: string;
    SuppliesExhaustDate: string;
    Signature: string;
    AuthorizedBy: string;
    InsuranceEligibility: string;
}

export interface ContactResult {
    patientId: string;
    type: string;
    note: string;
}
