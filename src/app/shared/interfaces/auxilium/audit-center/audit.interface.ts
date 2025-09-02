export interface AuditDisplay {
    id: number;
    patientId: number;
    dateOfAudit: string; // ISO date string
    auditType: string;
    subType: string;
    subTypeDescription: string;
    assignedTo: string;
    auditor: string;
    resolution: string;
    resolutionDate: string; // ISO date string
    createdBy: string;
    createdDate: string; // ISO date string with time
    modifiedDate: string | null;
    modifiedBy: string | null;
}

export type GetAuditsResponse = AuditDisplay[];
