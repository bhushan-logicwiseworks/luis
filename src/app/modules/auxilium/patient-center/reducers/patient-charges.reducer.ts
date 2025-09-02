import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientChargesById } from '../../../../shared/interfaces/auxilium/patient-center/patient-charges-by-id.interface';
import { PatientCharges } from '../../../../shared/interfaces/auxilium/patient-center/patient-charges.interface';
import { PatientChargesActions } from '../actions/patient-charges.action';

export const patientsFeatureKey = 'patient-charges';

export interface State extends LoadingState {
    data: PatientCharges[];
    chargesData: PatientChargesById;
}

const initialState: State = {
    loading: false,
    error: null,
    data: [],
    chargesData: null,
};

export const reducer = createReducer(
    initialState,
    on(PatientChargesActions.LoadCharges, state => ({
        ...state,
        loading: true,
        error: null,
        data: [],
    })),
    on(PatientChargesActions.LoadChargesSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        data,
    })),
    on(PatientChargesActions.LoadChargesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(PatientChargesActions.LoadChargesById, state => ({
        ...state,
        loading: true,
        error: null,
        chargesData: null,
    })),
    on(PatientChargesActions.LoadChargesByIdSuccess, (state, { chargesData }) => ({
        ...state,
        loading: false,
        chargesData,
    })),
    on(PatientChargesActions.LoadChargesByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPatientCharges = (state: State) => state.data;
export const selectPatientChargesById = (state: State) => state.chargesData;
