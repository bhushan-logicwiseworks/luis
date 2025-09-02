export interface LicenseInfo {
    id: number;
    state: string;
    category: string;
    isLicenseRequired: boolean;
    branchId: number;
    licenseNumber: string;
    startDate: string; // ISO 8601 date string
    expirationDate: string; // ISO 8601 date string
    note: string;
    addedBy: string;
    addedDate: string; // ISO 8601 date string
    modifiedBy: string;
    modifiedDate: string; // ISO 8601 date string
}

export type GetLicenseInfoResponse = LicenseInfo[];
