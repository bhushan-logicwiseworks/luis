import { createAction, props } from '@ngrx/store';
import { LocationBinDisplay } from '../../../../shared/interfaces/auxilium/inventory-center/location-bin-list.interface';
import { LocationCodeDisplay } from '../../../../shared/interfaces/auxilium/inventory-center/location-code-list.interface';
import { LocationList } from '../../../../shared/interfaces/auxilium/inventory-center/location-list.interface';

const LoadLocation = createAction(
    '[Patient LoadLocation/API] Load LoadLocation',
    props<{ productId: LocationList['id']; location: string }>()
);
const LoadLocationSuccess = createAction(
    '[Patient LoadLocation/API] Load LoadLocation Success',
    props<{ data: LocationList[] }>()
);
const LoadLocationFailure = createAction(
    '[Patient LoadLocation/API] Load LoadLocation Failure',
    props<{ error: Error }>()
);

const AddLocation = createAction('[InventoryCenter Create/API] Add Location', props<{ location: LocationList }>());
const AddLocationSuccess = createAction(
    '[InventoryCenter Create/API] Add Location Success',
    props<{ location: LocationList }>()
);
const AddLocationFailure = createAction('[InventoryCenter Create/API] Add Location Failure', props<{ error: Error }>());

const LocationBinDropdown = createAction('[LocationBin Table/API] Load LocationBin DropDown');
const LocationBinDropdownSuccess = createAction(
    '[LocationBin Table/API] Load LocationBin DropDown Success',
    props<{ locationBin: LocationBinDisplay[] }>()
);
const LocationBinDropdownFailure = createAction(
    '[LocationBin Table/API] Load LocationBin DropDown Failure',
    props<{ error: Error }>()
);

const LocationCodeDropdown = createAction('[LocationCode Table/API] Load LocationCode DropDown');
const LocationCodeDropdownSuccess = createAction(
    '[LocationCode Table/API] Load LocationCode DropDown Success',
    props<{ locationCode: LocationCodeDisplay[] }>()
);
const LocationCodeDropdownFailure = createAction(
    '[LocationCode Table/API] Load LocationCode DropDown Failure',
    props<{ error: Error }>()
);
export const InventoryCenterLocationListActions = {
    LoadLocation,
    LoadLocationSuccess,
    LoadLocationFailure,
    AddLocation,
    AddLocationSuccess,
    AddLocationFailure,
    LocationBinDropdown,
    LocationBinDropdownSuccess,
    LocationBinDropdownFailure,
    LocationCodeDropdown,
    LocationCodeDropdownSuccess,
    LocationCodeDropdownFailure,
};
