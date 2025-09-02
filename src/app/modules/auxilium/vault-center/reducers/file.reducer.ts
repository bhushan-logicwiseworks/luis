import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { File } from 'app/shared/interfaces/user/vault-api.interface';
import * as FileActions from '../actions/file.actions';

export const featureKey = 'files';

export interface FilesState extends EntityState<File> {
    selectedFile: File;
    loading: boolean;
    viewMode: 'list' | 'gallery';
    tags: Record<number, any>;
    notification: Record<number, any>;
}

export const adapter: EntityAdapter<File> = createEntityAdapter<File>({
    selectId: model => model.fileId,
});

export const initialState: FilesState = adapter.getInitialState({
    selectedFile: null,
    loading: false,
    viewMode: 'gallery',
    tags: {},
    notification: {},
});

export const reducer = createReducer(
    initialState,
    on(FileActions.ResetState, () => {
        return initialState;
    }),
    on(FileActions.addFile, (state, action) => adapter.addOne(action.file, state)),
    on(FileActions.upsertFile, (state, action) => adapter.upsertOne(action.file, state)),

    on(FileActions.updateFiles, (state, action) => adapter.updateMany(action.files, state)),

    on(FileActions.deleteFiles, (state, action) => adapter.removeMany(action.ids, state)),
    on(FileActions.loadFiles, (state, action) => adapter.setAll(action.files, state)),
    on(FileActions.clearFiles, state => adapter.removeAll(state)),

    on(FileActions.upsertFiles, (state, action) => ({ ...state, loading: true, error: null })),
    on(FileActions.upsertFilesSuccess, (state, action) =>
        adapter.upsertMany(action.files, { ...state, loading: false, error: null })
    ),
    on(FileActions.upsertFilesFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(FileActions.initAddFiles, (state, { files }) => ({ ...state, loading: false, error: null })),
    on(FileActions.addFiles, (state, { files }) => ({ ...state, loading: true, error: null })),
    on(FileActions.addFilesSuccess, (state, action) =>
        adapter.addMany(action.allFiles, { ...state, loading: false, error: null })
    ),
    on(FileActions.addFilesFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(FileActions.deleteFile, state => ({ ...state, loading: true, error: null })),
    on(FileActions.deleteFileSuccess, (state, action) =>
        adapter.removeMany(action.ids, { ...state, loading: false, error: null, selectedFile: null })
    ),
    on(FileActions.deleteFileFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(FileActions.previewFile, state => ({ ...state, loading: true, error: null })),

    on(FileActions.previewFileSuccess, (state, { file }) => ({ ...state, loading: false, error: null })),
    on(FileActions.previewFileFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(FileActions.downloadFile, state => ({ ...state, loading: true, error: null })),
    on(FileActions.downloadFileSuccess, state => ({ ...state, loading: false, error: null })),
    on(FileActions.downloadFileFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(FileActions.updateFile, (state, { file }) => ({ ...state, loading: true, error: null })),
    on(FileActions.updateFileSuccess, (state, action) =>
        adapter.updateOne(action.file, { ...state, loading: false, error: null })
    ),
    on(FileActions.updateFileFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(FileActions.getPreviewFile, (state, { id }) => ({ ...state })),
    on(FileActions.getPreviewFileSuccess, (state, { url }) => ({
        ...state,
        selectedFile: { ...state.selectedFile, fileBlob: url },
    })),

    on(FileActions.setSelectedFile, (state, { file }) => ({ ...state, selectedFile: file })),
    on(FileActions.setViewMode, (state, { viewMode }) => ({ ...state, viewMode })),

    on(FileActions.loadTagsSuccess, (state, action) => ({
        ...state,
        tags: { ...state.tags, [action.fileId]: action.tags },
    })),
    on(FileActions.addTagSuccess, (state, { tag }) => ({
        ...state,
        tags: { ...state.tags, [tag.fileId]: (state.tags[tag.fileId] || []).concat(tag) },
    })),
    on(FileActions.rmTag, (state, { tag }) => ({
        ...state,
        tags: { ...state.tags, [tag.fileId]: (state.tags[tag.fileId] || []).filter(x => x.tag !== tag.tag) },
    })),

    on(FileActions.loadNotificationsSuccess, (state, action) => ({
        ...state,
        notification: { ...state.notification, [action.fileId]: action.notification },
    })),
    on(FileActions.addNotificationSuccess, (state, { notification }) => ({
        ...state,
        notification: { ...state.notification, [notification.fileId]: notification },
    })),
    on(FileActions.rmNotification, (state, { notification }) => ({
        ...state,
        notification: { ...state.notification, [notification.fileId]: null },
    }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectSelectedFile = (state: FilesState) => state.selectedFile;
export const selectLoading = (state: FilesState) => state.loading;
export const selectViewMode = (state: FilesState) => state.viewMode;
export const selectTags = (state: FilesState) => state.tags[state.selectedFile?.fileId];
export const selectNotifications = state => state.notification[state.selectedFile?.fileId];
