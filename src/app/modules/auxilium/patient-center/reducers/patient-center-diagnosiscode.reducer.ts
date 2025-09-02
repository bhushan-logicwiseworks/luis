import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetDiagnosisCodesListResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscode-list.interface';
import { GetDiagnosisCodesResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscodes.interface';
import { PatientCenterDiagnosiscodeActions } from '../actions/patient-center-diagnosiscode.action';

export const featureKey = 'patient-diagnosiscode';

export interface State extends LoadingState {
    diagnosiscodes: GetDiagnosisCodesResponse | any;
    diagnosisCodesList: GetDiagnosisCodesListResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    diagnosiscodes: [],
    diagnosisCodesList: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscode, state => ({
        ...state,
        loading: true,
        diagnosiscodes: [],
    })),
    on(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscodeSuccess, (state, { diagnosiscodes }) => ({
        ...state,
        loading: false,
        diagnosiscodes,
    })),
    on(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscodeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosisCodesList, state => ({
        ...state,
        loading: true,
        diagnosisCodesList: [],
    })),
    on(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosisCodesListSuccess, (state, { diagnosisCodesList }) => ({
        ...state,
        loading: false,
        diagnosisCodesList,
    })),
    on(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosisCodesListFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscode, state => ({ ...state, loading: true })),
    on(PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscodeSuccess, state => ({ ...state, loading: false })),
    on(PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscodeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectdiagnosiscodesList = (state: State) => state.diagnosiscodes;
export const selectdiagnosiscodesListData = (state: State) => state.diagnosisCodesList;
