import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientResponse, PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import * as PatientActions from '../actions/patient.actions';

export const featureKey = 'patient-center-individual';

export interface State extends LoadingState {
    patients: GetPatientResponse;
    patient: PatientEntity;
}

const initialState: State = {
    loading: false,
    error: null,
    patient: null,
    patients: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientActions.loadPatients, state => ({ ...state, loading: true })),
    on(PatientActions.loadPatientsSuccess, (state, { patient }) => ({ ...state, loading: false, patient })),
    on(PatientActions.loadPatientsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectSalesRep = (state: State) => state.patient;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.patients;
