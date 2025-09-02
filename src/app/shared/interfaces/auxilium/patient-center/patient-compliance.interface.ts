export interface Compliance {
    id: number;
    patientId: number;
    dateOfOccurrence: string | Date;
    issueType: string;
    subType: string;
    subTypeDescription: string;
    createdBy: string;
    resolution: string;
    resolutionDate?: string | Date;
}
