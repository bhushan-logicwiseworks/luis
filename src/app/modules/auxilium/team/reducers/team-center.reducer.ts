import { createReducer, on } from '@ngrx/store';
import { GetEmployeeResponse } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { TeamCenterTableActions } from '../actions/team-center.actions';

export const featureKey = 'team-center';

export interface State extends LoadingState {
    employees: GetEmployeeResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    employees: [],
};

export const reducer = createReducer(
    initialState,

    on(TeamCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(TeamCenterTableActions.LoadEmployees, state => ({ ...initialState, loading: true })),
    on(TeamCenterTableActions.LoadEmployeesSuccess, (state, { employees }) => ({
        ...state,
        loading: false,
        employees,
    })),
    on(TeamCenterTableActions.LoadEmployeesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectEmployees = (state: State) => state.employees;
