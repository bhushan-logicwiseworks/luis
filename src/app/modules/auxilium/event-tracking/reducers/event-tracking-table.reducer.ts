import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { EventTrackingTableActions } from '../actions/event-trackingtable.actions';

export const featureKey = 'event-tracking-center-table';

export interface State extends LoadingState {
    StatusInformation: any;
}

interface IdEntity {
    id: number;
}

const initialState: State = {
    loading: false,
    error: null,
    StatusInformation: [],
};

export const reducer = createReducer(
    initialState,
    on(EventTrackingTableActions.LoadEventInformation, state => ({ ...initialState, loading: true })),
    on(EventTrackingTableActions.LoadEventInformationSuccess, (state, { StatusInformation }) => ({
        ...state,
        loading: false,
        StatusInformation,
    })),
    on(EventTrackingTableActions.LoadEventInformationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectStatusInformation = (state: State) => state.StatusInformation;
