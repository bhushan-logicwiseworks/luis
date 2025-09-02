import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { FolderTree } from 'app/shared/interfaces/user/vault-api.interface';
import * as FolderTreeActions from '../actions/folder-tree.actions';
import { AllBreadcrumbs } from '../interfaces/folderTreeBreadcrumbs';

export const featureKey = 'folderTrees';

export interface FolderTreeState extends EntityState<FolderTree> {
    loading: boolean;
    error: Error;
    loaded: boolean;

    breadcrumbs: AllBreadcrumbs;
}

export const adapter: EntityAdapter<FolderTree> = createEntityAdapter<FolderTree>({
    selectId: model => model?.vaultId,
});

export const initialState: FolderTreeState = adapter.getInitialState({
    loading: false,
    error: null,
    loaded: false,

    breadcrumbs: null,
});

export const reducer = createReducer(
    initialState,
    on(FolderTreeActions.addFolderTree, (state, action) => adapter.addOne(action.folderTree, state)),

    on(FolderTreeActions.addFolderTrees, (state, action) => adapter.addMany(action.folderTrees, state)),
    on(FolderTreeActions.upsertFolderTrees, (state, action) => adapter.upsertMany(action.folderTrees, state)),

    on(FolderTreeActions.updateFolderTrees, (state, action) => adapter.updateMany(action.folderTrees, state)),
    on(FolderTreeActions.deleteFolderTree, (state, action) => adapter.removeOne(action.id, state)),
    on(FolderTreeActions.deleteFolderTrees, (state, action) => adapter.removeMany(action.ids, state)),
    on(FolderTreeActions.loadFolderTreesSuccess, (state, action) => adapter.setAll(action.folderTrees, state)),

    on(FolderTreeActions.upsertFolderTree, (state, action) => ({
        ...state,
        loading: true,
        error: null,
        loaded: false,
    })),
    on(FolderTreeActions.upsertFolderTreeSuccess, (state, action) =>
        adapter.upsertOne(action.folderTree, { ...state, loading: false, loaded: true, error: null })
    ),
    on(FolderTreeActions.upsertFolderTreeFailure, (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: action.error,
    })),

    on(FolderTreeActions.updateFolderTree, (state, { vaultId }) => ({ ...state, loading: true, error: null })),
    on(FolderTreeActions.updateFolderTreeSuccess, (state, action) =>
        adapter.updateOne(action.folderTree, {
            ...state,
            loading: false,
            error: null,
        })
    ),
    on(FolderTreeActions.updateFolderTreeFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(FolderTreeActions.setFolderTreeBreadcrumbs, state => ({ ...state, breadcrumbs: null })),
    on(FolderTreeActions.setFolderTreeBreadcrumbsSuccess, (state, { breadcrumbs }) => ({ ...state, breadcrumbs })),

    on(FolderTreeActions.clearFolderTrees, state => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectBreadcrumbs = (state: FolderTreeState) => state.breadcrumbs;
