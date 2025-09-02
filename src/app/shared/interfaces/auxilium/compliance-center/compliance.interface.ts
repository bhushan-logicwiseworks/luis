export interface ComplianceDisplay {
    id: number;
    dateOfOccurrence: string;
    issueType: string;
    subType: string;
    subTypeDescription: string;
    resolution: string;
    resolutionDate: string;
    createdBy: string;
    createdDate: string;
    modifiedDate: string | null;
    modifiedBy: string | null;
    patientId: number;
}

export type GetCompliancesResponse = ComplianceDisplay[];
