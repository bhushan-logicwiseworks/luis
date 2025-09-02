export interface GetAccessList {
    id: number;
    email: string;
    appName: string;
    key: string;
    value: string;
    isActive: boolean;
    isDeleted: boolean;
    accessLevel: number;
}

export type GetAccessListResponse = GetAccessList[];

export type Access = GetAccessList;
