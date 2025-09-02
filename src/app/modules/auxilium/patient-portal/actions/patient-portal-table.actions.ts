import { createAction, props } from '@ngrx/store';
import {
    GetPatientPortalUserResponse,
    PatientPortalUserDisplay,
} from 'app/shared/interfaces/auxilium/patient-portal/patient-portal-user.interface';

const LoadPPUsers = createAction('[PatientPortal Table/API] Load Users', props<{ filter: string }>());
const LoadPPUsersSuccess = createAction(
    '[PatientPortal Table/API] Load Users Success',
    props<{ users: GetPatientPortalUserResponse }>()
);
const LoadPPUsersFailure = createAction('[PatientPortal Table/API] Load Users Failure', props<{ error: Error }>());

const DeletePPUser = createAction('[PatientPortal Delete/API] Delete User', props<{ dto: PatientPortalUserDisplay }>());
const DeletePPUserSuccess = createAction('[PatientPortal Delete/API] Delete User Success');
const DeletePPUserFailure = createAction('[PatientPortal Delete/API] Delete User Failure', props<{ error: Error }>());

const Refresh = createAction('[PatientPortal Table/API] Refresh');
const ResetState = createAction('[PatientPortal Table/API] Reset Users State');

export const PatientPortalTableActions = {
    LoadPPUsers,
    LoadPPUsersSuccess,
    LoadPPUsersFailure,
    DeletePPUser,
    DeletePPUserSuccess,
    DeletePPUserFailure,
    Refresh,
    ResetState,
};
