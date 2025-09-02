import { createAction, props } from '@ngrx/store';
import { ItemPriceById } from '../../../../shared/interfaces/auxilium/inventory-center/price-by-id.interface';
import { PriceListItem } from '../../../../shared/interfaces/auxilium/inventory-center/price-list.interface';
import { DropdownDisplay } from '../../../../shared/interfaces/auxilium/patient-center/patient-status.interface';

const LoadPriceList = createAction(
    '[Patient LoadPriceList/API] Load LoadPriceList',
    props<{ productId: PriceListItem['id'] }>()
);
const LoadPriceListSuccess = createAction(
    '[Patient LoadPriceList/API] Load LoadPriceList Success',
    props<{ data: PriceListItem[] }>()
);
const LoadPriceListFailure = createAction(
    '[Patient LoadPriceList/API] Load LoadPriceList Failure',
    props<{ error: Error }>()
);

const SavePrice = createAction('[InventoryCenter Price List/API] Save Price', props<{ price: ItemPriceById }>());
const SavePriceSuccess = createAction('[InventoryCenter Price List/API] Save Price Success');
const SavePriceFailure = createAction('[InventoryCenter Price List/API] Save Price Failure', props<{ error: Error }>());

const PriceCodeDropdown = createAction('[PriceCodeDropdown Table/API] Load PriceCode DropDown');
const PriceCodeDropdownSuccess = createAction(
    '[PriceCodeDropdown Table/API] Load PriceCode DropDown Success',
    props<{ priceCode: DropdownDisplay[] }>()
);
const PriceCodeDropdownFailure = createAction(
    '[PriceCodeDropdown Table/API] Load PriceCode DropDown Failure',
    props<{ error: Error }>()
);

const CMNFormsDropdown = createAction('[CMNFormsDropdown Table/API] Load CMNForms DropDown');
const CMNFormsDropdownSuccess = createAction(
    '[CMNFormsDropdown Table/API] Load CMNForms DropDown Success',
    props<{ cmnForms: DropdownDisplay[] }>()
);
const CMNFormsDropdownFailure = createAction(
    '[CMNFormsDropdown Table/API] Load CMNForms DropDown Failure',
    props<{ error: Error }>()
);

const LoadPriceById = createAction('[Patient LoadPriceList/API] Load LoadPriceById', props<{ priceId: number }>());
const LoadPriceByIdSuccess = createAction(
    '[Patient LoadPriceList/API] Load LoadPriceById Success',
    props<{ priceData: ItemPriceById }>()
);
const LoadPriceByIdFailure = createAction(
    '[Patient LoadPriceList/API] Load LoadPriceById Failure',
    props<{ error: Error }>()
);

export const InventoryCenterPriceListActions = {
    LoadPriceList,
    LoadPriceListSuccess,
    LoadPriceListFailure,
    PriceCodeDropdown,
    PriceCodeDropdownSuccess,
    PriceCodeDropdownFailure,
    CMNFormsDropdown,
    CMNFormsDropdownSuccess,
    CMNFormsDropdownFailure,
    LoadPriceById,
    LoadPriceByIdSuccess,
    LoadPriceByIdFailure,
    SavePrice,
    SavePriceSuccess,
    SavePriceFailure,
};
