import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { EmployeeSecurityActions } from '../actions/employee-center-security.action';

export const featureKey = 'security-demographics';

export interface State extends LoadingState {
    security: any;
    employeeAccess: any;
}

const initialState: State = {
    loading: false,
    error: null,
    security: null,
    employeeAccess: null,
};

export const reducer = createReducer(
    initialState,

    on(EmployeeSecurityActions.getEmployeeAccess, state => ({ ...state, loading: true })),
    on(EmployeeSecurityActions.getEmployeeAccessSuccess, (state, { employeeAccess }) => ({
        ...state,
        loading: false,
        employeeAccess,
    })),
    on(EmployeeSecurityActions.getEmployeeAccessFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(EmployeeSecurityActions.saveEmployeeAccess, state => ({ ...state, loading: true })),
    on(EmployeeSecurityActions.saveEmployeeAccessSuccess, state => ({ ...state, loading: false })),
    on(EmployeeSecurityActions.saveEmployeeAccessFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(EmployeeSecurityActions.deleteEmployeeAccess, state => ({ ...state, loading: true })),
    on(EmployeeSecurityActions.deleteEmployeeAccessSuccess, state => ({ ...state, loading: false })),
    on(EmployeeSecurityActions.deleteEmployeeAccessFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(EmployeeSecurityActions.AddSecurity, state => ({ ...state, loading: true })),
    on(EmployeeSecurityActions.AddSecuritySuccess, (state, { security }) => ({ ...state, loading: false, security })),
    on(EmployeeSecurityActions.AddSecurityFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectsecurity = (state: State) => state.security;
export const selectEmployeeAccess = (state: any) => state.employeeAccess;
