import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import { EmployeeDemographicsActions } from '../actions/employee-center-demographics.action';

export const featureKey = 'employee-demographics';

export interface State extends LoadingState {
    demographics: PatientEntity;
}

const initialState: State = {
    loading: false,
    error: null,
    demographics: null,
};

export const reducer = createReducer(
    initialState,

    on(EmployeeDemographicsActions.AddEmployeeDemographics, state => ({ ...state, loading: true })),
    on(EmployeeDemographicsActions.AddEmployeeDemographicsSuccess, (state, { demographics }) => ({
        ...state,
        loading: false,
        demographics,
    })),
    on(EmployeeDemographicsActions.AddEmployeeDemographicsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectdemographics = (state: State) => state.demographics;
