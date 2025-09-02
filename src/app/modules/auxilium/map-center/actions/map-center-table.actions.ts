import { createAction, props } from '@ngrx/store';
import {
    GetMapListResponse,
    GetMapSalesRepsResponse,
} from 'app/shared/interfaces/auxilium/map-center/map-center-responses.interface';

const LoadAMapList = createAction('[Map List/API] Load Map List', props<{ filter: string }>());
const LoadAMapListSuccess = createAction(
    '[Map List/API] Load Map List Success',
    props<{ maplist: GetMapListResponse }>()
);
const LoadAMapListFailure = createAction('[Map List/API] Load Map List Failure', props<{ error: Error }>());

const Refresh = createAction('[Map List/API] Refresh');

const LoadSalesReps = createAction('[MapCenter Table/API] Load SalesReps');
const LoadSalesRepsSuccess = createAction(
    '[MapCenter Table/API] Load SalesReps Success',
    props<{ salesreps: GetMapSalesRepsResponse }>()
);
const LoadSalesRepsFailure = createAction('[MapCenter Table/API] Load SalesReps Failure', props<{ error: Error }>());

export const MapCenterTableActions = {
    LoadAMapList,
    LoadAMapListSuccess,
    LoadAMapListFailure,
    Refresh,
    LoadSalesReps,
    LoadSalesRepsSuccess,
    LoadSalesRepsFailure,
};
