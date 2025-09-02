import { createAction, props } from '@ngrx/store';
import { AccessDisplay, GetAccessResponse } from 'app/shared/interfaces/auxilium/access-center/access.interface';

const LoadAccessList = createAction('[AccessCenter Table/API] Load Access List', props<{ filter: string }>());
const LoadAccessListSuccess = createAction(
    '[AccessCenter Table/API] Load Access List Success',
    props<{ accesslist: GetAccessResponse }>()
);
const LoadAccessListFailure = createAction(
    '[AccessCenter Table/API] Load Access List Failure',
    props<{ error: Error }>()
);

const DeleteAccess = createAction('[AccessCenter Delete/API] Delete Access', props<{ dto: AccessDisplay }>());
const DeleteAccessSuccess = createAction('[AccessCenter Delete/API] Delete Access Success');
const DeleteAccessFailure = createAction('[AccessCenter Delete/API] Delete Access Failure', props<{ error: Error }>());

const Refresh = createAction('[AccessCenter Table/API] Refresh Access List');
const ResetState = createAction('[AccessCenter Table/API] Reset Access List State');

export const AccessCenterTableActions = {
    LoadAccessList,
    LoadAccessListSuccess,
    LoadAccessListFailure,
    DeleteAccess,
    DeleteAccessSuccess,
    DeleteAccessFailure,
    Refresh,
    ResetState,
};
