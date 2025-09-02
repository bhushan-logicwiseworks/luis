import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientPayorsList } from 'app/shared/interfaces/auxilium/patient-center/patient-payors-list.interface';
import {
    GetPatientResponse,
    PatientPayors,
} from 'app/shared/interfaces/auxilium/patient-center/patient-payors.interface';
import { PatientCenterPayorsActions } from '../actions/patient-center-payors.action';

export const featureKey = 'patient-payors';

export interface State extends LoadingState {
    payors: GetPatientResponse | any;
    payor: PatientPayors | any;
    payorsList: PatientPayorsList | any;
    loadingPayor: boolean;
}

const initialState: State = {
    loading: false,
    loadingPayor: false,
    error: null,
    payors: [],
    payor: null,
    payorsList: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientCenterPayorsActions.LoadPatientPayors, state => ({ ...state, loading: true, payors: [] })),
    on(PatientCenterPayorsActions.LoadPatientPayorsSuccess, (state, { payors }) => ({
        ...state,
        loading: false,
        payors,
    })),
    on(PatientCenterPayorsActions.LoadPatientPayorsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterPayorsActions.LoadPatientPayor, state => ({ ...state, loadingPayor: true, payor: {} })),
    on(PatientCenterPayorsActions.LoadPatientPayorSuccess, (state, { payor }) => ({
        ...state,
        loadingPayor: false,
        payor,
    })),
    on(PatientCenterPayorsActions.LoadPatientPayorFailure, (state, { error }) => ({
        ...state,
        loadingPayor: false,
        error,
    })),

    on(PatientCenterPayorsActions.LoadPatientPayorsList, state => ({ ...state, loading: true, payorsList: [] })),
    on(PatientCenterPayorsActions.LoadPatientPayorsListSuccess, (state, { payorsList }) => ({
        ...state,
        loading: false,
        payorsList,
    })),
    on(PatientCenterPayorsActions.LoadPatientPayorsListFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterPayorsActions.AddPatientPayors, state => ({ ...state, loading: true })),
    on(PatientCenterPayorsActions.AddPatientPayorsSuccess, state => ({ ...state, loading: false })),
    on(PatientCenterPayorsActions.AddPatientPayorsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectLoadingPayor = (state: State) => state.loadingPayor;
export const selectError = (state: State) => state.error;
export const selectPayors = (state: State) => state.payors;
export const selectPayor = (state: State) => state.payor;
export const selectPayorsList = (state: State) => state.payorsList;
