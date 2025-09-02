export interface PatientCareManagement {
    id: number;
    patientId: number;
    dateAssigned: string | Date;
    assignedTo: string;
    servicedBy: string;
    label: string;
    insuranceId: string;
    insuranceUpdated: string;
    billingCode: string;
    billingDetails: string;
    shipmentDate: string | Date;
    dueDate: string | Date;
    contactNote: string;
    createdBy?: string;
    sentForShipment: string;
}
