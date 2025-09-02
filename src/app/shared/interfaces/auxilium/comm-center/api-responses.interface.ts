export interface GetEmailsByOwner {
    body: string;
    fileCount: number;
    from: string;
    hasAttachments: boolean;
    hasNotes: boolean;
    id: number;
    isActive: boolean;
    isCompleted: boolean;
    isDeleted: boolean;
    label: string;
    owner: string;
    receivedDate: string;
    subject: string;
    tag: string;
    to: string;
    emailSource: string;
}

export type GetEmailsByOwnerResponse = GetEmailsByOwner[];

export interface GetEmailsBySource {
    body: string;
    fileCount: number;
    from: string;
    hasAttachments: boolean;
    hasNotes: boolean;
    id: number;
    isActive: boolean;
    isCompleted: boolean;
    isDeleted: boolean;
    label: string;
    owner: string;
    receivedDate: string;
    subject: string;
    tag: string;
    to: string;
    emailSource: string;
}

export type GetEmailsBySourceResponse = GetEmailsBySource[];

export interface GetCompletedEmails {
    body: string;
    fileCount: number;
    from: string;
    hasAttachments: boolean;
    hasNotes: boolean;
    id: number;
    isActive: boolean;
    isCompleted: boolean;
    isDeleted: boolean;
    label: string;
    owner: string;
    receivedDate: string;
    subject: string;
    tag: string;
    to: string;
    emailSource: string;
}

export type GetCompletedEmailsResponse = GetCompletedEmails[];

export interface GetDeletedEmails {
    body: string;
    fileCount: number;
    from: string;
    hasAttachments: boolean;
    hasNotes: boolean;
    id: number;
    isActive: boolean;
    isCompleted: boolean;
    isDeleted: boolean;
    label: string;
    owner: string;
    receivedDate: string;
    subject: string;
    tag: string;
    to: string;
    emailSource: string;
}

export type GetDeletedEmailsResponse = GetDeletedEmails[];

export interface GetEmails {
    createdDate: string;
    body: string;
    fileCount: number;
    from: string;
    hasAttachments: boolean;
    hasNotes: boolean;
    id: number;
    label: string;
    owner: string;
    receivedDate: string;
    to: string;
    isCompleted: boolean;
    isDeleted: boolean;
    emailSource: string;
    modifiedDate: string;
}

export type GetEmailsResponse = GetEmails[];

export interface GetOwners {
    networkName: string;
}

export type GetOwnersResponse = GetOwners[];
export type Email = GetEmails | GetEmailsByOwner | GetCompletedEmails | GetDeletedEmails;
