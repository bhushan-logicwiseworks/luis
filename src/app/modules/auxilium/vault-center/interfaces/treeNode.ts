import { FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';

export interface TreeNode {
    name: string;
    type: string;
    level: number;
    expandable: boolean;
    folder: FolderComplete;
}
