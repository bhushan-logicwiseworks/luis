import { createAction, props } from '@ngrx/store';
import { GetAbbottUserResponse } from 'app/shared/interfaces/auxilium/abbott-center/abbottuser.interface';

const ResetState = createAction('[AbbottCenter Table/API] Reset Users State');
const LoadUsers = createAction('[AbbottCenter Table/API] Load Users', props<{ filter: string }>());
const LoadUsersSuccess = createAction(
    '[AbbottCenter Table/API] Load Users Success',
    props<{ users: GetAbbottUserResponse }>()
);
const LoadUsersFailure = createAction('[AbbottCenter Table/API] Load Users Failure', props<{ error: Error }>());

const Refresh = createAction('[AbbottCenter Table/API] Refresh');
const resetState = createAction('[AbbottCenter Table/API] Reset AbbottCenter');

export const AbbottCenterTableActions = {
    LoadUsers,
    LoadUsersSuccess,
    LoadUsersFailure,
    Refresh,
    ResetState,
    resetState,
};
