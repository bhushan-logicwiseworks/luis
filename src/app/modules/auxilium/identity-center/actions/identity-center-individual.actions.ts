import { createAction, props } from '@ngrx/store';
import { IdentityDisplay } from 'app/shared/interfaces/auxilium/identity-center/identity.interface';

const LoadUser = createAction('[IdentityCenter Table/API] Load User');
const LoadUserSuccess = createAction(
    '[IdentityCenter Table/API] Load User Success',
    props<{ user: IdentityDisplay }>()
);
const LoadUserFailure = createAction('[IdentityCenter Table/API] Load User Failure', props<{ error: Error }>());

const AddUser = createAction('[IdentityCenter Create/API] Add User', props<{ user: IdentityDisplay }>());
const AddUserSuccess = createAction('[IdentityCenter Create/API] Add User Success', props<{ user: IdentityDisplay }>());
const AddUserFailure = createAction('[IdentityCenter Create/API] Add User Failure', props<{ error: Error }>());

const UpdateUser = createAction('[IdentityCenter Update/API] Update User', props<{ user: IdentityDisplay }>());
const UpdateUserSuccess = createAction(
    '[IdentityCenter Update/API] Update User Success',
    props<{ user: IdentityDisplay }>()
);
const UpdateUserFailure = createAction('[IdentityCenter Update/API] Update User Failure', props<{ error: Error }>());

export const IdentityCenterIndividualActions = {
    LoadUser,
    LoadUserFailure,
    LoadUserSuccess,
    AddUser,
    AddUserSuccess,
    AddUserFailure,
    UpdateUser,
    UpdateUserSuccess,
    UpdateUserFailure,
};
