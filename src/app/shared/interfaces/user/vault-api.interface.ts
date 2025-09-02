export type FileResponse = File[];

export interface File {
    contentSize?: number;
    contentType?: null | string;
    createdBy?: null | string;
    createdDate?: string;
    description?: null | string;
    displayName?: null | string;
    fileBlob?: null | string;
    fileId?: number;
    fileName?: null | string;
    fileType?: number | string;
    folderId?: number;
    isDeleted?: boolean;
    isPrivate?: boolean;
    modifiedBy?: null | string;
    modifiedDate?: string | Date;
    originalName?: null | string;
    startDate?: string | Date;
    expirationDate?: string | Date;
    securityLevel?: 0 | 1 | 2 | 3 | 4;
}

export type VaultCompleteResponse = VaultComplete[];

export interface VaultComplete {
    createdBy?: null | string;
    createdDate?: string;
    modifiedBy?: null | string;
    modifiedDate?: string;
    vaultDescription?: null | string;
    vaultId?: number;
    vaultName?: null | string;
}

export type VaultSingleResponse = VaultSingle[];

export interface VaultSingle {
    modifiedBy?: null | string;
    modifiedDate?: string;
    vaultDescription?: null | string;
    vaultId?: number;
    vaultName?: null | string;
}

export type FolderCompleteResponse = FolderComplete[];

export interface FolderComplete {
    createdBy?: null | string;
    createdDate?: string;
    folderDescription?: null | string;
    folderId?: number;
    folderName?: null | string;
    folderParentId?: null | string;
    modifiedBy?: null | string;
    modifiedDate?: string;
    vaultId?: number;
}

export type FolderSingleResponse = FolderSingle[];

export interface FolderSingle {
    folderDescription?: null | string;
    folderId?: number;
    folderName?: null | string;
    folderParentId?: null | string;
    vaultId?: number;
}

export type RawFolderTreeResponse = RawFolderTree[];

export interface RawFolderTree {
    tree?: string;
}

export type FolderTreeResponse = FolderTree[];

export interface FolderTree {
    folderName: string;
    folderId: number;
    children: FolderTree[];
    vaultId?: number;
}

export interface Tag {
    fileId: number;
    tag: string;
}

export interface Notification {
    fileId: number;
    title: string;
    deliveryMethod: string;
    message: string;
    when: string;
    isCompleted: number;
}
