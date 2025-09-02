export interface Branch {
    id: number;
    branchcode: string;
    name: string;
}

export type GetBranchListResponse = Branch[];
