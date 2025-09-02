import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { File } from 'app/shared/interfaces/user/vault-api.interface';
import * as LicenseFileActions from '../actions/license-file.actions';

export const featureKey = 'license-files';

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
    on(LicenseFileActions.ResetState, () => {
        return initialState;
    }),

    on(LicenseFileActions.loadFiles, (state, action) => adapter.setAll(action.files, state)),

    on(LicenseFileActions.upsertFiles, (state, action) => ({ ...state, loading: true, error: null })),
    on(LicenseFileActions.upsertFilesSuccess, (state, action) =>
        adapter.upsertMany(action.files, { ...state, loading: false, error: null })
    ),
    on(LicenseFileActions.upsertFilesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(LicenseFileActions.initAddFiles, (state, { files }) => ({ ...state, loading: false, error: null })),
    on(LicenseFileActions.addFiles, (state, { files }) => ({ ...state, loading: true, error: null })),
    on(LicenseFileActions.addFilesSuccess, (state, action) =>
        adapter.addMany(action.allFiles, { ...state, loading: false, error: null })
    ),
    on(LicenseFileActions.addFilesFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(LicenseFileActions.previewFile, state => ({ ...state, loading: true, error: null })),

    on(LicenseFileActions.previewFileSuccess, (state, { file }) => ({ ...state, loading: false, error: null })),
    on(LicenseFileActions.previewFileFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(LicenseFileActions.updateFile, (state, { file }) => ({ ...state, loading: true, error: null })),
    on(LicenseFileActions.updateFileSuccess, (state, action) =>
        adapter.updateOne(action.file, { ...state, loading: false, error: null })
    ),
    on(LicenseFileActions.updateFileFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(LicenseFileActions.getPreviewFile, (state, { id }) => ({ ...state })),
    on(LicenseFileActions.getPreviewFileSuccess, (state, { url }) => ({
        ...state,
        selectedFile: { ...state.selectedFile, fileBlob: url },
    })),

    on(LicenseFileActions.setSelectedFile, (state, { file }) => ({ ...state, selectedFile: file })),
    on(LicenseFileActions.setViewMode, (state, { viewMode }) => ({ ...state, viewMode })),

    on(LicenseFileActions.loadTagsSuccess, (state, action) => ({
        ...state,
        tags: { ...state.tags, [action.fileId]: action.tags },
    })),
    on(LicenseFileActions.addTagSuccess, (state, { tag }) => ({
        ...state,
        tags: { ...state.tags, [tag.fileId]: (state.tags[tag.fileId] || []).concat(tag) },
    })),
    on(LicenseFileActions.rmTag, (state, { tag }) => ({
        ...state,
        tags: { ...state.tags, [tag.fileId]: (state.tags[tag.fileId] || []).filter(x => x.tag !== tag.tag) },
    })),

    on(LicenseFileActions.loadNotificationsSuccess, (state, action) => ({
        ...state,
        notification: { ...state.notification, [action.fileId]: action.notification },
    }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectViewMode = (state: FilesState) => state.viewMode;
export const selectLoading = (state: FilesState) => state.loading;
export const selectSelectedFile = (state: FilesState) => state.selectedFile;
export const selectTags = (state: FilesState) => state.tags[state.selectedFile?.fileId];
export const selectNotifications = state => state.notification[state.selectedFile?.fileId];
