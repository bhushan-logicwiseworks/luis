import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';
import * as FolderActions from '../actions/folder.actions';

export const featureKey = 'folders';

export interface FolderState extends EntityState<FolderComplete> {
    // additional entities state properties
    loading: boolean;
    error: Error;
    currentFolderId: number;
    currentFolder: FolderComplete;
}

export const adapter: EntityAdapter<FolderComplete> = createEntityAdapter<FolderComplete>({
    selectId: model => model.folderId,
});

export const initialState: FolderState = adapter.getInitialState({
    // additional entity state properties
    loading: false,
    error: null,
    currentFolderId: null,
    currentFolder: null,
});

export const reducer = createReducer(
    initialState,
    on(FolderActions.ResetState, () => {
        return initialState;
    }),
    on(FolderActions.addFolder, (state, { folder }) => ({ ...state, folder, loading: true, error: null })),
    on(FolderActions.addFolderSuccess, (state, action) =>
        adapter.addOne(action.folder, { ...state, loading: false, error: null })
    ),
    on(FolderActions.addFolderFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(FolderActions.upsertFolders, (state, { vaultId }) => ({ ...state, loading: true, error: null })),
    on(FolderActions.upsertFoldersSuccess, (state, action) =>
        adapter.upsertMany(action.folders, { ...state, loading: false, error: null })
    ),
    on(FolderActions.upsertFoldersFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(FolderActions.updateFolder, (state, { folder }) => ({ ...state, loading: true, error: null })),
    on(FolderActions.updateFolderSuccess, (state, action) =>
        adapter.updateOne(action.folder, { ...state, loading: false, error: null })
    ),
    on(FolderActions.updateFolderFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(FolderActions.initDeleteFolder, (state, { folder }) => ({ ...state, error: null })),
    on(FolderActions.deleteFolder, (state, { id }) => ({ ...state, loading: true, error: null })),
    on(FolderActions.deleteFolderSuccess, (state, { id }) =>
        adapter.removeMany(id, { ...state, loading: false, error: null })
    ),
    on(FolderActions.deleteFolderFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(FolderActions.upsertFolder, (state, action) => adapter.upsertOne(action.folder, state)),
    on(FolderActions.addFolders, (state, action) => adapter.addMany(action.folders, state)),

    on(FolderActions.updateFolders, (state, action) => adapter.updateMany(action.folders, state)),

    on(FolderActions.deleteFolders, (state, action) => adapter.removeMany(action.ids, state)),
    on(FolderActions.loadFolders, (state, action) => adapter.setAll(action.folders, state)),
    on(FolderActions.clearFolders, state => adapter.removeAll(state)),
    on(FolderActions.setCurrentFolder, (state, { folder }) => ({
        ...state,
        loading: false,
        error: null,
        currentFolder: folder,
        currentFolderId: folder?.folderId,
    })),
    on(FolderActions.clearCurrentFolder, state => ({
        ...state,
        loading: false,
        error: null,
        currentFolder: null,
        currentFolderId: null,
    }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectCurrentFolderId = (state: FolderState) => state.currentFolderId;
export const selectCurrentFolder = (state: FolderState) => state.currentFolder;
