export interface EmployeeSecurityDisplay {
    appName: string;
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    role: string;
}

export type GetEmployeeSecurityResponse = EmployeeSecurityDisplay[];
