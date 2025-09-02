import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';
import * as FolderActions from '../actions/license-folder.action';

export const featureKey = 'license-folders';

export interface FolderState extends EntityState<FolderComplete> {
    loading: boolean;
    error: Error;
    currentFolderId: number;
    currentFolder: FolderComplete;
}

export const adapter: EntityAdapter<FolderComplete> = createEntityAdapter<FolderComplete>({
    selectId: model => model.folderId,
});

export const initialState: FolderState = adapter.getInitialState({
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
    on(FolderActions.upsertFoldersSuccess, (state, action) =>
        adapter.setAll(action.folders, { ...state, loading: false, error: null })
    ),
    on(FolderActions.upsertFoldersFailure, (state, { error }) => ({ ...state, loading: false, error })),
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
