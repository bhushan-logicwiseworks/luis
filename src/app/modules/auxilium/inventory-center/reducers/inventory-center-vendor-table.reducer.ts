import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { VendorRecord } from '../../../../shared/interfaces/auxilium/inventory-center/vendor.interface';
import { DropdownDisplay } from '../../../../shared/interfaces/auxilium/patient-center/patient-status.interface';
import { InventoryCenterVendorTableActions } from '../actions/inventory-center-vendor-table.actions';

export const featureKey = 'inventory-center-vendor-table';

export interface State extends LoadingState {
    data: VendorRecord[];
    vendorCode: DropdownDisplay[];
}

const initialState: State = {
    loading: false,
    error: null,
    data: [],
    vendorCode: [],
};

export const reducer = createReducer(
    initialState,
    on(InventoryCenterVendorTableActions.LoadVendor, state => ({ ...state, loading: true })),
    on(InventoryCenterVendorTableActions.LoadVendorSuccess, (state, { data }) => ({ ...state, loading: false, data })),
    on(InventoryCenterVendorTableActions.LoadVendorFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(InventoryCenterVendorTableActions.VendorCodeDropdown, state => ({ ...state, loading: true })),
    on(InventoryCenterVendorTableActions.VendorCodeDropdownSuccess, (state, { vendorCode }) => ({
        ...state,
        loading: false,
        vendorCode,
    })),
    on(InventoryCenterVendorTableActions.VendorCodeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectVendorList = (state: State) => state.data;
export const selectVendorCodes = (state: State) => state.vendorCode;
