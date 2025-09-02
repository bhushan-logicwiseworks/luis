import { createAction, props } from '@ngrx/store';
import { AbbottUserDisplay } from 'app/shared/interfaces/auxilium/abbott-center/abbottuser.interface';

const LoadUser = createAction('[AbbottCenter Table/API] Load User', props<{ id: AbbottUserDisplay['id'] }>());
const LoadUserSuccess = createAction(
    '[AbbottCenter Table/API] Load User Success',
    props<{ user: AbbottUserDisplay }>()
);
const LoadUserFailure = createAction('[AbbottCenter Table/API] Load User Failure', props<{ error: Error }>());

const AddUser = createAction('[AbbottCenter Create/API] Add User', props<{ user: AbbottUserDisplay }>());
const AddUserSuccess = createAction('[AbbottCenter Create/API] Add User Success', props<{ user: AbbottUserDisplay }>());
const AddUserFailure = createAction('[AbbottCenter Create/API] Add User Failure', props<{ error: Error }>());

const UpdateUser = createAction('[AbbottCenter Update/API] Update User', props<{ user: AbbottUserDisplay }>());
const UpdateUserSuccess = createAction(
    '[AbbottCenter Update/API] Update User Success',
    props<{ user: AbbottUserDisplay }>()
);
const UpdateUserFailure = createAction('[AbbottCenter Update/API] Update User Failure', props<{ error: Error }>());

const DeleteUser = createAction('[AbbottCenter Delete/API] Delete User', props<{ dto: AbbottUserDisplay }>());
const DeleteUserSuccess = createAction('[AbbottCenter Delete/API] Delete User Success');
const DeleteUserFailure = createAction('[AbbottCenter Delete/API] Delete User Failure', props<{ error: Error }>());

export const AbbottCenterIndividualActions = {
    LoadUser,
    LoadUserFailure,
    LoadUserSuccess,
    AddUser,
    AddUserSuccess,
    AddUserFailure,
    UpdateUser,
    UpdateUserSuccess,
    UpdateUserFailure,
    DeleteUser,
    DeleteUserSuccess,
    DeleteUserFailure,
};
