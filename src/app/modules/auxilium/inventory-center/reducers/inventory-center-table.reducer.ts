import { createReducer, on } from '@ngrx/store';
import { GetInventoryProductResponse } from 'app/shared/interfaces/auxilium/inventory-center/product.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { InventoryCenterTableActions } from '../actions/inventory-center-table.actions';

export const featureKey = 'inventory-center-table';

export interface State extends LoadingState {
    inventory: GetInventoryProductResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    inventory: [],
};

export const reducer = createReducer(
    initialState,

    on(InventoryCenterTableActions.LoadInventory, state => ({ ...initialState, loading: true })),
    on(InventoryCenterTableActions.LoadInventorySuccess, (state, { inventory }) => ({
        ...state,
        loading: false,
        inventory,
    })),
    on(InventoryCenterTableActions.LoadInventoryFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectInventory = (state: State) => state.inventory;
