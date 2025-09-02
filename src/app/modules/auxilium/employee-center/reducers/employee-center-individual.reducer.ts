import { createReducer, on } from '@ngrx/store';
import {
    EmployeeDisplay,
    GetEmployeeResponse,
} from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { EmployeeCenterIndividualActions } from '../actions/employee-center-individual.actions';

export const featureKey = 'employee-center-individual';

export interface State extends LoadingState {
    employees: GetEmployeeResponse;
    employee: EmployeeDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    employee: null,
    employees: [],
};

export const reducer = createReducer(
    initialState,

    on(EmployeeCenterIndividualActions.LoadEmployee, state => ({ ...state, loading: true })),
    on(EmployeeCenterIndividualActions.LoadEmployeeSuccess, (state, { employee }) => ({
        ...state,
        loading: false,
        employee,
    })),
    on(EmployeeCenterIndividualActions.LoadEmployeeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(EmployeeCenterIndividualActions.AddEmployee, state => ({ ...state, loading: true })),
    on(EmployeeCenterIndividualActions.AddEmployeeSuccess, (state, { id }) => ({ ...state, loading: false, id })),
    on(EmployeeCenterIndividualActions.AddEmployeeFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectEmployee = (state: State) => state.employee;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.employees;
