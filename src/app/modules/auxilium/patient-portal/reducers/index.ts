import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromPatientPortalIndividual from './patient-portal-individual.reducer';
import * as fromPatientPortalTable from './patient-portal-table.reducer';

export const featureKey = 'patient-portal';

export interface PatientPortalTableState {
    [fromPatientPortalTable.featureKey]: fromPatientPortalTable.State;
    [fromPatientPortalIndividual.featureKey]: fromPatientPortalIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: PatientPortalTableState;
}

/**
 * Reducers
 */
export function reducers(state: PatientPortalTableState | undefined, action: Action) {
    return combineReducers({
        [fromPatientPortalTable.featureKey]: fromPatientPortalTable.reducer,
        [fromPatientPortalIndividual.featureKey]: fromPatientPortalIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, PatientPortalTableState>(featureKey);

/**
 * PatientPortal Table Selectors
 */
export namespace PatientPortalTableSelectors {
    const selectPatientPortalTableState = createSelector(
        selectState,
        state => state[fromPatientPortalTable.featureKey]
    );

    export const selectLoading = createSelector(selectPatientPortalTableState, fromPatientPortalTable.selectLoading);
    export const selectError = createSelector(selectPatientPortalTableState, fromPatientPortalTable.selectError);
    export const selectUsers = createSelector(selectPatientPortalTableState, fromPatientPortalTable.selectUsers);
}

/**
 * PatientPortal Individual Selectors
 */
export namespace PatientPortalIndividualSelectors {
    const selectPatientPortalIndividualState = createSelector(
        selectState,
        state => state[fromPatientPortalIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectPatientPortalIndividualState,
        fromPatientPortalIndividual.selectLoading
    );
    export const selectError = createSelector(
        selectPatientPortalIndividualState,
        fromPatientPortalIndividual.selectError
    );
}
