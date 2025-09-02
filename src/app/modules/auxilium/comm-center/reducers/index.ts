import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromCommCenterCreate from './comm-center-create.reducer';
import * as fromCommCenterEmail from './comm-center-email.reducer';
import * as fromCommCenterTable from './comm-center-table.reducer';

export const featureKey = 'comm-center';

export interface CommCenterTableState {
    [fromCommCenterTable.featureKey]: fromCommCenterTable.State;
    [fromCommCenterEmail.featureKey]: fromCommCenterEmail.State;
    [fromCommCenterCreate.featureKey]: fromCommCenterCreate.State;
}

export interface State extends fromRoot.State {
    [featureKey]: CommCenterTableState;
}

export function reducers(state: CommCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromCommCenterTable.featureKey]: fromCommCenterTable.reducer,
        [fromCommCenterEmail.featureKey]: fromCommCenterEmail.reducer,
        [fromCommCenterCreate.featureKey]: fromCommCenterCreate.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, CommCenterTableState>(featureKey);

/**
 * CommCenterTable Selectors
 */
export namespace CommCenterTableSelectors {
    const selectCommCenterTableState = createSelector(selectState, state => state[fromCommCenterTable.featureKey]);

    export const selectLoading = createSelector(selectCommCenterTableState, fromCommCenterTable.selectLoading);
    export const selectError = createSelector(selectCommCenterTableState, fromCommCenterTable.selectError);
    export const selectEmails = createSelector(selectCommCenterTableState, fromCommCenterTable.selectEmails);
    export const selectEmailsByOwner = createSelector(
        selectCommCenterTableState,
        fromCommCenterTable.selectEmailsByOwner
    );
    export const selectEmailsBySource = createSelector(
        selectCommCenterTableState,
        fromCommCenterTable.selectEmailsBySource
    );
    export const selectCompletedEmails = createSelector(
        selectCommCenterTableState,
        fromCommCenterTable.selectCompletedEmails
    );
    export const selectDeletedEmails = createSelector(
        selectCommCenterTableState,
        fromCommCenterTable.selectDeletedEmails
    );
    export const selectMyEmails = createSelector(selectCommCenterTableState, fromCommCenterTable.selectMyEmails);
    export const selectOwners = createSelector(selectCommCenterTableState, fromCommCenterTable.selectOwners);
}

/**
 * CommCenter Email Selectors
 */
export namespace CommCenterEmailSelectors {
    const selectCommCenterEmailState = createSelector(selectState, state => state[fromCommCenterEmail.featureKey]);

    export const selectLoading = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectLoading);
    export const selectEmail = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectEmail);
    export const selectLoadingOwners = createSelector(
        selectCommCenterEmailState,
        fromCommCenterEmail.selectLoadingOwners
    );
    export const selectLoadingNotes = createSelector(
        selectCommCenterEmailState,
        fromCommCenterEmail.selectLoadingNotes
    );
    export const selectLoadingAttachments = createSelector(
        selectCommCenterEmailState,
        fromCommCenterEmail.selectLoadingAttachments
    );
    export const selectUpdatingLabel = createSelector(
        selectCommCenterEmailState,
        fromCommCenterEmail.selectUpdatingLabel
    );
    export const selectUpdatingOwner = createSelector(
        selectCommCenterEmailState,
        fromCommCenterEmail.selectUpdatingOwner
    );
    export const selectError = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectError);
    export const selectOwners = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectOwners);
    export const selectNotes = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectNotes);
    export const selectUpdatingNotes = createSelector(
        selectCommCenterEmailState,
        fromCommCenterEmail.selectUpdatingNotes
    );
    export const selectAttachments = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectAttachments);
    export const selectTags = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectTags);
    export const selectTagNames = createSelector(selectTags, tags => tags?.map(tag => tag.tag));
    export const selectLoadingTags = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectLoadingTags);
    export const selectUpdatingTags = createSelector(
        selectCommCenterEmailState,
        fromCommCenterEmail.selectUpdatingTags
    );
    export const selectAudio = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectAudio);
    export const selectAudioPlaying = createSelector(
        selectCommCenterEmailState,
        fromCommCenterEmail.selectAudioPlaying
    );
    export const selectPreviewUrl = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectPreviewUrl);
    export const selectPatients = createSelector(selectCommCenterEmailState, fromCommCenterEmail.selectPatients);
}

/**
 * CommCenterCreate Selectors
 */
export namespace CommCenterCreateSelectors {
    const selectCommCenterCreateState = createSelector(selectState, state => state[fromCommCenterCreate.featureKey]);

    export const selectLoading = createSelector(selectCommCenterCreateState, fromCommCenterCreate.selectLoading);
    export const selectError = createSelector(selectCommCenterCreateState, fromCommCenterCreate.selectError);
    export const selectOwners = createSelector(selectCommCenterCreateState, fromCommCenterCreate.selectOwners);
    export const selectLoadingOwners = createSelector(
        selectCommCenterCreateState,
        fromCommCenterCreate.selectLoadingOwners
    );
}
