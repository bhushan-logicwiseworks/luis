import { createAction, props } from '@ngrx/store';
import { AccessDisplay } from 'app/shared/interfaces/auxilium/access-center/access.interface';

const LoadAccess = createAction('[AccessCenter Table/API] Load Access', props<{ id: AccessDisplay['id'] }>());
const LoadAccessSuccess = createAction(
    '[AccessCenter Table/API] Load Access Success',
    props<{ access: AccessDisplay }>()
);
const LoadAccessFailure = createAction('[AccessCenter Table/API] Load Access Failure', props<{ error: Error }>());

const AddAccess = createAction('[AccessCenter Create/API] Add Access', props<{ access: AccessDisplay }>());
const AddAccessSuccess = createAction(
    '[AccessCenter Create/API] Add Access Success',
    props<{ access: AccessDisplay }>()
);
const AddAccessFailure = createAction('[AccessCenter Create/API] Add Access Failure', props<{ error: Error }>());

const Refresh = createAction('[AccessCenter Table/API] Refresh Individual Access');

export const AccessCenterIndividualActions = {
    LoadAccess,
    LoadAccessFailure,
    LoadAccessSuccess,
    AddAccess,
    AddAccessSuccess,
    AddAccessFailure,
    Refresh,
};
