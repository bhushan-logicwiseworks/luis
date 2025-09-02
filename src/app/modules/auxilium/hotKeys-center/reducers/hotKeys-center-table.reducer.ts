import { createReducer, on } from '@ngrx/store';
import { GetHotKeysResponse } from 'app/shared/interfaces/auxilium/hotKeys-center/hotkeys.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { HotKeysCenterTableActions } from '../actions/hotKeys-center-table.actions';

export const featureKey = 'hotkeys-center-table';

export interface State extends LoadingState {
    hotkeys: GetHotKeysResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    hotkeys: [],
};

export const reducer = createReducer(
    initialState,

    on(HotKeysCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(HotKeysCenterTableActions.LoadHotKeys, state => ({ ...initialState, loading: true })),
    on(HotKeysCenterTableActions.LoadHotKeysSuccess, (state, { hotkeys }) => ({ ...state, loading: false, hotkeys })),
    on(HotKeysCenterTableActions.LoadHotKeysFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectHotKeysReps = (state: State) => state.hotkeys;
