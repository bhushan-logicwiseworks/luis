import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromReferralCenterIndividual from './referral-center-individual.reducer';
import * as fromReferralCenterTable from './referral-center-table.reducer';

export const featureKey = 'referral-center-new';

export interface ReferralCenterTableState {
    [fromReferralCenterTable.featureKey]: fromReferralCenterTable.State;
    [fromReferralCenterIndividual.featureKey]: fromReferralCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ReferralCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: ReferralCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromReferralCenterTable.featureKey]: fromReferralCenterTable.reducer,
        [fromReferralCenterIndividual.featureKey]: fromReferralCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ReferralCenterTableState>(featureKey);

/**
 * ReferralCenter Table Selectors
 */
export namespace ReferralCenterTableSelectors {
    const selectReferralCenterTableState = createSelector(
        selectState,
        state => state[fromReferralCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectReferralCenterTableState, fromReferralCenterTable.selectLoading);
    export const selectError = createSelector(selectReferralCenterTableState, fromReferralCenterTable.selectError);
    export const selectAll = createSelector(selectReferralCenterTableState, fromReferralCenterTable.selectReferrals);
    export const selectActive = createSelector(selectReferralCenterTableState, fromReferralCenterTable.selectsalesreps);
    export const selectZipCode = createSelector(selectReferralCenterTableState, fromReferralCenterTable.selectZipCode);
    export const selectReferralById = createSelector(
        selectReferralCenterTableState,
        fromReferralCenterTable.selectReferralById
    );
}

/**
 * ReferralCenter Individual Selectors
 */
export namespace ReferralCenterIndividualSelectors {
    const selectReferralCenterIndividualState = createSelector(
        selectState,
        state => state[fromReferralCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectReferralCenterIndividualState,
        fromReferralCenterIndividual.selectLoading
    );
    export const selectEmail = createSelector(
        selectReferralCenterIndividualState,
        fromReferralCenterIndividual.selectSalesRep
    );
    export const selectError = createSelector(
        selectReferralCenterIndividualState,
        fromReferralCenterIndividual.selectError
    );
}
