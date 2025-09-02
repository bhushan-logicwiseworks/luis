export interface AccessDisplay {
    id: number;
    email: string;
    appName: string;
    key: string;
    value: string;
    isActive: boolean;
    accessLevel: number;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
}

export type GetAccessResponse = AccessDisplay[];
