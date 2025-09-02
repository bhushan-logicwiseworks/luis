import { createAction, props } from '@ngrx/store';
import { ReferralDisplay } from 'app/shared/interfaces/auxilium/referral-center/referral.interface';

const LoadReferral = createAction('[ReferralCenter Table/API] Load Referral');
const LoadReferralSuccess = createAction(
    '[ReferralCenter Table/API] Load Referral Success',
    props<{ referral: ReferralDisplay }>()
);
const LoadReferralFailure = createAction('[ReferralCenter Table/API] Load Referral Failure', props<{ error: Error }>());

const AddReferral = createAction('[ReferralCenter Create/API] Add Referral', props<{ referral: ReferralDisplay }>());
const AddReferralSuccess = createAction(
    '[ReferralCenter Create/API] Add Referral Success',
    props<{ referral: ReferralDisplay }>()
);
const AddReferralFailure = createAction('[ReferralCenter Create/API] Add Referral Failure', props<{ error: Error }>());

const UpdateReferral = createAction(
    '[ReferralCenter Update/API] Update Referral',
    props<{ referral: ReferralDisplay }>()
);
const UpdateReferralSuccess = createAction(
    '[ReferralCenter Update/API] Update Referral Success',
    props<{ referral: ReferralDisplay }>()
);
const UpdateReferralFailure = createAction(
    '[ReferralCenter Update/API] Update Referral Failure',
    props<{ error: Error }>()
);

export const ReferralCenterIndividualActions = {
    LoadReferral,
    LoadReferralFailure,
    LoadReferralSuccess,
    AddReferral,
    AddReferralFailure,
    AddReferralSuccess,
    UpdateReferral,
    UpdateReferralFailure,
    UpdateReferralSuccess,
};
