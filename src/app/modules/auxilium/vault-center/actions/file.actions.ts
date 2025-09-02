import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { File, Notification, Tag } from 'app/shared/interfaces/user/vault-api.interface';

export const previewFile = createAction('[File/API] Preview File', props<{ file: File }>());
export const previewFileSuccess = createAction('[File/API] Preview File Success', props<{ file: File }>());
export const previewFileFailure = createAction('[File/API] Preview File Failure', props<{ error: Error }>());

export const downloadFile = createAction('[File/API] Download File', props<{ files?: Array<File> }>());
export const downloadFileSuccess = createAction('[File/API] Download File Success', props<{ files: File[] }>());
export const downloadFileFailure = createAction('[File/API] Download File Failure', props<{ error: Error }>());

export const loadFiles = createAction('[File/API] Load Files', props<{ files: File[] }>());

export const addFile = createAction('[File/API] Add File', props<{ file: File }>());

export const upsertFile = createAction('[File/API] Upsert File', props<{ file: File }>());

export const initAddFiles = createAction('[File/API] Add Files Init', props<{ files: File[] }>());
export const addFiles = createAction('[File/API] Add Files', props<{ files: File[] }>());
export const addFilesSuccess = createAction('[File/API] Add Files Success', props<{ allFiles: File[] }>());
export const addFilesFailure = createAction('[File/API] Add Files Failure', props<{ error: Error }>());

export const upsertFiles = createAction('[File/API] Upsert Files');
export const upsertFilesSuccess = createAction('[File/API] Upsert Files Success', props<{ files: File[] }>());
export const upsertFilesFailure = createAction('[File/API] Upsert Files Failure', props<{ error: Error }>());

export const initUpdateFile = createAction('[File/API] Update File Init', props<{ file: File }>());
export const updateFile = createAction('[File/API] Update File', props<{ file: File; updateStatus: boolean }>());
export const updateFileSuccess = createAction(
    '[File/API] Update File Success',
    props<{ file: Update<File>; updateStatus: boolean }>()
);
export const updateFileFailure = createAction('[File/API] Update File Failure', props<{ error: Error }>());

export const updateFiles = createAction('[File/API] Update Files', props<{ files: Update<File>[] }>());

export const initDeleteFile = createAction('[File/API] Delete File Init', props<{ file?: Array<File> }>());
export const deleteFile = createAction('[File/API] Delete File', props<{ file?: File[] }>());
export const deleteFileSuccess = createAction('[File/API] Delete File Success', props<{ ids: number[] }>());
export const deleteFileFailure = createAction('[File/API] Delete File Failure', props<{ error: Error }>());

export const getPreviewFile = createAction('[File/API] getPreview File', props<{ id: number }>());
export const getPreviewFileSuccess = createAction('[File/API] getPreview File Success', props<{ url: string }>());
export const getPreviewFileFailure = createAction('[File/API] getPreview File Failure', props<{ error: Error }>());

export const loadTags = createAction('[File/API] Load Tags', props<{ fileId: number }>());
export const loadTagsSuccess = createAction('[File/API] Load Tags Success', props<{ tags: Tag[]; fileId: number }>());
export const loadTagsFailure = createAction('[File/API] Load Tags Failure', props<{ error: Error }>());

export const addTag = createAction('[File/API] Add Tag', props<{ tag: Tag }>());
export const addTagSuccess = createAction('[File/API] Add Tag Success', props<{ tag: Tag }>());
export const addTagFailure = createAction('[File/API] Add Tag Failure', props<{ error: Error }>());

export const rmTag = createAction('[File/API] RM Tag', props<{ tag: Tag }>());
export const rmTagSuccess = createAction('[File/API] RM Tag Success');
export const rmTagFailure = createAction('[File/API] RM Tag Failure', props<{ error: Error }>());

export const loadNotifications = createAction('[Notifications/API] load Notifications', props<{ fileId: number }>());
export const loadNotificationsSuccess = createAction(
    '[Notifications/API] load Notifications Success',
    props<{ notification: Notification; fileId: number }>()
);
export const loadNotificationsFailure = createAction(
    '[Notifications/API] load Notifications Failure',
    props<{ error: Error }>()
);

export const addNotification = createAction('[/API] add Notification ', props<{ notification: Notification }>());
export const addNotificationSuccess = createAction(
    '[/API] add Notification  Success',
    props<{ notification: Notification }>()
);
export const addNotificationFailure = createAction('[/API] add Notification  Failure', props<{ error: Error }>());

export const rmNotification = createAction(
    '[Notification/API] rm Notification',
    props<{ notification: Notification }>()
);
export const rmNotificationSuccess = createAction('[Notification/API] rm Notification Success');
export const rmNotificationFailure = createAction(
    '[Notification/API] rm Notification Failure',
    props<{ error: Error }>()
);

export const deleteFiles = createAction('[File/API] Delete Files', props<{ ids: string[] }>());

export const clearFiles = createAction('[File/API] Clear Files');

export const setSelectedFile = createAction(
    '[File/API] Set SelectedFile',
    props<{ file: File; skipNavigation?: boolean }>()
);
export const setViewMode = createAction('[FileList/API] Set ViewMode', props<{ viewMode: 'list' | 'gallery' }>());
export const ResetState = createAction('[FileList/API] Reset Files');
