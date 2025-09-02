interface PatientEFirst {
    id: number;
    entityType: string;
    entityID: number;
    contactType: string;
    note: string;
    addUserId: string;
    addDate: string;
    message: string;
    priority: string;
}

export type GetPatientEFirst = PatientEFirst[];
