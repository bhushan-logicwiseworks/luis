export type FolderTreeBreadcrumbsArray = FolderTreeBreadcrumbs[];

export interface AllBreadcrumbs {
    [key: number]: FolderTreeBreadcrumbsData[];
}

export interface FolderTreeBreadcrumbsData {
    [key: number]: FolderTreeBreadcrumbsArray;
}

export interface FolderTreeBreadcrumbs {
    folderName: string;
    folderId: number;
    children: FolderTreeBreadcrumbs[];
}
