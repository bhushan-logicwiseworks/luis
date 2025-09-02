import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ItemDisplay } from 'app/shared/interfaces/auxilium/price-center/item.interface';
import { PriceInfoDisplay } from 'app/shared/interfaces/auxilium/price-center/price-Info.interface';
import { PriceCenterTableActions } from '../actions/price-center-table.actions';

export const featureKey = 'price-center-table';

export interface State extends LoadingState {
    item: ItemDisplay[];
    itemPriceList: ItemDisplay[];
    itemPriceInfo: PriceInfoDisplay[];
}

const initialState: State = {
    loading: false,
    error: null,
    item: null,
    itemPriceList: null,
    itemPriceInfo: null,
};

export const reducer = createReducer(
    initialState,

    on(PriceCenterTableActions.ResetState, () => ({ ...initialState, itemPriceInfo: null })),
    on(PriceCenterTableActions.ItemSearch, state => ({ ...state, loading: true })),
    on(PriceCenterTableActions.ItemSearchSuccess, (state, { item }) => ({ ...state, loading: false, item })),
    on(PriceCenterTableActions.ItemSearchFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PriceCenterTableActions.loadItemPriceList, state => ({ ...initialState, loading: true })),
    on(PriceCenterTableActions.LoadItemPriceListSuccess, (state, { itemPriceList }) => ({
        ...state,
        loading: false,
        itemPriceList,
    })),
    on(PriceCenterTableActions.LoadItemPriceListFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PriceCenterTableActions.loadItemPriceInfo, state => ({ ...initialState, loading: true })),
    on(PriceCenterTableActions.LoadItemPriceInfoSuccess, (state, { itemPriceInfo }) => ({
        ...state,
        loading: false,
        itemPriceInfo,
    })),
    on(PriceCenterTableActions.LoadItemPriceInfoFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectItem = (state: State) => state.item;
export const selectedItemPriceList = (state: State) => state.itemPriceList;
export const selectedItemPriceInfo = (state: State) => state.itemPriceInfo;
