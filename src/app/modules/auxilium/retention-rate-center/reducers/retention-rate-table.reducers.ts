import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetRetentionRateResponse } from 'app/shared/interfaces/auxilium/retention-rate-center/retention-rate.interface';
import { RetentionRateTableActions } from '../actions/retention-rate-table.actions';

export const featureKey = 'retention-rate-table';

export interface State extends LoadingState {
    retentions: GetRetentionRateResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    retentions: [],
};

export const reducer = createReducer(
    initialState,

    on(RetentionRateTableActions.ResetState, () => {
        return initialState;
    }),

    on(RetentionRateTableActions.LoadRetentions, state => ({ ...initialState, loading: true })),
    on(RetentionRateTableActions.LoadRetentionsSuccess, (state, { retentions }) => ({
        ...state,
        loading: false,
        retentions,
    })),
    on(RetentionRateTableActions.LoadRetentionsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(RetentionRateTableActions.DeleteRetentions, state => ({ ...initialState, loading: true })),
    on(RetentionRateTableActions.DeleteRetentionsSuccess, state => ({ ...state, loading: false })),
    on(RetentionRateTableActions.DeleteRetentionsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectRetentions = (state: State) => state.retentions;
