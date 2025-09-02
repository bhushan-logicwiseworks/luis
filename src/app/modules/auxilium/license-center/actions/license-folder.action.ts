import { createAction, props } from '@ngrx/store';
import { File, FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';

export const setFolder = createAction('[LicenseCenter API] Set Current Folder', props<{ id: number }>());
export const upsertFoldersSuccess = createAction(
    '[LicenseCenter API] Upsert Folders Success',
    props<{ folders: FolderComplete[] }>()
);
export const upsertFoldersFailure = createAction(
    '[LicenseCenter API] Upsert Folders Failure',
    props<{ error: Error }>()
);
export const setCurrentFolder = createAction(
    '[LicenseCenter API] Set FolderTreeCurrentFolder',
    props<{ folder: FolderComplete; withFile?: number }>()
);
export const clearCurrentFolder = createAction('[LicenseCenter API] Clear CurrentFolder');
export const setResetFiles = createAction(
    '[LicenseCenter API] Reset Files After Change Security Level',
    props<{ file: File }>()
);

export const ResetState = createAction('[LicenseCenter API] Reset FolderTrees');
