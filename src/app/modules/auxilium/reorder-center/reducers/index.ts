import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromReorderCenterTable from './reorder-center-table.reducer';
import * as fromReorderPatient from './reorder-patient.reducer';

export const featureKey = 'reorder-center';

export interface ReorderCenterTableState {
    [fromReorderCenterTable.featureKey]: fromReorderCenterTable.State;
    [fromReorderPatient.reorderPatientFeatureKey]: fromReorderPatient.ReorderPatientState;
}

export interface State extends fromRoot.State {
    [featureKey]: ReorderCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: ReorderCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromReorderCenterTable.featureKey]: fromReorderCenterTable.reducer,
        [fromReorderPatient.reorderPatientFeatureKey]: fromReorderPatient.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ReorderCenterTableState>(featureKey);

/**
 * Reorder Center Table Selectors
 */
export namespace ReorderCenterTableSelectors {
    const selectReorderCenterTableState = createSelector(
        selectState,
        state => state[fromReorderCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectReorderCenterTableState, fromReorderCenterTable.selectLoading);
    export const selectError = createSelector(selectReorderCenterTableState, fromReorderCenterTable.selectError);
    export const selectReorders = createSelector(selectReorderCenterTableState, fromReorderCenterTable.selectReorders);
}

export namespace ReorderPatientSelectors {
    const selectReorderCenterPatientState = createSelector(
        selectState,
        state => state[fromReorderPatient.reorderPatientFeatureKey]
    );

    export const selectLoading = createSelector(selectReorderCenterPatientState, state => state.loading);
    export const selectError = createSelector(selectReorderCenterPatientState, state => state.error);
    export const selectPatient = createSelector(selectReorderCenterPatientState, state => state.patient);
    export const selectInsurance = createSelector(selectReorderCenterPatientState, state => state.insurance);
    export const selectAlternateShipToAddresses = createSelector(
        selectReorderCenterPatientState,
        state => state.alternateShipToAddress
    );
    export const selectDoctor = createSelector(selectReorderCenterPatientState, state => state.doctor);
    export const selectDates = createSelector(selectReorderCenterPatientState, state => state.datesEtc);
    export const selectPatientNotes = createSelector(selectReorderCenterPatientState, state => state.patientNotes);
    export const selectProducts = createSelector(selectReorderCenterPatientState, state => state.reorderProducts);
    export const selectPrismAuthorization = createSelector(
        selectReorderCenterPatientState,
        state => state.prismAuthorization
    );
}
