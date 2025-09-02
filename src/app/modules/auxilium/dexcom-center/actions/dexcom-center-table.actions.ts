import { createAction, props } from '@ngrx/store';
import { GetDexcomUserResponse } from 'app/shared/interfaces/auxilium/dexcom-center/dexcomuser.interface';

const ResetState = createAction('[DexcomCenter Table/API] Reset Users State');
const LoadUsers = createAction('[DexcomCenter Table/API] Load Users', props<{ filter: string }>());
const LoadUsersSuccess = createAction(
    '[DexcomCenter Table/API] Load Users Success',
    props<{ users: GetDexcomUserResponse }>()
);
const LoadUsersFailure = createAction('[DexcomCenter Table/API] Load Users Failure', props<{ error: Error }>());

const Refresh = createAction('[DexcomCenter Table/API] Refresh');
const resetState = createAction('[DexcomCenter Table/API] Reset DexcomCenter');

export const DexcomCenterTableActions = {
    LoadUsers,
    LoadUsersSuccess,
    LoadUsersFailure,
    Refresh,
    ResetState,
    resetState,
};
