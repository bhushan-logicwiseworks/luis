export interface CareManagementDisplay {
    id: number;
    patientId: number;
    dateAssigned: string; // ISO date string
    assignedTo: string;
    servicedBy: string;
    insuranceId: string;
    insuranceUpdated: boolean;
    billingCode: string;
    billingDetails: string;
}

export type GetCareManagementsResponse = CareManagementDisplay[];
