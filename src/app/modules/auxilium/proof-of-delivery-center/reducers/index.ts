import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromProofOfDeliveryIndividual from './proof-of-delivery-individual.reducer';
import * as fromProofOfDeliveryTable from './proof-of-delivery-table.reducer';

export const featureKey = 'proof-of-delivery';

export interface ProofOfDeliveryTableState {
    [fromProofOfDeliveryTable.featureKey]: fromProofOfDeliveryTable.State;
    [fromProofOfDeliveryIndividual.featureKey]: fromProofOfDeliveryIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ProofOfDeliveryTableState;
}

/**
 * Reducers
 */
export function reducers(state: ProofOfDeliveryTableState | undefined, action: Action) {
    return combineReducers({
        [fromProofOfDeliveryTable.featureKey]: fromProofOfDeliveryTable.reducer,
        [fromProofOfDeliveryIndividual.featureKey]: fromProofOfDeliveryIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ProofOfDeliveryTableState>(featureKey);

/**
 * PatientPortal Table Selectors
 */
export namespace ProofOfDeliveryTableSelectors {
    const selectProofOfDeliveryTableState = createSelector(
        selectState,
        state => state[fromProofOfDeliveryTable.featureKey]
    );

    export const selectLoading = createSelector(
        selectProofOfDeliveryTableState,
        fromProofOfDeliveryTable.selectLoading
    );
    export const selectError = createSelector(selectProofOfDeliveryTableState, fromProofOfDeliveryTable.selectError);
    export const selectUsers = createSelector(
        selectProofOfDeliveryTableState,
        fromProofOfDeliveryTable.selectProofOfDelivery
    );
}

/**
 * PatientPortal Individual Selectors
 */
export namespace ProofOfDeliveryIndividualSelectors {
    const selectPatientPortalIndividualState = createSelector(
        selectState,
        state => state[fromProofOfDeliveryIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectPatientPortalIndividualState,
        fromProofOfDeliveryIndividual.selectLoading
    );
    export const selectError = createSelector(
        selectPatientPortalIndividualState,
        fromProofOfDeliveryIndividual.selectError
    );
}
