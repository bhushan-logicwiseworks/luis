import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { FolderTree } from 'app/shared/interfaces/user/vault-api.interface';
import { AllBreadcrumbs } from '../interfaces/folderTreeBreadcrumbs';

export const loadFolderTrees = createAction('[FolderTree/API] Load FolderTrees');
export const loadFolderTreesSuccess = createAction(
    '[FolderTree/API] Load FolderTree Success',
    props<{ folderTrees: FolderTree[] }>()
);
export const loadFolderTreesFailure = createAction(
    '[FolderTree/API] Load FolderTree Failure',
    props<{ error: Error }>()
);

export const addFolderTree = createAction('[FolderTree/API] Add FolderTree', props<{ folderTree: FolderTree }>());

export const upsertFolderTree = createAction('[FolderTree/API] Upsert FolderTree', props<{ vaultId: number }>());
export const upsertFolderTreeSuccess = createAction(
    '[FolderTree/API] Upsert FolderTree Success',
    props<{ folderTree: FolderTree }>()
);
export const upsertFolderTreeFailure = createAction(
    '[FolderTree/API] Upsert FolderTree Failure',
    props<{ error: Error }>()
);

export const setFolderTreeBreadcrumbs = createAction('[FolderTree/API] Set FolderTreeBreadcrumbs');
export const setFolderTreeBreadcrumbsSuccess = createAction(
    '[FolderTree/API] Set FolderTreeBreadcrumbs Success',
    props<{ breadcrumbs: AllBreadcrumbs }>()
);
export const setFolderTreeBreadcrumbsFailure = createAction(
    '[FolderTree/API] Set FolderTreeBreadcrumbs Failure',
    props<{ error: Error }>()
);

export const updateFolderTree = createAction('[FolderTree/API] Update FolderTree', props<{ vaultId: number }>());
export const updateFolderTreeSuccess = createAction(
    '[FolderTree/API] Update FolderTree Success',
    props<{ folderTree: Update<FolderTree> }>()
);
export const updateFolderTreeFailure = createAction(
    '[FolderTree/API] Update FolderTree Failure',
    props<{ error: Error }>()
);

export const addFolderTrees = createAction('[FolderTree/API] Add FolderTrees', props<{ folderTrees: FolderTree[] }>());

export const upsertFolderTrees = createAction(
    '[FolderTree/API] Upsert FolderTrees',
    props<{ folderTrees: FolderTree[] }>()
);

export const updateFolderTrees = createAction(
    '[FolderTree/API] Update FolderTrees',
    props<{ folderTrees: Update<FolderTree>[] }>()
);

export const deleteFolderTree = createAction('[FolderTree/API] Delete FolderTree', props<{ id: string }>());

export const deleteFolderTrees = createAction('[FolderTree/API] Delete FolderTrees', props<{ ids: string[] }>());

export const clearFolderTrees = createAction('[FolderTree/API] Clear FolderTrees');
