import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromLicenseCenterIndividual from './license-center-individual.reducer';
import * as fromLicenseCenterTable from './license-center-table.reducer';
import * as fromLicenseFiles from './license-file.reducer';
import * as fromLicenseFolderTree from './license-folder-tree.reducer';
import * as fromLicenseFolder from './license-folder.reducer';

export const featureKey = 'license-center-new';

export interface LicenseCenterTableState {
    [fromLicenseCenterTable.featureKey]: fromLicenseCenterTable.State;
    [fromLicenseCenterIndividual.featureKey]: fromLicenseCenterIndividual.State;
    [fromLicenseFolder.featureKey]: fromLicenseFolder.FolderState;
    [fromLicenseFiles.featureKey]: fromLicenseFiles.FilesState;
    [fromLicenseFolderTree.featureKey]: fromLicenseFolderTree.FolderTreeState;
}

export interface State extends fromRoot.State {
    [featureKey]: LicenseCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: LicenseCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromLicenseCenterTable.featureKey]: fromLicenseCenterTable.reducer,
        [fromLicenseCenterIndividual.featureKey]: fromLicenseCenterIndividual.reducer,
        [fromLicenseFolder.featureKey]: fromLicenseFolder.reducer,
        [fromLicenseFiles.featureKey]: fromLicenseFiles.reducer,
        [fromLicenseFolderTree.featureKey]: fromLicenseFolderTree.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, LicenseCenterTableState>(featureKey);

/**
 * LicenseCenter Table Selectors
 */
export namespace LicenseCenterTableSelectors {
    const selectReferralCenterTableState = createSelector(
        selectState,
        state => state[fromLicenseCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectReferralCenterTableState, fromLicenseCenterTable.selectLoading);
    export const selectError = createSelector(selectReferralCenterTableState, fromLicenseCenterTable.selectError);
    export const selectAll = createSelector(selectReferralCenterTableState, fromLicenseCenterTable.selectLicenses);
    export const selectZipCode = createSelector(selectReferralCenterTableState, fromLicenseCenterTable.selectZipCode);
    export const selectBranch = createSelector(selectReferralCenterTableState, fromLicenseCenterTable.selectBranch);
    export const selectLicenseById = createSelector(
        selectReferralCenterTableState,
        fromLicenseCenterTable.selectLicenseById
    );
}

/**
 * LicenseCenter Individual Selectors
 */
export namespace LicenseCenterIndividualSelectors {
    const selectReferralCenterIndividualState = createSelector(
        selectState,
        state => state[fromLicenseCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectReferralCenterIndividualState,
        fromLicenseCenterIndividual.selectLoading
    );
    export const selectLicensesRep = createSelector(
        selectReferralCenterIndividualState,
        fromLicenseCenterIndividual.selectLicensesRep
    );
    export const selectLicenseFolderByIdRep = createSelector(
        selectReferralCenterIndividualState,
        fromLicenseCenterIndividual.selectLicenseFolderByIdRep
    );
    export const selectError = createSelector(
        selectReferralCenterIndividualState,
        fromLicenseCenterIndividual.selectError
    );
}

export namespace LicenseFolderSelectors {
    export const selectFolderState = createSelector(selectState, state => state[fromLicenseFolder.featureKey]);
    export const selectIds = createSelector(selectFolderState, fromLicenseFolder.selectIds);
    export const selectEntities = createSelector(selectFolderState, fromLicenseFolder.selectEntities);
    export const selectAll = createSelector(selectFolderState, fromLicenseFolder.selectAll);
    export const selectTotal = createSelector(selectFolderState, fromLicenseFolder.selectTotal);

    export const selectCurrentFolderId = createSelector(selectFolderState, fromLicenseFolder.selectCurrentFolderId);

    export const selectCurrentFolder = createSelector(selectFolderState, fromLicenseFolder.selectCurrentFolder);

    export const selectChildren = createSelector(selectAll, selectCurrentFolderId, (entities, curId) => {
        return entities.filter(entity => {
            return entity.folderParentId?.toString() === String(curId);
        });
    });
}

export namespace LicenseFileSelectors {
    export const selectFilesState = createSelector(selectState, state => state[fromLicenseFiles.featureKey]);
    export const selectIds = createSelector(selectFilesState, fromLicenseFiles.selectIds);
    export const selectEntities = createSelector(selectFilesState, fromLicenseFiles.selectEntities);
    export const selectAll = createSelector(selectFilesState, fromLicenseFiles.selectAll);
    export const selectTotal = createSelector(selectFilesState, fromLicenseFiles.selectTotal);
    export const selectSelectedFile = createSelector(selectFilesState, fromLicenseFiles.selectSelectedFile);
    export const selectFilesInFolder = createSelector(
        selectState,
        selectFilesState,
        selectAll,
        (state: LicenseCenterTableState, _, entities) => {
            const folderId = state[fromLicenseFolder.featureKey].currentFolderId;
            return entities.filter(entity => entity.folderId === folderId);
        }
    );
    export const selectLoading = createSelector(selectFilesState, fromLicenseFiles.selectLoading);
    export const selectViewMode = createSelector(selectFilesState, fromLicenseFiles.selectViewMode);
    export const selectTags = createSelector(selectFilesState, fromLicenseFiles.selectTags);
    export const selectNotifications = createSelector(selectFilesState, fromLicenseFiles.selectNotifications);
}

export namespace LicenseFolderTreeSelectors {
    const selectFolderTreeState = createSelector(selectState, state => state[fromLicenseFolderTree.featureKey]);

    export const selectIds = createSelector(selectFolderTreeState, fromLicenseFolderTree.selectIds);
    export const selectEntities = createSelector(selectFolderTreeState, fromLicenseFolderTree.selectEntities);
    export const selectAll = createSelector(selectFolderTreeState, fromLicenseFolderTree.selectAll);
    export const selectTotal = createSelector(selectFolderTreeState, fromLicenseFolderTree.selectTotal);

    export const selectBreadcrumbsArray = createSelector(
        selectState,
        selectFolderTreeState,
        LicenseFolderSelectors.selectFolderState,
        (fileVaultState, folderTreeState, folderState) => {
            const selectedVaultId = fileVaultState[fromLicenseCenterIndividual.featureKey].licenseFolder
                ? fileVaultState[fromLicenseCenterIndividual.featureKey].licenseFolder.vaultId
                : null;
            try {
                if (selectedVaultId !== null) {
                    return folderTreeState.breadcrumbs
                        ? folderTreeState.breadcrumbs[selectedVaultId][folderState.currentFolderId]
                        : [];
                }
            } catch (e) {
                return [];
            }
        }
    );
}
