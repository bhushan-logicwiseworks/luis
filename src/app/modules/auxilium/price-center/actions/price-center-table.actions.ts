import { createAction, props } from '@ngrx/store';
import { ItemDisplay } from 'app/shared/interfaces/auxilium/price-center/item.interface';
import { PriceInfoDisplay } from 'app/shared/interfaces/auxilium/price-center/price-Info.interface';

const ResetState = createAction('[PriceCenter Table/API] Reset PriceCenter State');

const LoadItem = createAction('[PriceCenter Table/API] Load Item', props<{ filter: string }>());
const ItemSearch = createAction('[PriceCenter Table/API] Item Search', props<{ itemSearch: ItemDisplay }>());
const ItemSearchSuccess = createAction('[PriceCenter Table/API] Item Search Success', props<{ item: ItemDisplay[] }>());
const ItemSearchFailure = createAction('[PriceCenter Table/API] Item Search Failure', props<{ error: Error }>());

const loadItemPriceList = createAction('[PriceCenter Table/API] Load Item Price List', props<{ id: number }>());
const LoadItemPriceListSuccess = createAction(
    '[PriceCenter Table/API] Load Item Price List Success',
    props<{ itemPriceList: ItemDisplay[] }>()
);
const LoadItemPriceListFailure = createAction(
    '[PriceCenter Table/API] Load Item Price List Failure',
    props<{ error: Error }>()
);

const loadItemPriceInfo = createAction('[PriceCenter Table/API] Load Item Price Info', props<{ id: number }>());
const LoadItemPriceInfoSuccess = createAction(
    '[PriceCenter Table/API] Load Item Price Info Success',
    props<{ itemPriceInfo: PriceInfoDisplay[] }>()
);
const LoadItemPriceInfoFailure = createAction(
    '[PriceCenter Table/API] Load Item Price Info Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PriceCenter Table/API] Refresh');

export const PriceCenterTableActions = {
    LoadItem,
    ResetState,
    ItemSearch,
    ItemSearchSuccess,
    ItemSearchFailure,
    loadItemPriceList,
    LoadItemPriceListSuccess,
    LoadItemPriceListFailure,
    loadItemPriceInfo,
    LoadItemPriceInfoSuccess,
    LoadItemPriceInfoFailure,
    Refresh,
};
