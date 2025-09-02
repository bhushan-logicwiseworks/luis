import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';

const AddPayorDemographics = createAction('[Payor Demographics/API] Add Payor Demographics', props<{ payor: Payor }>());
const AddPayorDemographicsSuccess = createAction(
    '[Payor Demographics/API] Add Payor Demographics Success',
    props<{ payorDemographics: Payor }>()
);
const AddPayorDemographicsFailure = createAction(
    '[Payor Demographics/API] Add Payor Demographics Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[Payor Demographics/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[Payor Demographics/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[Payor Demographics/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const LoadBranchDropDown = createAction('[Payor Demographics/API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[Payor Demographics/API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction(
    '[Payor Demographics/API] Load Branch DropDown Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Payor ContactType/API] Refresh');

export const PayorDemographicsActions = {
    AddPayorDemographics,
    AddPayorDemographicsSuccess,
    AddPayorDemographicsFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,
    Refresh,
};
