import { createReducer, on } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetSalesRepsResponse, SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { SalesCenterIndividualActions } from '../actions/sales-center-individual.actions';

export const featureKey = 'sales-center-individual';

export interface State extends LoadingState {
    salesreps: GetSalesRepsResponse;
    salesrep: SalesRepDisplay;
    branch: GetBranchListResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    salesrep: null,
    salesreps: [],
    branch: [],
};

export const reducer = createReducer(
    initialState,

    on(SalesCenterIndividualActions.LoadSalesRep, state => ({ ...state, loading: true })),
    on(SalesCenterIndividualActions.LoadSalesRepSuccess, (state, { salesrep }) => ({
        ...state,
        loading: false,
        salesrep,
    })),
    on(SalesCenterIndividualActions.LoadSalesRepFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(SalesCenterIndividualActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(SalesCenterIndividualActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(SalesCenterIndividualActions.LoadBranchDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectSalesRep = (state: State) => state.salesrep;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.salesreps;
export const selectBranch = (state: State) => state.branch;
