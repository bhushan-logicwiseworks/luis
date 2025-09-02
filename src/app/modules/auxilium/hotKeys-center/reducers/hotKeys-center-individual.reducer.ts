import { createReducer, on } from '@ngrx/store';
import { GetHotKeysResponse, HotKeysDisplay } from 'app/shared/interfaces/auxilium/hotKeys-center/hotkeys.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { HotKeysCenterIndividualActions } from '../actions/hotKeys-center-individual.actions';

export const featureKey = 'hotkeys-center-individual';

export interface State extends LoadingState {
    hotkeys: GetHotKeysResponse;
    hotkey: HotKeysDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    hotkey: null,
    hotkeys: [],
};

export const reducer = createReducer(
    initialState,

    on(HotKeysCenterIndividualActions.LoadHotKey, state => ({ ...state, loading: true })),
    on(HotKeysCenterIndividualActions.LoadHotKeySuccess, (state, { hotkey }) => ({ ...state, loading: false, hotkey })),
    on(HotKeysCenterIndividualActions.LoadHotKeyFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectHotkey = (state: State) => state.hotkey;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.hotkeys;
