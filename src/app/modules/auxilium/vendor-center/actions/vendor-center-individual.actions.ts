import { createAction, props } from '@ngrx/store';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { VendorDisplay } from 'app/shared/interfaces/auxilium/vendor-center/vendor.interface';

const LoadVendor = createAction('[VendorCenter Table/API] Load Vendor');
const LoadVendorSuccess = createAction(
    '[VendorCenter Table/API] Load Vendor Success',
    props<{ vendors: VendorDisplay }>()
);
const LoadVendorFailure = createAction('[VendorCenter Table/API] Load Vendor Failure', props<{ error: Error }>());

const AddVendor = createAction('[VendorCenter Create/API] Add Vendor', props<{ vendor: VendorDisplay }>());
const AddVendorSuccess = createAction(
    '[VendorCenter Create/API] Add Vendor Success',
    props<{ vendor: VendorDisplay }>()
);
const AddVendorFailure = createAction('[VendorCenter Create/API] Add Vendor Failure', props<{ error: Error }>());

const UpdateVendor = createAction('[VendorCenter Update/API] Update Vendor', props<{ vendor: VendorDisplay }>());
const UpdateVendorSuccess = createAction(
    '[VendorCenter Update/API] Update Vendor Success',
    props<{ vendor: VendorDisplay }>()
);
const UpdateVendorFailure = createAction('[VendorCenter Update/API] Update Vendor Failure', props<{ error: Error }>());

const LoadCityAndStateDropDown = createAction(
    '[VendorCenter Update/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[VendorCenter Update/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[VendorCenter Update/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

export const VendorCenterIndividualActions = {
    LoadVendor,
    LoadVendorFailure,
    LoadVendorSuccess,
    AddVendor,
    AddVendorSuccess,
    AddVendorFailure,
    UpdateVendor,
    UpdateVendorSuccess,
    UpdateVendorFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
};
