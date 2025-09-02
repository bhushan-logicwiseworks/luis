import { createAction, props } from '@ngrx/store';
import { GetReordersResponse } from '../interfaces/reorderPatient';

const resetState = createAction('[Feature] Reset State');

const LoadReorder = createAction('[ReorderCenter Table/API] Load Reorder', props<{ filter: string }>());
const LoadReorderSuccess = createAction(
    '[ReorderCenter Table/API] Load Reorder Success',
    props<{ Reorders: GetReordersResponse }>()
);
const LoadReorderFailure = createAction('[ReorderCenter Table/API] Load Reorder Failure', props<{ error: Error }>());

export const ReorderCenterTableActions = {
    resetState,
    LoadReorder,
    LoadReorderSuccess,
    LoadReorderFailure,
};
