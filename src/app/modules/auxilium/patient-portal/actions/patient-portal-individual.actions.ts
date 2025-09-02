import { createAction, props } from '@ngrx/store';
import { PatientPortalUserDisplay } from 'app/shared/interfaces/auxilium/patient-portal/patient-portal-user.interface';

const LoadPPUser = createAction('[PatientPortal Table/API] Load User', props<{ id: PatientPortalUserDisplay['id'] }>());
const LoadPPUserSuccess = createAction(
    '[PatientPortal Table/API] Load User Success',
    props<{ user: PatientPortalUserDisplay }>()
);
const LoadPPUserFailure = createAction('[PatientPortal Table/API] Load User Failure', props<{ error: Error }>());

const AddPPUser = createAction('[PatientPortal Create/API] Add User', props<{ user: PatientPortalUserDisplay }>());
const AddPPUserSuccess = createAction(
    '[PatientPortal Create/API] Add User Success',
    props<{ user: PatientPortalUserDisplay }>()
);
const AddPPUserFailure = createAction('[PatientPortal Create/API] Add User Failure', props<{ error: Error }>());

const UpdatePPUser = createAction(
    '[PatientPortal Update/API] Update User',
    props<{ user: PatientPortalUserDisplay }>()
);
const UpdatePPUserSuccess = createAction(
    '[PatientPortal Update/API] Update User Success',
    props<{ user: PatientPortalUserDisplay }>()
);
const UpdatePPUserFailure = createAction('[PatientPortal Update/API] Update User Failure', props<{ error: Error }>());

const UpdateUserDetails = createAction(
    '[PatientPortal Create/API] Update User Details',
    props<{ userDetails: PatientPortalUserDisplay }>()
);
const UpdateUserDetailsSuccess = createAction(
    '[PatientPortal Create/API] Update User Details Success',
    props<{ userDetails: PatientPortalUserDisplay }>()
);
const UpdateUserDetailsFailure = createAction(
    '[PatientPortal Create/API] Update User Details Failure',
    props<{ error: Error }>()
);

export const PatientPortalIndividualActions = {
    LoadPPUser,
    LoadPPUserFailure,
    LoadPPUserSuccess,
    AddPPUser,
    AddPPUserSuccess,
    AddPPUserFailure,
    UpdatePPUser,
    UpdatePPUserSuccess,
    UpdatePPUserFailure,
    UpdateUserDetails,
    UpdateUserDetailsSuccess,
    UpdateUserDetailsFailure,
};
