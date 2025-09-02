import { createAction, props } from '@ngrx/store';
import {
    GetIdentityResponse,
    IdentityDisplay,
} from 'app/shared/interfaces/auxilium/identity-center/identity.interface';

const ResetState = createAction('[IdentityCenter Table/API] Reset Users State');
const LoadUsers = createAction('[IdentityCenter Table/API] Load Users', props<{ filter: string }>());
const LoadUsersSuccess = createAction(
    '[IdentityCenter Table/API] Load Users Success',
    props<{ users: GetIdentityResponse }>()
);
const LoadUsersFailure = createAction('[IdentityCenter Table/API] Load Users Failure', props<{ error: Error }>());

const DeleteUser = createAction('[IdentityCenter Delete/API] Delete User', props<{ dto: IdentityDisplay }>());
const DeleteUserSuccess = createAction('[IdentityCenter Delete/API] Delete User Success');
const DeleteUserFailure = createAction('[IdentityCenter Delete/API] Delete User Failure', props<{ error: Error }>());

const Refresh = createAction('[IdentityCenter Table/API] Refresh');

export const IdentityCenterTableActions = {
    LoadUsers,
    LoadUsersSuccess,
    LoadUsersFailure,
    DeleteUser,
    DeleteUserSuccess,
    DeleteUserFailure,
    Refresh,
    ResetState,
};
