import { createReducer, on } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import {
    GetInventoryProductResponse,
    InventoryProductItem,
} from 'app/shared/interfaces/auxilium/inventory-center/product.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { InventoryCenterIndividualActions } from '../actions/inventory-center-individual.actions';

export const featureKey = 'inventory-center-individual';

export interface State extends LoadingState {
    inventorys: GetInventoryProductResponse;
    inventory: InventoryProductItem;
    branch: GetBranchListResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    inventory: null,
    inventorys: [],
    branch: [],
};

export const reducer = createReducer(
    initialState,

    on(InventoryCenterIndividualActions.LoadInventory, state => ({ ...state, loading: true })),
    on(InventoryCenterIndividualActions.LoadInventorySuccess, (state, { inventory }) => ({
        ...state,
        loading: false,
        inventory,
    })),
    on(InventoryCenterIndividualActions.LoadInventoryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(InventoryCenterIndividualActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(InventoryCenterIndividualActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(InventoryCenterIndividualActions.LoadBranchDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectInventory = (state: State) => state.inventory;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.inventory;
export const selectBranch = (state: State) => state.branch;
