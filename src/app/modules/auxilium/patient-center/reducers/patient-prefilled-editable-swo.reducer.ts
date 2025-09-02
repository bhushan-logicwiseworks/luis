import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientSWOInfo } from 'app/shared/interfaces/auxilium/patient-center/patient-prefilled-editable-swo.interface';
import { PatientSWOActions } from '../actions/patient-prefilled-editable-swo.action';

export const featureKey = 'patient-swo';

export interface State extends LoadingState {
    patientSWOInfo: PatientSWOInfo;
}

const initialState: State = {
    loading: false,
    error: null,
    patientSWOInfo: null,
};

export const reducer = createReducer(
    initialState,
    on(PatientSWOActions.LoadPatientSWO, state => ({ ...state, loading: true, patientSWOInfo: null })),
    on(PatientSWOActions.LoadPatientSWOSuccess, (state, { patientSWOInfo }) => ({
        ...state,
        loading: false,
        patientSWOInfo,
    })),
    on(PatientSWOActions.LoadPatientSWOFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientSWOActions.UpdatePatientSWO, state => ({ ...state, loading: true })),
    on(PatientSWOActions.UpdatePatientSWOSuccess, state => ({ ...state, loading: false })),
    on(PatientSWOActions.UpdatePatientSWOFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPatientSWOInfo = (state: State) => state.patientSWOInfo;
