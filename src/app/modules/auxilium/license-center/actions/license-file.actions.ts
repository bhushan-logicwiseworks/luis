import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { File, Tag } from 'app/shared/interfaces/user/vault-api.interface';
export const previewFile = createAction('[License FileList/API] Preview File', props<{ file: File }>());
export const previewFileSuccess = createAction('[License FileList/API] Preview File Success', props<{ file: File }>());
export const previewFileFailure = createAction(
    '[License FileList/API] Preview File Failure',
    props<{ error: Error }>()
);

export const upsertFiles = createAction('[License FileList/API] Upsert Files');
export const upsertFilesSuccess = createAction(
    '[License FileList/API] Upsert Files Success',
    props<{ files: File[] }>()
);
export const upsertFilesFailure = createAction(
    '[License FileList/API] Upsert Files Failure',
    props<{ error: Error }>()
);
export const loadFiles = createAction('License FileList/API', props<{ files: File[] }>());
export const addTag = createAction('[License FileList/API] Add Tag', props<{ tag: Tag }>());
export const addTagSuccess = createAction('[License FileList/API] Add Tag Success', props<{ tag: Tag }>());
export const addTagFailure = createAction('[License FileList/API] Add Tag Failure', props<{ error: Error }>());

export const initAddFiles = createAction('[License FileList/API] Add Files Init', props<{ files: File[] }>());
export const addFiles = createAction('[License FileList/API] Add Files', props<{ files: File[] }>());
export const addFilesSuccess = createAction('[License FileList/API] Add Files Success', props<{ allFiles: File[] }>());
export const addFilesFailure = createAction('[License FileList/API] Add Files Failure', props<{ error: Error }>());

export const initUpdateFile = createAction('[License FileList/API] Update File Init', props<{ file: File }>());
export const updateFile = createAction(
    '[License FileList/API] Update File',
    props<{ file: File; updateStatus: boolean }>()
);
export const updateFileSuccess = createAction(
    '[License FileList/API] Update File Success',
    props<{ file: Update<File>; updateStatus: boolean }>()
);
export const updateFileFailure = createAction('[License FileList/API] Update File Failure', props<{ error: Error }>());

export const getPreviewFile = createAction('[License FileList/API] getPreview File', props<{ id: number }>());
export const getPreviewFileSuccess = createAction(
    '[License FileList/API] getPreview File Success',
    props<{ url: string }>()
);
export const getPreviewFileFailure = createAction(
    '[License FileList/API] getPreview File Failure',
    props<{ error: Error }>()
);

export const loadTags = createAction('[License FileList/API] Load Tags', props<{ fileId: number }>());
export const loadTagsSuccess = createAction(
    '[License FileList/API] Load Tags Success',
    props<{ tags: Tag[]; fileId: number }>()
);
export const loadTagsFailure = createAction('[License FileList/API] Load Tags Failure', props<{ error: Error }>());

export const rmTag = createAction('[License FileList/API] RM Tag', props<{ tag: Tag }>());
export const rmTagSuccess = createAction('[License FileList/API] RM Tag Success');
export const rmTagFailure = createAction('[License FileList/API] RM Tag Failure', props<{ error: Error }>());

export const loadNotifications = createAction('[Notifications/API] load Notifications', props<{ fileId: number }>());
export const loadNotificationsSuccess = createAction(
    '[Notifications/API] load Notifications Success',
    props<{ notification: Notification; fileId: number }>()
);
export const loadNotificationsFailure = createAction(
    '[Notifications/API] load Notifications Failure',
    props<{ error: Error }>()
);

export const setViewMode = createAction(
    '[License FileList/API] Set ViewMode',
    props<{ viewMode: 'list' | 'gallery' }>()
);
export const setSelectedFile = createAction(
    '[License FileList/API] Set SelectedFile',
    props<{ file: File; skipNavigation?: boolean }>()
);
export const ResetState = createAction('[License FileList/API] Reset Files');

export const downloadFile = createAction('[License FileList/API] Download File', props<{ files?: Array<File> }>());
export const downloadFileSuccess = createAction(
    '[License FileList/API] Download File Success',
    props<{ files: File[] }>()
);
export const downloadFileFailure = createAction(
    '[License FileList/API] Download File Failure',
    props<{ error: Error }>()
);
