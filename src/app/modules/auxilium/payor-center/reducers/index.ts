import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromPayroCenterTable from './payor-center-table.reducer';
import * as fromPayroCenterIndividual from './payor-demographics.reducer';
import * as fromPayroCenterDetails from './payor-details.reducer';

export const featureKey = 'payor-center';

export interface PayorsState {
    [fromPayroCenterTable.featureKey]: fromPayroCenterTable.State;
    [fromPayroCenterDetails.featureKey]: fromPayroCenterDetails.State;
    [fromPayroCenterIndividual.featureKey]: fromPayroCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: PayorsState;
}
export function reducers(state: PayorsState | undefined, action: Action) {
    return combineReducers({
        [fromPayroCenterTable.featureKey]: fromPayroCenterTable.reducer,
        [fromPayroCenterDetails.featureKey]: fromPayroCenterDetails.reducer,
        [fromPayroCenterIndividual.featureKey]: fromPayroCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, PayorsState>(featureKey);

/**
 * PayorCenter Table Selectors
 */
export namespace PayorCenterTableSelectors {
    const selectPayorCenterTableState = createSelector(selectState, state => state[fromPayroCenterTable.featureKey]);

    export const selectPayor = createSelector(selectPayorCenterTableState, fromPayroCenterTable.selectPayor);
    export const selectLoading = createSelector(selectPayorCenterTableState, fromPayroCenterTable.selectLoading);
    export const selectError = createSelector(selectPayorCenterTableState, fromPayroCenterTable.selectError);
    export const selectPayorDetails = createSelector(
        selectPayorCenterTableState,
        fromPayroCenterTable.selectPayorDetails
    );
    export const selectPayorById = createSelector(selectPayorCenterTableState, fromPayroCenterTable.selectPayorById);
    export const selectPayorOverrides = createSelector(
        selectPayorCenterTableState,
        fromPayroCenterTable.selectPayorOverrides
    );
}

/**
 * PayorCenter Details Selectors
 */
export namespace PayorCenterDetailSelectors {
    export const selectPayorCenterDetailsState = createSelector(
        selectState,
        state => state[fromPayroCenterDetails.featureKey]
    );

    export const selectPayorPriceCode = createSelector(
        selectPayorCenterDetailsState,
        fromPayroCenterDetails.selectPayorPriceCode
    );
    export const selectPayorPrimaryBillForm = createSelector(
        selectPayorCenterDetailsState,
        fromPayroCenterDetails.selectPayorPrimaryBillForm
    );
    export const selectPayorType = createSelector(
        selectPayorCenterDetailsState,
        fromPayroCenterDetails.selectPayorType
    );
    export const selectPayorBoxOne = createSelector(
        selectPayorCenterDetailsState,
        fromPayroCenterDetails.selectPayorBoxOne
    );
    export const selectPayorFinancialClass = createSelector(
        selectPayorCenterDetailsState,
        fromPayroCenterDetails.selectPayorFinancialClass
    );
    export const selectPayorClaimIndicator = createSelector(
        selectPayorCenterDetailsState,
        fromPayroCenterDetails.selectPayorClaimIndicator
    );
    export const selectPayorClearinghouse = createSelector(
        selectPayorCenterDetailsState,
        fromPayroCenterDetails.selectPayorClearinghouse
    );
    export const selectPatientSalesRep = createSelector(
        selectPayorCenterDetailsState,
        fromPayroCenterDetails.selectPatientSalesRep
    );
    export const selectLoading = createSelector(selectPayorCenterDetailsState, fromPayroCenterDetails.selectLoading);
    export const selectError = createSelector(selectPayorCenterDetailsState, fromPayroCenterDetails.selectError);
}

/**
 * PhysicianCenter Individual Selectors
 */
export namespace PayorCenterIndividualSelectors {
    const selectPayorCenterIndividualState = createSelector(
        selectState,
        state => state[fromPayroCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectPayorCenterIndividualState,
        fromPayroCenterIndividual.selectLoading
    );
    export const selectError = createSelector(selectPayorCenterIndividualState, fromPayroCenterIndividual.selectError);
    export const selectPatientCityState = createSelector(
        selectPayorCenterIndividualState,
        fromPayroCenterIndividual.selectPatientCityState
    );
    export const selectBranch = createSelector(
        selectPayorCenterIndividualState,
        fromPayroCenterIndividual.selectBranch
    );
}
