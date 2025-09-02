import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromIdentityCenterIndividual from './identity-center-individual.reducer';
import * as fromIdentityCenterTable from './identity-center-table.reducer';

export const featureKey = 'identity-center';

export interface IdentityCenterTableState {
    [fromIdentityCenterTable.featureKey]: fromIdentityCenterTable.State;
    [fromIdentityCenterIndividual.featureKey]: fromIdentityCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: IdentityCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: IdentityCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromIdentityCenterTable.featureKey]: fromIdentityCenterTable.reducer,
        [fromIdentityCenterIndividual.featureKey]: fromIdentityCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, IdentityCenterTableState>(featureKey);

/**
 * IdentityCenter Table Selectors
 */
export namespace IdentityCenterTableSelectors {
    const selectIdentityCenterTableState = createSelector(
        selectState,
        state => state[fromIdentityCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectIdentityCenterTableState, fromIdentityCenterTable.selectLoading);
    export const selectError = createSelector(selectIdentityCenterTableState, fromIdentityCenterTable.selectError);
    export const selectUsers = createSelector(selectIdentityCenterTableState, fromIdentityCenterTable.selectUsers);
}

/**
 * IdentityCenter Individual Selectors
 */
export namespace IdentityCenterIndividualSelectors {
    const selectIdentityCenterIndividualState = createSelector(
        selectState,
        state => state[fromIdentityCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectIdentityCenterIndividualState,
        fromIdentityCenterIndividual.selectLoading
    );
    export const selectError = createSelector(
        selectIdentityCenterIndividualState,
        fromIdentityCenterIndividual.selectError
    );
    export const selectUser = createSelector(
        selectIdentityCenterIndividualState,
        fromIdentityCenterIndividual.selectUser
    );
}
