import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { GetCommonDropDownResponse } from 'app/shared/interfaces/auxilium/inventory-center/common-product-dropdown.interface';
import {
    GetInventoryProductResponse,
    InventoryProductItem,
} from 'app/shared/interfaces/auxilium/inventory-center/product.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { InventoryCenterDeatilsActions } from '../actions/inventory-center-details.action';

export const featureKey = 'inventory-center-product';

export interface State extends LoadingState {
    products: GetInventoryProductResponse;
    product: InventoryProductItem[];
    inventoryclass: GetCommonDropDownResponse;
    shipping: GetCommonDropDownResponse;
    status: GetCommonDropDownResponse;
    make: GetCommonDropDownResponse;
    modal: GetCommonDropDownResponse;
    manufacturer: GetCommonDropDownResponse;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
    selectId: model => model.Id,
});

const initialState: State = adapter.getInitialState({
    loading: false,
    error: null,
    product: null,
    products: [],
    inventoryclass: [],
    shipping: [],
    status: [],
    make: [],
    modal: [],
    manufacturer: [],
});

export const reducer = createReducer(
    initialState,

    on(InventoryCenterDeatilsActions.ResetState, () => {
        return initialState;
    }),

    on(InventoryCenterDeatilsActions.LoadProductDetails, state => ({ ...state, loading: true })),
    on(InventoryCenterDeatilsActions.LoadProductDetailsSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        product,
    })),
    on(InventoryCenterDeatilsActions.LoadProductDetailsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(InventoryCenterDeatilsActions.LoadClassDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterDeatilsActions.LoadClassDropdownSuccess, (state, { inventoryclass }) => ({
        ...state,
        loading: false,
        inventoryclass,
    })),
    on(InventoryCenterDeatilsActions.LoadClassDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(InventoryCenterDeatilsActions.LoadShippingUnitsDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterDeatilsActions.LoadShippingUnitsDropdownSuccess, (state, { shipping }) => ({
        ...state,
        loading: false,
        shipping,
    })),
    on(InventoryCenterDeatilsActions.LoadShippingUnitsDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(InventoryCenterDeatilsActions.LoadStatusDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterDeatilsActions.LoadStatusDropdownSuccess, (state, { status }) => ({
        ...state,
        loading: false,
        status,
    })),
    on(InventoryCenterDeatilsActions.LoadStatusDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(InventoryCenterDeatilsActions.LoadMakeDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterDeatilsActions.LoadMakeDropdownSuccess, (state, { make }) => ({
        ...state,
        loading: false,
        make,
    })),
    on(InventoryCenterDeatilsActions.LoadMakeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(InventoryCenterDeatilsActions.LoadModelDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterDeatilsActions.LoadModelDropdownSuccess, (state, { modal }) => ({
        ...state,
        loading: false,
        modal,
    })),
    on(InventoryCenterDeatilsActions.LoadModelDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(InventoryCenterDeatilsActions.LoadManufacturerDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterDeatilsActions.LoadManufacturerDropdownSuccess, (state, { manufacturer }) => ({
        ...state,
        loading: false,
        manufacturer,
    })),
    on(InventoryCenterDeatilsActions.LoadManufacturerDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectProductDetails = (state: State) => state.product;
export const selectClassDropdown = (state: State) => state.inventoryclass;
export const selectShippingDropdown = (state: State) => state.shipping;
export const selectStatusDropdown = (state: State) => state.status;
export const selectMakeDropdown = (state: State) => state.make;
export const selectModalDropdown = (state: State) => state.modal;
export const selectManufacturerDropdown = (state: State) => state.manufacturer;
