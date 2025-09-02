import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { LocationBinDisplay } from '../../../../shared/interfaces/auxilium/inventory-center/location-bin-list.interface';
import { LocationCodeDisplay } from '../../../../shared/interfaces/auxilium/inventory-center/location-code-list.interface';
import { LocationList } from '../../../../shared/interfaces/auxilium/inventory-center/location-list.interface';
import { InventoryCenterLocationListActions } from '../actions/inventory-center-location-list.actions';

export const featureKey = 'inventory-center-location-list';

export interface State extends LoadingState {
    data: LocationList[];
    locationBin: LocationBinDisplay[];
    locationCode: LocationCodeDisplay[];
}

const initialState: State = {
    loading: false,
    error: null,
    data: [],
    locationBin: [],
    locationCode: [],
};

export const reducer = createReducer(
    initialState,
    on(InventoryCenterLocationListActions.LoadLocation, state => ({ ...state, loading: true })),
    on(InventoryCenterLocationListActions.LoadLocationSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        data,
    })),
    on(InventoryCenterLocationListActions.LoadLocationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(InventoryCenterLocationListActions.LocationBinDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterLocationListActions.LocationBinDropdownSuccess, (state, { locationBin }) => ({
        ...state,
        loading: false,
        locationBin,
    })),
    on(InventoryCenterLocationListActions.LocationBinDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(InventoryCenterLocationListActions.LocationCodeDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterLocationListActions.LocationCodeDropdownSuccess, (state, { locationCode }) => ({
        ...state,
        loading: false,
        locationCode,
    })),
    on(InventoryCenterLocationListActions.LocationCodeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectLocationList = (state: State) => state.data;
export const selectLocationBinList = (state: State) => state.locationBin;
export const selectLocationCodeList = (state: State) => state.locationCode;
