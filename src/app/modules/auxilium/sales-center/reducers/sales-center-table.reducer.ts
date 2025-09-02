import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { GetSalesRepsResponse, SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { SalesCenterTableActions } from '../actions/sales-center-table.actions';

export const featureKey = 'sales-center-table';

export interface State extends LoadingState {
    salesreps: GetSalesRepsResponse;
    salesRepById: SalesRepDisplay;
    zipCodeLookup: GetPatientZipCodeLookUp;
}

const initialState: State = {
    loading: false,
    error: null,
    salesreps: [],
    salesRepById: null,
    zipCodeLookup: undefined,
};

export const reducer = createReducer(
    initialState,

    on(SalesCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(SalesCenterTableActions.LoadSalesReps, state => ({ ...initialState, loading: true })),
    on(SalesCenterTableActions.LoadSalesRepsSuccess, (state, { salesreps }) => ({
        ...state,
        loading: false,
        salesreps,
    })),
    on(SalesCenterTableActions.LoadSalesRepsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(SalesCenterTableActions.LoadSalesById, state => ({ ...state, loading: true })),
    on(SalesCenterTableActions.LoadSalesByIdSuccess, (state, { salesRepById }) => ({
        ...state,
        loading: false,
        salesRepById,
    })),
    on(SalesCenterTableActions.LoadSalesByIdFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(SalesCenterTableActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(SalesCenterTableActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(SalesCenterTableActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectSalesReps = (state: State) => state.salesreps;
export const selectSalesRepById = (state: State) => state.salesRepById;
export const selectSalesCityState = (state: State) => state.zipCodeLookup;
