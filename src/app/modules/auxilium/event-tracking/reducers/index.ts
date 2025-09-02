import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromEventTrackingCreate from './event-tracking-create.reducer';
import * as fromEventTrackingEmail from './event-tracking-email.reducer';
import * as fromEventTrackingTable from './event-tracking-table.reducer';

export const featureKey = 'event-tracking-center';

export interface EventTrackingTableState {
    [fromEventTrackingTable.featureKey]: fromEventTrackingTable.State;
    [fromEventTrackingEmail.featureKey]: fromEventTrackingEmail.State;
    [fromEventTrackingCreate.featureKey]: fromEventTrackingCreate.State;
}

export interface State extends fromRoot.State {
    [featureKey]: EventTrackingTableState;
}

export function reducers(state: EventTrackingTableState | undefined, action: Action) {
    return combineReducers({
        [fromEventTrackingTable.featureKey]: fromEventTrackingTable.reducer,
        [fromEventTrackingEmail.featureKey]: fromEventTrackingEmail.reducer,
        [fromEventTrackingCreate.featureKey]: fromEventTrackingCreate.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, EventTrackingTableState>(featureKey);

/**
 * EventTrackingTable Selectors
 */
export namespace EventTrackingTableSelectors {
    const selectEventTrackingTableState = createSelector(
        selectState,
        state => state[fromEventTrackingTable.featureKey]
    );

    export const selectLoading = createSelector(selectEventTrackingTableState, fromEventTrackingTable.selectLoading);
    export const selectError = createSelector(selectEventTrackingTableState, fromEventTrackingTable.selectError);
    export const selectStatusInformation = createSelector(
        selectEventTrackingTableState,
        fromEventTrackingTable.selectStatusInformation
    );
}

/**
 * EventTracking Email Selectors
 */
export namespace EventTrackingEmailSelectors {
    const selectEventTrackingEmailState = createSelector(
        selectState,
        state => state[fromEventTrackingEmail.featureKey]
    );

    export const selectLoading = createSelector(selectEventTrackingEmailState, fromEventTrackingEmail.selectLoading);
    export const selectEmail = createSelector(selectEventTrackingEmailState, fromEventTrackingEmail.selectEmail);
    export const selectLoadingOwners = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectLoadingOwners
    );
    export const selectLoadingNotes = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectLoadingNotes
    );
    export const selectLoadingAttachments = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectLoadingAttachments
    );
    export const selectUpdatingLabel = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectUpdatingLabel
    );
    export const selectUpdatingOwner = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectUpdatingOwner
    );
    export const selectError = createSelector(selectEventTrackingEmailState, fromEventTrackingEmail.selectError);
    export const selectOwners = createSelector(selectEventTrackingEmailState, fromEventTrackingEmail.selectOwners);
    export const selectNotes = createSelector(selectEventTrackingEmailState, fromEventTrackingEmail.selectNotes);
    export const selectUpdatingNotes = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectUpdatingNotes
    );
    export const selectAttachments = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectAttachments
    );
    export const selectTags = createSelector(selectEventTrackingEmailState, fromEventTrackingEmail.selectTags);
    export const selectTagNames = createSelector(selectTags, tags => tags?.map(tag => tag.tag));
    export const selectLoadingTags = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectLoadingTags
    );
    export const selectUpdatingTags = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectUpdatingTags
    );
    export const selectAudio = createSelector(selectEventTrackingEmailState, fromEventTrackingEmail.selectAudio);
    export const selectAudioPlaying = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectAudioPlaying
    );
    export const selectPreviewUrl = createSelector(
        selectEventTrackingEmailState,
        fromEventTrackingEmail.selectPreviewUrl
    );
    export const selectPatients = createSelector(selectEventTrackingEmailState, fromEventTrackingEmail.selectPatients);
}

/**
 * EventTrackingCreate Selectors
 */
export namespace EventTrackingCreateSelectors {
    const selectEventTrackingCreateState = createSelector(
        selectState,
        state => state[fromEventTrackingCreate.featureKey]
    );

    export const selectLoading = createSelector(selectEventTrackingCreateState, fromEventTrackingCreate.selectLoading);
    export const selectError = createSelector(selectEventTrackingCreateState, fromEventTrackingCreate.selectError);
    export const selectOwners = createSelector(selectEventTrackingCreateState, fromEventTrackingCreate.selectOwners);
    export const selectLoadingOwners = createSelector(
        selectEventTrackingCreateState,
        fromEventTrackingCreate.selectLoadingOwners
    );
}
