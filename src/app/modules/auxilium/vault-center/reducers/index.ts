import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromFiles from './file.reducer';
import * as fromFolderTree from './folder-tree.reducer';
import * as fromFolders from './folder.reducer';
import * as fromVaults from './vault.reducer';

export const featureKey = 'vault-center';

export interface FileVaultState {
    [fromVaults.featureKey]: fromVaults.VaultsState;
    [fromFolderTree.featureKey]: fromFolderTree.FolderTreeState;
    [fromFiles.featureKey]: fromFiles.FilesState;
    [fromFolders.featureKey]: fromFolders.FolderState;
}

export interface State extends fromRoot.State {
    [featureKey]: FileVaultState;
}

export function reducers(state: FileVaultState | undefined, action: Action) {
    return combineReducers({
        [fromVaults.featureKey]: fromVaults.reducer,
        [fromFolderTree.featureKey]: fromFolderTree.reducer,
        [fromFiles.featureKey]: fromFiles.reducer,
        [fromFolders.featureKey]: fromFolders.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, FileVaultState>(featureKey);

/**
 * FileVault Selectors
 */
export namespace VaultsSelectors {
    const selectVaultsState = createSelector(selectState, state => state[fromVaults.featureKey]);

    export const selectIds = createSelector(selectVaultsState, fromVaults.selectIds);
    export const selectEntities = createSelector(selectVaultsState, fromVaults.selectEntities);
    export const selectAll = createSelector(selectVaultsState, fromVaults.selectAll);
    export const selectTotal = createSelector(selectVaultsState, fromVaults.selectTotal);

    export const selectSelectedVaultId = createSelector(selectVaultsState, fromVaults.getSelectedVaultId);

    export const selectCurrentVault = createSelector(
        selectVaultsState,
        selectEntities,
        selectSelectedVaultId,
        (fileVaultState, entities, vaultId) => entities[vaultId]
    );

    export const selectLoaded = createSelector(selectVaultsState, fromVaults.selectLoaded);
}

export namespace FolderSelectors {
    export const selectFolderState = createSelector(selectState, state => state[fromFolders.featureKey]);
    export const selectIds = createSelector(selectFolderState, fromFolders.selectIds);
    export const selectEntities = createSelector(selectFolderState, fromFolders.selectEntities);
    export const selectAll = createSelector(selectFolderState, fromFolders.selectAll);
    export const selectTotal = createSelector(selectFolderState, fromFolders.selectTotal);

    export const selectCurrentFolderId = createSelector(selectFolderState, fromFolders.selectCurrentFolderId);

    export const selectCurrentFolder = createSelector(selectFolderState, fromFolders.selectCurrentFolder);

    export const selectChildren = createSelector(selectAll, selectCurrentFolderId, (entities, curId) => {
        return entities.filter(entity => entity.folderParentId?.toString() === String(curId));
    });
}

export namespace FolderTreeSelectors {
    const selectFolderTreeState = createSelector(selectState, state => state[fromFolderTree.featureKey]);

    export const selectIds = createSelector(selectFolderTreeState, fromFolderTree.selectIds);
    export const selectEntities = createSelector(selectFolderTreeState, fromFolderTree.selectEntities);
    export const selectAll = createSelector(selectFolderTreeState, fromFolderTree.selectAll);
    export const selectTotal = createSelector(selectFolderTreeState, fromFolderTree.selectTotal);

    export const selectBreadcrumbsArray = createSelector(
        selectState,
        selectFolderTreeState,
        FolderSelectors.selectFolderState,
        (fileVaultState, folderTreeState, folderState) => {
            const selectedVaultId = fileVaultState[fromVaults.featureKey].selectedVaultId;
            try {
                return folderTreeState.breadcrumbs
                    ? folderTreeState.breadcrumbs[selectedVaultId][folderState.currentFolderId]
                    : [];
            } catch (e) {
                return [];
            }
        }
    );
}

export namespace FileSelectors {
    export const selectFilesState = createSelector(selectState, state => state[fromFiles.featureKey]);

    export const selectIds = createSelector(selectFilesState, fromFiles.selectIds);
    export const selectEntities = createSelector(selectFilesState, fromFiles.selectEntities);
    export const selectAll = createSelector(selectFilesState, fromFiles.selectAll);
    export const selectTotal = createSelector(selectFilesState, fromFiles.selectTotal);

    export const selectSelectedFile = createSelector(selectFilesState, fromFiles.selectSelectedFile);

    export const selectFilesInFolder = createSelector(
        selectState,
        selectFilesState,
        selectAll,
        (state: FileVaultState, _, entities) => {
            const folderId = state[fromFolders.featureKey].currentFolderId;
            return entities.filter(entity => entity.folderId === folderId);
        }
    );

    export const selectLoading = createSelector(selectFilesState, fromFiles.selectLoading);
    export const selectViewMode = createSelector(selectFilesState, fromFiles.selectViewMode);
    export const selectTags = createSelector(selectFilesState, fromFiles.selectTags);
    export const selectNotifications = createSelector(selectFilesState, fromFiles.selectNotifications);
}
