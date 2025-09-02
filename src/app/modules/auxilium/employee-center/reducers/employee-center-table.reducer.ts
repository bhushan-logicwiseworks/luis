import { createReducer, on } from '@ngrx/store';
import { GetEmployeeResponse } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { EmployeeCenterTableActions } from '../actions/employee-center-table.actions';

export const featureKey = 'employee-center-table';

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

    on(EmployeeCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(EmployeeCenterTableActions.LoadEmployees, state => ({ ...initialState, loading: true })),
    on(EmployeeCenterTableActions.LoadEmployeesSuccess, (state, { employees }) => ({
        ...state,
        loading: false,
        employees,
    })),
    on(EmployeeCenterTableActions.LoadEmployeesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(EmployeeCenterTableActions.EmployeeSearch, state => ({ ...state, loading: true })),
    on(EmployeeCenterTableActions.EmployeeSearchSuccess, (state, { employee }) => ({
        ...state,
        loading: false,
        employees: employee,
    })),
    on(EmployeeCenterTableActions.EmployeeSearchFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectEmployees = (state: State) => state.employees;
