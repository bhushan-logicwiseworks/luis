import { createAction, props } from '@ngrx/store';
import { GetVendorsResponse, VendorDisplay } from 'app/shared/interfaces/auxilium/vendor-center/vendor.interface';

const ResetState = createAction('[VendorCenter Table/API] Reset Vendors State');
const LoadVendors = createAction('[VendorCenter Table/API] Load Vendors');
const LoadVendorsSuccess = createAction(
    '[VendorCenter Table/API] Load Vendors Success',
    props<{ vendors: GetVendorsResponse }>()
);
const LoadVendorsFailure = createAction('[VendorCenter Table/API] Load Vendors Failure', props<{ error: Error }>());

const DeleteVendor = createAction('[VendorCenter Delete/API] Delete Vendor', props<{ dto: VendorDisplay }>());
const DeleteVendorSuccess = createAction('[VendorCenter Delete/API] Delete Vendor Success');
const DeleteVendorFailure = createAction('[VendorCenter Delete/API] Delete Vendor Failure', props<{ error: Error }>());

const Refresh = createAction('[VendorCenter Table/API] Refresh');

export const VendorCenterTableActions = {
    LoadVendors,
    LoadVendorsSuccess,
    LoadVendorsFailure,
    Refresh,
    ResetState,
    DeleteVendor,
    DeleteVendorSuccess,
    DeleteVendorFailure,
};
