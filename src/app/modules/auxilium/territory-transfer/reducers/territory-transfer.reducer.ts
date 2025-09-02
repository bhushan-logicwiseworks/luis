import { createReducer, on } from '@ngrx/store';

import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { TerritoryTransferActions } from '../actions/territory-transfer.actions';

export const featureKey = 'territory-transfer-table';

export interface State extends LoadingState {
    salesReps: any;
    patientCategory: any;
}

interface IdEntity {
    id: number;
}

const initialState: State = {
    loading: false,
    error: null,
    salesReps: [],
    patientCategory: [],
};

export const reducer = createReducer(
    initialState,

    on(TerritoryTransferActions.resetState, () => {
        return initialState;
    }),

    on(TerritoryTransferActions.LoadSalesReps, state => ({ ...state, loading: true })),
    on(TerritoryTransferActions.LoadSalesRepsSuccess, (state, { salesReps }) => ({
        ...state,
        loading: false,
        salesReps: salesReps,
    })),
    on(TerritoryTransferActions.LoadSalesRepsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(TerritoryTransferActions.LoadCategories, state => ({ ...state, loading: true })),
    on(TerritoryTransferActions.LoadCategoriesSuccess, (state, { patientCategory }) => ({
        ...state,
        loading: false,
        patientCategory: patientCategory,
    })),
    on(TerritoryTransferActions.LoadCategoriesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectSalesResp = (state: State) => state.salesReps;
export const selectPatientCategory = (state: State) => state.patientCategory;
