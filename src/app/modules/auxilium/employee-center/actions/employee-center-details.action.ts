import { createAction, props } from '@ngrx/store';
import { EmployeeDisplay } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';

const ResetState = createAction('[EmployeeCenter Details/API] Reset Employee Details State');

const LoadEmployeeDetails = createAction(
    '[EmployeeCenter Details/API] Load Employee Details ',
    props<{ id: number }>()
);
const LoadEmployeeDetailsSuccess = createAction(
    '[EmployeeCenter Details/API] Load Employee Details Success',
    props<{ employee: EmployeeDisplay[] }>()
);
const LoadEmployeeDetailsFailure = createAction(
    '[EmployeeCenter Details/API] Load Employee Details Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[EmployeeCenter Details/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[EmployeeCenter Details/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[EmployeeCenter Details/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[EmployeeCenter Deatils/API] Refresh');

export const EmployeeCenterDeatilsActions = {
    LoadEmployeeDetails,
    LoadEmployeeDetailsSuccess,
    LoadEmployeeDetailsFailure,

    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,

    Refresh,
    ResetState,
};
