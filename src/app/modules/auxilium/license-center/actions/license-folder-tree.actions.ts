import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { FolderTree } from 'app/shared/interfaces/user/vault-api.interface';
import { AllBreadcrumbs } from '../../vault-center/interfaces/folderTreeBreadcrumbs';

export const loadFolderTrees = createAction('[License/API] Load FolderTrees');
export const loadFolderTreesSuccess = createAction(
    '[License/API] Load FolderTree Success',
    props<{ folderTrees: FolderTree[] }>()
);
export const loadFolderTreesFailure = createAction('[License/API] Load FolderTree Failure', props<{ error: Error }>());

export const addFolderTree = createAction('[License/API] Add FolderTree', props<{ folderTree: FolderTree }>());

export const upsertFolderTree = createAction('[License/API] Upsert FolderTree', props<{ vaultId: number }>());
export const upsertFolderTreeSuccess = createAction(
    '[License/API] Upsert FolderTree Success',
    props<{ folderTree: FolderTree }>()
);
export const upsertFolderTreeFailure = createAction(
    '[License/API] Upsert FolderTree Failure',
    props<{ error: Error }>()
);

export const setFolderTreeBreadcrumbs = createAction('[License/API] Set FolderTreeBreadcrumbs');
export const setFolderTreeBreadcrumbsSuccess = createAction(
    '[License/API] Set FolderTreeBreadcrumbs Success',
    props<{ breadcrumbs: AllBreadcrumbs }>()
);
export const setFolderTreeBreadcrumbsFailure = createAction(
    '[License/API] Set FolderTreeBreadcrumbs Failure',
    props<{ error: Error }>()
);

export const updateFolderTree = createAction('[License/API] Update FolderTree', props<{ vaultId: number }>());
export const updateFolderTreeSuccess = createAction(
    '[License/API] Update FolderTree Success',
    props<{ folderTree: Update<FolderTree> }>()
);
export const updateFolderTreeFailure = createAction(
    '[License/API] Update FolderTree Failure',
    props<{ error: Error }>()
);

export const addFolderTrees = createAction('[License/API] Add FolderTrees', props<{ folderTrees: FolderTree[] }>());

export const upsertFolderTrees = createAction(
    '[License/API] Upsert FolderTrees',
    props<{ folderTrees: FolderTree[] }>()
);

export const updateFolderTrees = createAction(
    '[License/API] Update FolderTrees',
    props<{ folderTrees: Update<FolderTree>[] }>()
);

export const deleteFolderTree = createAction('[License/API] Delete FolderTree', props<{ id: string }>());

export const deleteFolderTrees = createAction('[License/API] Delete FolderTrees', props<{ ids: string[] }>());

export const clearFolderTrees = createAction('[License/API] Clear FolderTrees');
