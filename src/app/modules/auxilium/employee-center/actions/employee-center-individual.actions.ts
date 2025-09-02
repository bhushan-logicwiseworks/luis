import { createAction, props } from '@ngrx/store';
import { EmployeeDisplay } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';

const LoadEmployee = createAction('[EmployeeCenter Table/API] Load Employee');
const LoadEmployeeSuccess = createAction(
    '[EmployeeCenter Table/API] Load Employee Success',
    props<{ employee: EmployeeDisplay }>()
);
const LoadEmployeeFailure = createAction('[EmployeeCenter Table/API] Load Employee Failure', props<{ error: Error }>());

const AddEmployee = createAction('[EmployeeCenter Create/API] Add Employee', props<{ employee: EmployeeDisplay }>());
const AddEmployeeSuccess = createAction(
    '[EmployeeCenter Create/API] Add Employee Success',
    props<{ employee?: EmployeeDisplay; id?: EmployeeDisplay['id'] }>()
);
const AddEmployeeFailure = createAction('[EmployeeCenter Create/API] Add Employee Failure', props<{ error: Error }>());

const UpdateEmployee = createAction(
    '[EmployeeCenter Update/API] Update Employee',
    props<{ employee: EmployeeDisplay }>()
);
const UpdateEmployeeSuccess = createAction(
    '[EmployeeCenter Update/API] Update Employee Success',
    props<{ employee: EmployeeDisplay }>()
);
const UpdateEmployeeFailure = createAction(
    '[EmployeeCenter Update/API] Update Employee Failure',
    props<{ error: Error }>()
);

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());
const RedirectEmployeeCenter = createAction('[Router] Redirect EmployeeCenter');

export const EmployeeCenterIndividualActions = {
    LoadEmployee,
    LoadEmployeeFailure,
    LoadEmployeeSuccess,
    AddEmployee,
    AddEmployeeSuccess,
    AddEmployeeFailure,
    UpdateEmployee,
    UpdateEmployeeSuccess,
    UpdateEmployeeFailure,
    Navigate,
    RedirectEmployeeCenter,
};
