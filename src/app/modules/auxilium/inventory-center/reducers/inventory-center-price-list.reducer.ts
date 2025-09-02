import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ItemPriceById } from '../../../../shared/interfaces/auxilium/inventory-center/price-by-id.interface';
import { PriceListItem } from '../../../../shared/interfaces/auxilium/inventory-center/price-list.interface';
import { DropdownDisplay } from '../../../../shared/interfaces/auxilium/patient-center/patient-status.interface';
import { InventoryCenterPriceListActions } from '../actions/inventory-center-price-list.action';

export const featureKey = 'inventory-center-price-list';

export interface State extends LoadingState {
    data: PriceListItem[];
    priceData: ItemPriceById;
    priceCode: DropdownDisplay[];
    cmnForms: DropdownDisplay[];
}

const initialState: State = {
    loading: false,
    error: null,
    data: [],
    priceCode: [],
    cmnForms: [],
    priceData: null,
};

export const reducer = createReducer(
    initialState,
    on(InventoryCenterPriceListActions.LoadPriceList, state => ({ ...state, loading: true })),
    on(InventoryCenterPriceListActions.LoadPriceListSuccess, (state, { data }) => ({ ...state, loading: false, data })),
    on(InventoryCenterPriceListActions.LoadPriceListFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(InventoryCenterPriceListActions.PriceCodeDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterPriceListActions.PriceCodeDropdownSuccess, (state, { priceCode }) => ({
        ...state,
        loading: false,
        priceCode,
    })),
    on(InventoryCenterPriceListActions.PriceCodeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(InventoryCenterPriceListActions.CMNFormsDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterPriceListActions.CMNFormsDropdownSuccess, (state, { cmnForms }) => ({
        ...state,
        loading: false,
        cmnForms,
    })),
    on(InventoryCenterPriceListActions.CMNFormsDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(InventoryCenterPriceListActions.LoadPriceById, state => ({ ...state, loading: true })),
    on(InventoryCenterPriceListActions.LoadPriceByIdSuccess, (state, { priceData }) => ({
        ...state,
        loading: false,
        priceData,
    })),
    on(InventoryCenterPriceListActions.LoadPriceByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPriceList = (state: State) => state.data;
export const selectPriceCode = (state: State) => state.priceCode;
export const selectCMNForms = (state: State) => state.cmnForms;
export const selectPriceById = (state: State) => state.priceData;
