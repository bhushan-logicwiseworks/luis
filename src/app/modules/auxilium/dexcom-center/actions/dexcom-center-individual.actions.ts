import { createAction, props } from '@ngrx/store';
import { DexcomUserDisplay } from 'app/shared/interfaces/auxilium/dexcom-center/dexcomuser.interface';

const LoadUser = createAction('[DexcomCenter Table/API] Load User', props<{ id: DexcomUserDisplay['id'] }>());
const LoadUserSuccess = createAction(
    '[DexcomCenter Table/API] Load User Success',
    props<{ user: DexcomUserDisplay }>()
);
const LoadUserFailure = createAction('[DexcomCenter Table/API] Load User Failure', props<{ error: Error }>());

const AddUser = createAction('[DexcomCenter Create/API] Add User', props<{ user: DexcomUserDisplay }>());
const AddUserSuccess = createAction('[DexcomCenter Create/API] Add User Success', props<{ user: DexcomUserDisplay }>());
const AddUserFailure = createAction('[DexcomCenter Create/API] Add User Failure', props<{ error: Error }>());

const UpdateUser = createAction('[DexcomCenter Update/API] Update User', props<{ user: DexcomUserDisplay }>());
const UpdateUserSuccess = createAction(
    '[DexcomCenter Update/API] Update User Success',
    props<{ user: DexcomUserDisplay }>()
);
const UpdateUserFailure = createAction('[DexcomCenter Update/API] Update User Failure', props<{ error: Error }>());

const DeleteUser = createAction('[DexcomCenter Delete/API] Delete User', props<{ dto: DexcomUserDisplay }>());
const DeleteUserSuccess = createAction('[DexcomCenter Delete/API] Delete User Success');
const DeleteUserFailure = createAction('[DexcomCenter Delete/API] Delete User Failure', props<{ error: Error }>());

export const DexcomCenterIndividualActions = {
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
