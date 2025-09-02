import { createAction, props } from '@ngrx/store';
import { GetEmployeeResponse } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';

const LoadEmployees = createAction('[Team Center/API] Load Employee', props<{ filter: string }>());
const LoadEmployeesSuccess = createAction(
    '[Team Center/API] Load Employee Success',
    props<{ employees: GetEmployeeResponse }>()
);
const LoadEmployeesFailure = createAction('[Team Center/API] Load Employee Failure', props<{ error: Error }>());

const Refresh = createAction('[Team Center/API] Refresh');
const ResetState = createAction('[Team Center/API] Reset Employee State');

export const TeamCenterTableActions = {
    LoadEmployees,
    LoadEmployeesSuccess,
    LoadEmployeesFailure,
    Refresh,
    ResetState,
};
