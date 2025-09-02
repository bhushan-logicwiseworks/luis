import { createAction, props } from '@ngrx/store';
import {
    EmployeeDisplay,
    GetEmployeeResponse,
} from 'app/shared/interfaces/auxilium/employee-center/employee.interface';

const LoadEmployees = createAction('[EmployeeCenter Table/API] Load Employee', props<{ filter: string }>());
const LoadEmployeesSuccess = createAction(
    '[EmployeeCenter Table/API] Load Employee Success',
    props<{ employees: GetEmployeeResponse }>()
);
const LoadEmployeesFailure = createAction(
    '[EmployeeCenter Table/API] Load Employee Failure',
    props<{ error: Error }>()
);

const DeleteEmployee = createAction('[EmployeeCenter Delete/API] Delete Employee', props<{ dto: EmployeeDisplay }>());
const DeleteEmployeeSuccess = createAction('[EmployeeCenter Delete/API] Delete Employee Success');
const DeleteEmployeeFailure = createAction(
    '[EmployeeCenter Delete/API] Delete Employee Failure',
    props<{ error: Error }>()
);

const EmployeeSearch = createAction(
    '[EmployeeCenter Table/API] Employee Search',
    props<{ employeeSearch: EmployeeDisplay }>()
);
const EmployeeSearchSuccess = createAction(
    '[EmployeeCenter Table/API] Employee Search Success',
    props<{ employee: EmployeeDisplay[] }>()
);
const EmployeeSearchFailure = createAction(
    '[EmployeeCenter Table/API] Employee Search Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[EmployeeCenter Table/API] Refresh');
const ResetState = createAction('[EmployeeCenter Table/API] Reset Employee State');

export const EmployeeCenterTableActions = {
    LoadEmployees,
    LoadEmployeesSuccess,
    LoadEmployeesFailure,
    DeleteEmployee,
    DeleteEmployeeSuccess,
    DeleteEmployeeFailure,
    EmployeeSearch,
    EmployeeSearchSuccess,
    EmployeeSearchFailure,
    Refresh,
    ResetState,
};
