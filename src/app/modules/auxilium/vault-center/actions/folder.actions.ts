import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { File, FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';

export const loadFolders = createAction('[Folder/API] Load Folders Init', props<{ folders: FolderComplete[] }>());
export const loadFoldersSuccess = createAction(
    '[Folder/API] Load Folders Init Success',
    props<{ folders: FolderComplete[] }>()
);
export const loadFoldersFailure = createAction('[Folders/API] Load Folders Init Failure', props<{ error: Error }>());

export const initAddFolder = createAction('[Folder/API] Init AddFolder');
export const addFolder = createAction('[Folder/API] Add Folder', props<{ folder: FolderComplete }>());
export const addFolderSuccess = createAction('[Folder/API] Add Folder Success', props<{ folder: FolderComplete }>());
export const addFolderFailure = createAction('[Folder/API] Add Folder Failure', props<{ error: Error }>());

export const upsertFolders = createAction('[Folder/API] Upsert Folders', props<{ vaultId: number }>());
export const upsertFoldersSuccess = createAction(
    '[Folder/API] Upsert Folders Success',
    props<{ folders: FolderComplete[] }>()
);
export const upsertFoldersFailure = createAction('[Folder/API] Upsert Folders Failure', props<{ error: Error }>());

export const setCurrentFolder = createAction(
    '[FolderTree/API] Set FolderTreeCurrentFolder',
    props<{ folder: FolderComplete; withFile?: number }>()
);
export const clearCurrentFolder = createAction('[FolderTree/API] Clear CurrentFolder');

export const initUpdateFolder = createAction('[Folder/API] Update Folder Init', props<{ folder: FolderComplete }>());
export const updateFolder = createAction(
    '[Folder/API] Update Folder',
    props<{ folder: FolderComplete; preventSetCurrent?: boolean }>()
);
export const updateFolderSuccess = createAction(
    '[Folder/API] Update Folder Success',
    props<{ folder: Update<FolderComplete> }>()
);
export const updateFolderFailure = createAction('[Folder/API] Update Folder Failure', props<{ error: Error }>());

export const initDeleteFolder = createAction('[Folder/API] Delete Folder Init', props<{ folder: FolderComplete[] }>());
export const deleteFolder = createAction('[Folder/API] Delete Folder', props<{ id: number[] }>());
export const deleteFolderSuccess = createAction('[Folder/API] Delete Folder Success', props<{ id: number[] }>());
export const deleteFolderFailure = createAction('[Folder/API] Delete Folder Failure', props<{ error: Error }>());
export const setResetFiles = createAction(
    '[FolderTree/API] Reset Files After Change Security Level',
    props<{ file: File }>()
);

export const upsertFolder = createAction('[Folder/API] Upsert Folder', props<{ folder: FolderComplete }>());

export const addFolders = createAction('[Folder/API] Add Folders', props<{ folders: FolderComplete[] }>());

export const updateFolders = createAction(
    '[Folder/API] Update Folders',
    props<{ folders: Update<FolderComplete>[] }>()
);

export const deleteFolders = createAction('[Folder/API] Delete Folders', props<{ ids: number[] }>());

export const clearFolders = createAction('[Folder/API] Clear Folders');
export const ResetState = createAction('[FolderTree/API] Reset FolderTrees');
