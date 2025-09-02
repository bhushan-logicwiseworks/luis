export interface Audit {
    id: number;
    patientId: number;
    dateOfAudit: string | Date;
    auditType: string;
    subType: string;
    subTypeDescription: string;
    assignedTo: string;
    auditor: string;
    createdBy: string;
    resolution: string;
    resolutionDate?: string | Date;
}
