import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import {
    GetLicenseInfoResponse,
    LicenseInfo,
} from 'app/shared/interfaces/auxilium/license-center/license-info-interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';

const LoadLicenses = createAction('[LicenseCenter Table/API] Load Licenses', props<{ filter: string }>());
const LoadLicensesSuccess = createAction(
    '[LicenseCenter Table/API] Load Licenses Success',
    props<{ licenses: GetLicenseInfoResponse }>()
);
const LoadLicensesFailure = createAction('[LicenseCenter Table/API] Load Licenses Failure', props<{ error: Error }>());

const LoadLicensesById = createAction('[LicenseCenter API] Load Licenses BY Id', props<{ id: string }>());
const LoadLicensesByIdSuccess = createAction(
    '[LicenseCenter API] Load Licenses BY Id Success',
    props<{ License: LicenseInfo }>()
);
const LoadLicensesByIdFailure = createAction(
    '[LicenseCenter API] Load Licenses BY Id Failure',
    props<{ error: Error }>()
);

const DeleteLicense = createAction('[LicenseCenter Delete/API] Delete Licenses', props<{ dto: LicenseInfo }>());
const DeleteLicenseSuccess = createAction('[LicenseCenter Delete/API] Delete Licenses Success');
const DeleteLicenseFailure = createAction(
    '[LicenseCenter Delete/API] Delete Licenses Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[LicenseCenter Table/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[LicenseCenter Table/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[LicenseCenter Table/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const AddLicense = createAction('[LicenseCenter Create/API] Add Licenses', props<{ license: LicenseInfo }>());
const AddLicenseSuccess = createAction('[LicenseCenter Create/API] Add Licenses Success');
const AddLicenseFailure = createAction('[LicenseCenter Create/API] Add Licenses Failure', props<{ error: Error }>());

const LoadBranchDropDown = createAction('[LicenseCenter API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[LicenseCenter API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction(
    '[LicenseCenter API] Load Branch DropDown Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[LicenseCenter Table/API] Refresh');
const ResetState = createAction('[LicenseCenter Table/API] Reset LicenseCenter');
const ResetStateZipCode = createAction('[LicenseCenter Table/API] Reset ResetStateZipCode');

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());
const RedirectToLicenseDetails = createAction('[Router] Redirect License Details');

export const LicenseCenterTableActions = {
    LoadLicenses,
    LoadLicensesSuccess,
    LoadLicensesFailure,
    LoadLicensesById,
    LoadLicensesByIdSuccess,
    LoadLicensesByIdFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
    DeleteLicense,
    DeleteLicenseSuccess,
    DeleteLicenseFailure,
    AddLicense,
    AddLicenseSuccess,
    AddLicenseFailure,
    Refresh,
    ResetState,
    ResetStateZipCode,
    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,
    Navigate,
    RedirectToLicenseDetails,
};
