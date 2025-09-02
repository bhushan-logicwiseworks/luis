import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/map-center/loading-state.interface';
import {
    GetMapListResponse,
    GetMapSalesRepsResponse,
} from 'app/shared/interfaces/auxilium/map-center/map-center-responses.interface';
import { MapCenterTableActions } from '../actions/map-center-table.actions';

export const featureKey = 'map-center-table';

export interface State extends LoadingState {
    maplist: GetMapListResponse;
    salesreps: GetMapSalesRepsResponse;
}

interface IdEntity {
    id: number;
}

const initialState: State = {
    loading: false,
    error: null,
    maplist: [],
    salesreps: [],
};

export const reducer = createReducer(
    initialState,
    on(MapCenterTableActions.LoadAMapList, state => ({ ...state, loading: true })),
    on(MapCenterTableActions.LoadAMapListSuccess, (state, { maplist }) => ({ ...state, loading: false, maplist })),
    on(MapCenterTableActions.LoadAMapListFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(MapCenterTableActions.LoadSalesReps, state => ({ ...state, loading: true })),
    on(MapCenterTableActions.LoadSalesRepsSuccess, (state, { salesreps }) => ({ ...state, loading: false, salesreps })),
    on(MapCenterTableActions.LoadSalesRepsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectMapList = (state: State) => state.maplist;
export const selectSalesReps = (state: State) => state.salesreps;
