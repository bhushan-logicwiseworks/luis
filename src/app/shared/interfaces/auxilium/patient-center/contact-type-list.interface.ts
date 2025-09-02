export interface ContactTypeList {
    id: number;
    code: string;
    description: string;
}

export type GetContactTypeListResponse = ContactTypeList[];
