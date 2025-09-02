import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import {
    GetInventoryProductResponse,
    InventoryProductItem,
} from 'app/shared/interfaces/auxilium/inventory-center/product.interface';

const LoadInventory = createAction('[InventoryCenter Table/API] Load Inventory');
const LoadInventorySuccess = createAction(
    '[InventoryCenter Table/API] Load Inventory Success',
    props<{ inventory: InventoryProductItem }>()
);
const LoadInventoryFailure = createAction(
    '[InventoryCenter Table/API] Load Inventory Failure',
    props<{ error: Error }>()
);

const AddInventory = createAction(
    '[InventoryCenter Create/API] Add Inventory',
    props<{ inventory: InventoryProductItem }>()
);
const AddInventorySuccess = createAction(
    '[InventoryCenter Create/API] Add Inventory Success',
    props<{ inventory: GetInventoryProductResponse }>()
);
const AddInventoryFailure = createAction(
    '[InventoryCenter Create/API] Add Inventory Failure',
    props<{ error: Error }>()
);

const UpdateInventory = createAction(
    '[InventoryCenter Update/API] Update Inventory',
    props<{ inventory: InventoryProductItem }>()
);
const UpdateInventorySuccess = createAction(
    '[InventoryCenter Update/API] Update Inventory Success',
    props<{ inventory: GetInventoryProductResponse }>()
);
const UpdateInventoryFailure = createAction(
    '[InventoryCenter Update/API] Update Inventory Failure',
    props<{ error: Error }>()
);

const LoadBranchDropDown = createAction('[InventoryCenter Load/API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[InventoryCenter Load/API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction(
    '[InventoryCenter Load/API] Load Branch DropDown Failure',
    props<{ error: Error }>()
);

export const InventoryCenterIndividualActions = {
    LoadInventory,
    LoadInventoryFailure,
    LoadInventorySuccess,
    AddInventory,
    AddInventorySuccess,
    AddInventoryFailure,
    UpdateInventory,
    UpdateInventorySuccess,
    UpdateInventoryFailure,
    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,
};
