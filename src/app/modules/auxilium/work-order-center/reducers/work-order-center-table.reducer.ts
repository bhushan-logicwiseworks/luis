import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { SearchCriteria } from 'app/shared/interfaces/auxilium/work-order-center/search-criteria.interface';
import { WorkOrderDisplay } from 'app/shared/interfaces/auxilium/work-order-center/work-order-center.interface';
import { WorkOrderCenterTableActions } from '../actions/work-order-center-table.actions';

export const featureKey = 'sales-center-table';

export interface State extends LoadingState {
    workreps: WorkOrderDisplay[];
    searchCriteria: SearchCriteria | null;
}

const initialState: State = {
    loading: false,
    error: null,
    workreps: [],
    searchCriteria: null,
};

export const reducer = createReducer(
    initialState,

    on(WorkOrderCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(WorkOrderCenterTableActions.LoadWorkReps, state => ({ ...initialState, loading: true })),
    on(WorkOrderCenterTableActions.LoadWorkRepsSuccess, (state, { workreps }) => ({
        ...state,
        loading: false,
        workreps,
        searchCriteria: null,
    })),
    on(WorkOrderCenterTableActions.LoadWorkRepsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(WorkOrderCenterTableActions.SetWorkOrderSearch, (state, { criteria }) => ({
        ...state,
        searchCriteria: criteria,
    })),

    on(WorkOrderCenterTableActions.SearchWorkOrderEpoSent, state => ({ ...state, loading: true })),
    on(WorkOrderCenterTableActions.SearchWorkOrderEpoSentSuccess, (state, { workreps }) => ({
        ...state,
        loading: false,
        workreps,
        error: null,
    })),
    on(WorkOrderCenterTableActions.SearchWorkOrderEpoSentFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(WorkOrderCenterTableActions.SearchWorkOrderMonthlyMarker, state => ({ ...state, loading: true })),
    on(WorkOrderCenterTableActions.SearchWorkOrderMonthlyMarkerSuccess, (state, { workreps }) => ({
        ...state,
        loading: false,
        workreps,
        error: null,
    })),
    on(WorkOrderCenterTableActions.SearchWorkOrderMonthlyMarkerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectWorkOrderCenterReps = (state: State) => state.workreps;
export const selectWorkOrderSearch = (state: State) => state.searchCriteria;
