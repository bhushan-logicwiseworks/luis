import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientPhysicianList } from 'app/shared/interfaces/auxilium/patient-center/patient-physician-list.interface';
import { GetPhysiciansResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians.interface';
import { PatientCenterPhysiciansActions } from '../actions/patient-center-physicians.action';

export const featureKey = 'patient-physians';

export interface State extends LoadingState {
    physicians: GetPhysiciansResponse | any;
    physiciansList: PatientPhysicianList | any;
}

const initialState: State = {
    loading: false,
    error: null,
    physicians: [],
    physiciansList: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientCenterPhysiciansActions.LoadPatientPhysicians, state => ({ ...state, loading: true, physicians: [] })),
    on(PatientCenterPhysiciansActions.LoadPatientPhysiciansSuccess, (state, { physicians }) => ({
        ...state,
        loading: false,
        physicians,
    })),
    on(PatientCenterPhysiciansActions.LoadPatientPhysiciansFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterPhysiciansActions.AddPatientPhysicians, state => ({ ...state, loading: true })),
    on(PatientCenterPhysiciansActions.AddPatientPhysiciansSuccess, state => ({ ...state, loading: false })),
    on(PatientCenterPhysiciansActions.AddPatientPhysiciansFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterPhysiciansActions.LoadPatientPhysiciansList, state => ({
        ...state,
        loading: true,
        physiciansList: [],
    })),
    on(PatientCenterPhysiciansActions.LoadPatientPhysiciansListSuccess, (state, { physiciansList }) => ({
        ...state,
        loading: false,
        physiciansList,
    })),
    on(PatientCenterPhysiciansActions.LoadPatientPhysiciansListFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPhysicians = (state: State) => state.physicians;
export const selectPhysiciansList = (state: State) => state.physiciansList;
