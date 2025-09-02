import { createAction, props } from '@ngrx/store';
import { VendorRecord } from '../../../../shared/interfaces/auxilium/inventory-center/vendor.interface';
import { DropdownDisplay } from '../../../../shared/interfaces/auxilium/patient-center/patient-status.interface';

const LoadVendor = createAction(
    '[InventoryCenter LoadVendor/API] Load LoadVendor',
    props<{ productId: VendorRecord['id'] }>()
);
const LoadVendorSuccess = createAction(
    '[InventoryCenter LoadVendor/API] Load LoadVendor Success',
    props<{ data: VendorRecord[] }>()
);
const LoadVendorFailure = createAction(
    '[InventoryCenter LoadVendor/API] Load LoadVendor Failure',
    props<{ error: Error }>()
);

const AddInventoryVendor = createAction('[InventoryCenter Create/API] Add Vendor', props<{ vendor: VendorRecord }>());
const AddInventoryVendorSuccess = createAction('[InventoryCenter Create/API] Add Vendor Success');
const AddInventoryVendorFailure = createAction(
    '[InventoryCenter Create/API] Add Vendor Failure',
    props<{ error: Error }>()
);

const VendorCodeDropdown = createAction('[VendorCode Table/API] Load VendorCode DropDown');
const VendorCodeDropdownSuccess = createAction(
    '[VendorCode Table/API] Load VendorCode DropDown Success',
    props<{ vendorCode: DropdownDisplay[] }>()
);
const VendorCodeDropdownFailure = createAction(
    '[VendorCode Table/API] Load VendorCode DropDown Failure',
    props<{ error: Error }>()
);

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());

export const InventoryCenterVendorTableActions = {
    LoadVendor,
    LoadVendorSuccess,
    LoadVendorFailure,
    AddInventoryVendor,
    AddInventoryVendorSuccess,
    AddInventoryVendorFailure,
    VendorCodeDropdown,
    VendorCodeDropdownSuccess,
    VendorCodeDropdownFailure,
    Navigate,
};
