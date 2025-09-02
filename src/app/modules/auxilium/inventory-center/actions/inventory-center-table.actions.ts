import { createAction, props } from '@ngrx/store';
import {
    GetInventoryProductResponse,
    InventoryProductItem,
} from 'app/shared/interfaces/auxilium/inventory-center/product.interface';

const LoadInventory = createAction('[InventoryCenter Table/API] Load Inventory', props<{ filter: string }>());
const LoadInventorySuccess = createAction(
    '[InventoryCenter Table/API] Load Inventory Success',
    props<{ inventory: GetInventoryProductResponse }>()
);
const LoadInventoryFailure = createAction(
    '[InventoryCenter Table/API] Load Inventory Failure',
    props<{ error: Error }>()
);

const DeleteInventory = createAction(
    '[InventoryCenter Delete/API] Delete Inventory',
    props<{ dto: InventoryProductItem }>()
);
const DeleteInventoryuccess = createAction('[InventoryCenter Delete/API] Delete Inventory Success');
const DeleteInventoryFailure = createAction(
    '[InventoryCenter Delete/API] Delete Inventory Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[InventoryCenter Table/API] Refresh');

export const InventoryCenterTableActions = {
    LoadInventory,
    LoadInventorySuccess,
    LoadInventoryFailure,
    Refresh,
    DeleteInventory,
    DeleteInventoryuccess,
    DeleteInventoryFailure,
};
