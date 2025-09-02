import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientBalance } from 'app/shared/interfaces/auxilium/patient-center/patientbalances.interdace';
import { PatientCenterTableActions } from '../actions/patient-center-table.actions';

export const featureKey = 'patient-center-table';

export interface State extends LoadingState {
    patient: GetPatientResponse | any;
    id: number;
    shortCut: boolean;
    patientBalances: PatientBalance;
}

const initialState: State = {
    loading: false,
    error: null,
    patient: [],
    shortCut: false,
    id: null,
    patientBalances: null,
};

export const reducer = createReducer(
    initialState,

    on(PatientCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(PatientCenterTableActions.LoadPatients, state => ({ ...initialState, loading: true })),
    on(PatientCenterTableActions.LoadPatientsSuccess, (state, { patient }) => ({ ...state, loading: false, patient })),
    on(PatientCenterTableActions.LoadPatientsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientCenterTableActions.AddPatientQuickSave, state => ({ ...state, loading: true })),
    on(PatientCenterTableActions.AddPatientQuickSaveSuccess, (state, { id }) => ({ ...state, loading: false, id })),
    on(PatientCenterTableActions.AddPatientQuickSaveFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterTableActions.PatientSearch, state => ({ ...state, loading: true })),
    on(PatientCenterTableActions.PatientSearchSuccess, (state, { patient }) => ({ ...state, loading: false, patient })),
    on(PatientCenterTableActions.PatientSearchFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientCenterTableActions.LoadPatientBalance, state => ({ ...initialState, loading: true })),
    on(PatientCenterTableActions.LoadPatientBalanceSuccess, (state, { patientBalances }) => ({
        ...state,
        loading: false,
        patientBalances,
    })),
    on(PatientCenterTableActions.LoadPatientBalanceFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterTableActions.isShortCut, (state, { shortCut }) => ({ ...state, loading: false, shortCut }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPatients = (state: State) => state.patient;
export const selectPatient = (state: State) => state.id;
export const selectPatientSearchShortcut = (state: State) => state.shortCut;
export const selectPatientBalances = (state: State) => state.patientBalances;
