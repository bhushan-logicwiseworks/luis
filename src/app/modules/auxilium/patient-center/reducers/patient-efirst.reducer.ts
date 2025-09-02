import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientEFirstActions } from '../actions/patient-efirst.actions';

export const featureKey = 'patient-efirst';

export interface State extends LoadingState {
    efirsts: any;
}

const initialState: State = {
    loading: false,
    error: null,
    efirsts: null,
};

export const reducer = createReducer(
    initialState,
    on(PatientEFirstActions.LoadEFirst, state => ({ ...state, loading: true })),
    on(PatientEFirstActions.LoadEFirstSuccess, (state, { efirsts }) => ({ ...state, loading: false, efirsts })),
    on(PatientEFirstActions.LoadEFirstFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPatientEFirst = (state: State) => state.efirsts;
