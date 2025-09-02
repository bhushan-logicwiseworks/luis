import { createReducer, on } from '@ngrx/store';
import { GetPatientListResponse } from 'app/shared/interfaces/user/onboardingCenter.interface';
import { DrillDownTableActions } from '../actions/drilldown-table.actions';

export const featureKey = 'drilldown-table';

export interface State extends LoadingState {
    patientlist: GetPatientListResponse;
}

interface LoadingState {
    loading?: boolean;
    error?: any;
}

const initialState: State = {
    loading: false,
    error: null,
    patientlist: [],
};

export const reducer = createReducer(
    initialState,
    on(DrillDownTableActions.LoadPatients, state => ({ ...state, loading: true })),
    on(DrillDownTableActions.LoadPatientsSuccess, (state, { patientlist }) => ({
        ...state,
        loading: false,
        patientlist,
    })),
    on(DrillDownTableActions.LoadPatientsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPatients = (state: State) => state.patientlist;
