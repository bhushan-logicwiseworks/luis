import { createAction, props } from '@ngrx/store';
import {
    EmployeeSecurityDisplay,
    GetEmployeeSecurityResponse,
} from 'app/shared/interfaces/auxilium/employee-center/employee-center-security.interface';
import { Analytics } from 'app/shared/interfaces/user/analytics';

const getEmployeeAccess = createAction('[Employee Security/API] Get Employee Access', props<{ id: number }>());
const getEmployeeAccessSuccess = createAction(
    '[Employee Security/API] Get Employee Access Success',
    props<{ employeeAccess: GetEmployeeSecurityResponse }>()
);
const getEmployeeAccessFailure = createAction(
    '[Employee Security/API] Get Employee Access Failure',
    props<{ error: Error }>()
);

const saveEmployeeAccess = createAction(
    '[Employee Security/API] Save Employee Access',
    props<{ employeeAccess: EmployeeSecurityDisplay }>()
);
const saveEmployeeAccessSuccess = createAction('[Employee Security/API] Save Employee Access Success');
const saveEmployeeAccessFailure = createAction(
    '[Employee Security/API] Save Employee Access Failure',
    props<{ error: Error }>()
);

const deleteEmployeeAccess = createAction(
    '[Employee Security/API] Delete Employee Access',
    props<{ employeeData: EmployeeSecurityDisplay }>()
);
const deleteEmployeeAccessSuccess = createAction(
    '[Employee Security/API] Delete Employee Access Success',
    props<{ employeeData: GetEmployeeSecurityResponse }>()
);
const deleteEmployeeAccessFailure = createAction(
    '[Employee Security/API] Delete Employee Access Failure',
    props<{ error: Error }>()
);

const AddSecurity = createAction('[Employee Security/API] Add Security', props<{ data: any }>());
const AddSecuritySuccess = createAction(
    '[Employee Security/API] Add Security Success',
    props<{ security: Analytics }>()
);
const AddSecurityFailure = createAction('[Employee Security/API] Add Security Failure', props<{ error: Error }>());

const AddNewAcess = createAction('[Employee Security/API] Add New Acess', props<{ addAccessData: any }>());
const AddNewAcessSuccess = createAction('[Employee Security/API] Add New Acess Success');
const AddNewAcessFailure = createAction('[Employee Security/API] Add New Acess Failure', props<{ error: Error }>());

const Refresh = createAction('[Employee Security/API] Refresh');

export const EmployeeSecurityActions = {
    AddSecurity,
    AddSecuritySuccess,
    AddSecurityFailure,
    getEmployeeAccess,
    getEmployeeAccessSuccess,
    getEmployeeAccessFailure,
    saveEmployeeAccess,
    saveEmployeeAccessSuccess,
    saveEmployeeAccessFailure,
    AddNewAcess,
    AddNewAcessSuccess,
    AddNewAcessFailure,
    deleteEmployeeAccess,
    deleteEmployeeAccessSuccess,
    deleteEmployeeAccessFailure,

    Refresh,
};
