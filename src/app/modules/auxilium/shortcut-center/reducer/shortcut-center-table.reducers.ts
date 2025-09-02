import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { DropdownDisplay } from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import {
    GetShortcutResponse,
    ShortcutDisplay,
} from 'app/shared/interfaces/auxilium/shortcut-center/shortcut.interface';
import { ShortcutCenterTableActions } from '../action/shortcut-center-table.action';

export const featureKey = 'shortcut-center-table';

export interface State extends LoadingState {
    shortcuts: GetShortcutResponse;
    shortcutDetails: ShortcutDisplay | null;
    itemCodes: any[];
    billType: DropdownDisplay[];
    itemcode: string;
}

const initialState: State = {
    loading: false,
    error: null,
    shortcuts: [],
    itemCodes: [],
    billType: [],
    shortcutDetails: null,
    itemcode: '',
};

export const reducer = createReducer(
    initialState,

    on(ShortcutCenterTableActions.ResetState, () => {
        return initialState;
    }),
    on(ShortcutCenterTableActions.LoadShortcut, state => ({ ...initialState, loading: true })),
    on(ShortcutCenterTableActions.LoadShortcutSuccess, (state, { shortcuts }) => ({
        ...state,
        loading: false,
        shortcuts,
    })),
    on(ShortcutCenterTableActions.LoadShortcutFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ShortcutCenterTableActions.LoadShortcutItemCodes, state => ({ ...state, loading: true })),
    on(ShortcutCenterTableActions.LoadShortcutItemCodesSuccess, (state, { itemCodes }) => ({
        ...state,
        loading: false,
        itemCodes: [...itemCodes],
    })),
    on(ShortcutCenterTableActions.LoadShortcutItemCodesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(ShortcutCenterTableActions.LoadSelectedShortcutDetails, state => ({ ...state, loading: true })),
    on(ShortcutCenterTableActions.LoadSelectedShortcutDetailsSuccess, (state, { shortcut }) => ({
        ...state,
        loading: false,
        shortcutDetails: shortcut,
    })),
    on(ShortcutCenterTableActions.LoadSelectedShortcutDetailsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(ShortcutCenterTableActions.BillTypeDropdown, state => ({ ...state, loading: true })),
    on(ShortcutCenterTableActions.BillTypeDropdownSuccess, (state, { billType }) => ({
        ...state,
        loading: false,
        billType,
    })),
    on(ShortcutCenterTableActions.BillTypeDropdownFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectShortcuts = (state: State) => state.shortcuts;
export const selectShortcutItemCodes = (state: State) => state.itemCodes;

export const selectEditShortcutsLoading = (state: State) => state.shortcuts;
export const selectEditShortcutsError = (state: State) => state.shortcuts;
export const selectEditShortcuts = (state: State) => state.shortcutDetails;
export const selectBillType = (state: State) => state.billType;
export const selectItemCode = (state: State) => state.itemcode;
