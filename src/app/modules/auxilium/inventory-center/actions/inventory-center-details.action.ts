import { createAction, props } from '@ngrx/store';
import { GetCommonDropDownResponse } from 'app/shared/interfaces/auxilium/inventory-center/common-product-dropdown.interface';
import { InventoryProductItem } from 'app/shared/interfaces/auxilium/inventory-center/product.interface';

const ResetState = createAction('[InventoryCenter Details/API] Reset Product Details State');

const LoadProductDetails = createAction('[InventoryCenter Details/API] Load Product Details ', props<{ id: number }>());
const LoadProductDetailsSuccess = createAction(
    '[InventoryCenter Details/API] Load Product Details Success',
    props<{ product: InventoryProductItem[] }>()
);
const LoadProductDetailsFailure = createAction(
    '[InventoryCenter Details/API] Load Product Details Failure',
    props<{ error: Error }>()
);

const LoadClassDropdown = createAction('[InventoryCenter Details/API] Load Class Dropdown');
const LoadClassDropdownSuccess = createAction(
    '[InventoryCenter Details/API] Load Class Dropdown Success',
    props<{ inventoryclass: GetCommonDropDownResponse }>()
);
const LoadClassDropdownFailure = createAction(
    '[InventoryCenter Details/API] Load Class Dropdown Failure',
    props<{ error: Error }>()
);

const LoadShippingUnitsDropdown = createAction('[InventoryCenter Details/API] Load Shipping Units Dropdown');
const LoadShippingUnitsDropdownSuccess = createAction(
    '[InventoryCenter Details/API] Load Shipping Units Dropdown Success',
    props<{ shipping: GetCommonDropDownResponse }>()
);
const LoadShippingUnitsDropdownFailure = createAction(
    '[InventoryCenter Details/API] Load Shipping Units Dropdown Failure',
    props<{ error: Error }>()
);

const LoadStatusDropdown = createAction('[InventoryCenter Details/API] Load Status Dropdown');
const LoadStatusDropdownSuccess = createAction(
    '[InventoryCenter Details/API] Load Status Dropdown Success',
    props<{ status: GetCommonDropDownResponse }>()
);
const LoadStatusDropdownFailure = createAction(
    '[InventoryCenter Details/API] Load Status Dropdown Failure',
    props<{ error: Error }>()
);

const LoadMakeDropdown = createAction('[InventoryCenter Details/API] Load Make Dropdown');
const LoadMakeDropdownSuccess = createAction(
    '[InventoryCenter Details/API] Load Make Dropdown Success',
    props<{ make: GetCommonDropDownResponse }>()
);
const LoadMakeDropdownFailure = createAction(
    '[InventoryCenter Details/API] Load Make Dropdown Failure',
    props<{ error: Error }>()
);

const LoadModelDropdown = createAction('[InventoryCenter Details/API] Load Model Dropdown');
const LoadModelDropdownSuccess = createAction(
    '[InventoryCenter Details/API] Load Model Dropdown Success',
    props<{ modal: GetCommonDropDownResponse }>()
);
const LoadModelDropdownFailure = createAction(
    '[InventoryCenter Details/API] Load Model Dropdown Failure',
    props<{ error: Error }>()
);

const LoadManufacturerDropdown = createAction('[InventoryCenter Details/API] Load Manufacturer Dropdown');
const LoadManufacturerDropdownSuccess = createAction(
    '[InventoryCenter Details/API] Load Manufacturer Dropdown Success',
    props<{ manufacturer: GetCommonDropDownResponse }>()
);
const LoadManufacturerDropdownFailure = createAction(
    '[InventoryCenter Details/API] Load Manufacturer Dropdown Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[InventoryCenter Deatils/API] Refresh');

export const InventoryCenterDeatilsActions = {
    LoadProductDetails,
    LoadProductDetailsSuccess,
    LoadProductDetailsFailure,

    LoadClassDropdown,
    LoadClassDropdownSuccess,
    LoadClassDropdownFailure,

    LoadShippingUnitsDropdown,
    LoadShippingUnitsDropdownSuccess,
    LoadShippingUnitsDropdownFailure,

    LoadStatusDropdown,
    LoadStatusDropdownSuccess,
    LoadStatusDropdownFailure,

    LoadMakeDropdown,
    LoadMakeDropdownSuccess,
    LoadMakeDropdownFailure,

    LoadModelDropdown,
    LoadModelDropdownSuccess,
    LoadModelDropdownFailure,

    LoadManufacturerDropdown,
    LoadManufacturerDropdownSuccess,
    LoadManufacturerDropdownFailure,

    Refresh,
    ResetState,
};
