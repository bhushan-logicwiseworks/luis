import { createAction, props } from '@ngrx/store';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import {
    GetReferralResponse,
    ReferralDetails,
    ReferralDisplay,
    ReferralQuickSave,
} from 'app/shared/interfaces/auxilium/referral-center/referral.interface';
import { GetSalesRepsResponse } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';

const LoadReferrals = createAction('[ReferralCenter Table/API] Load Referrals', props<{ filter: string }>());
const LoadReferralsSuccess = createAction(
    '[ReferralCenter Table/API] Load Referrals Success',
    props<{ referrals: GetReferralResponse }>()
);
const LoadReferralsFailure = createAction(
    '[ReferralCenter Table/API] Load Referrals Failure',
    props<{ error: Error }>()
);

const DeleteReferral = createAction('[ReferralCenter Delete/API] Delete Referral', props<{ dto: ReferralDisplay }>());
const DeleteReferralSuccess = createAction('[ReferralCenter Delete/API] Delete Referral Success');
const DeleteReferralFailure = createAction(
    '[ReferralCenter Delete/API] Delete Referral Failure',
    props<{ error: Error }>()
);

const LoadSalesRepDropDown = createAction('[SalesCenter Table/API] Load SalesReps DropDown');
const LoadSalesRepDropDownSuccess = createAction(
    '[SalesCenter Table/API] Load SalesReps DropDown Success',
    props<{ salesreps: GetSalesRepsResponse }>()
);
const LoadSalesRepDropDownFailure = createAction(
    '[SalesCenter Table/API] Load SalesReps DropDown Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[SalesCenter Table/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[SalesCenter Table/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[SalesCenter Table/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const LoadReferralById = createAction('[ReferralCenter API] Load Referral', props<{ id: string }>());
const LoadReferralByIdSuccess = createAction(
    '[ReferralCenter API] Load Referral Success',
    props<{ Referral: ReferralDetails }>()
);
const LoadReferralByIdFailure = createAction('[ReferralCenter API] Load Referral Failure', props<{ error: Error }>());

const Refresh = createAction('[ReferralCenter Table/API] Refresh');
const ResetState = createAction('[ReferralCenter Table/API] Reset ReferralCenter');
const ResetStateZipCode = createAction('[ReferralCenter Table/API] Reset ResetStateZipCode');

const AddReferralQuickSave = createAction(
    '[ReferralCenter Create/API] Add Referral Quick Save',
    props<{ referral: ReferralQuickSave }>()
);
const AddReferralQuickSaveSuccess = createAction(
    '[ReferralCenter Create/API] Add Referral Quick Save Success',
    props<{ id: ReferralQuickSave['id'] }>()
);
const AddReferralQuickSaveFailure = createAction(
    '[ReferralCenter Create/API] Add Referral Quick Save Failure',
    props<{ error: Error }>()
);

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());
const RedirectToDemographics = createAction('[Router] Redirect Demographics');

export const ReferralCenterTableActions = {
    LoadReferrals,
    LoadReferralsSuccess,
    LoadReferralsFailure,
    LoadSalesRepDropDown,
    LoadSalesRepDropDownSuccess,
    LoadSalesRepDropDownFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
    DeleteReferral,
    DeleteReferralFailure,
    DeleteReferralSuccess,
    LoadReferralById,
    LoadReferralByIdSuccess,
    LoadReferralByIdFailure,
    Refresh,
    ResetState,
    ResetStateZipCode,
    AddReferralQuickSave,
    AddReferralQuickSaveSuccess,
    AddReferralQuickSaveFailure,
    Navigate,
    RedirectToDemographics,
};
