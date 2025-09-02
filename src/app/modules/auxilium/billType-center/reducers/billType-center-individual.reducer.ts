import { createReducer, on } from '@ngrx/store';
import {
    BillTypeDisplay,
    GetBillTypeResponse,
} from 'app/shared/interfaces/auxilium/billType-center/billType.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { BillTypesCenterIndividualActions } from '../actions/billtype-center-individual.actions';

export const featureKey = 'billType-center-individual';

export interface State extends LoadingState {
    billTypes: GetBillTypeResponse;
    billType: BillTypeDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    billType: null,
    billTypes: [],
};

export const reducer = createReducer(
    initialState,

    on(BillTypesCenterIndividualActions.LoadBillType, state => ({ ...state, loading: true })),
    on(BillTypesCenterIndividualActions.LoadBillTypesuccess, (state, { billType }) => ({
        ...state,
        loading: false,
        billType,
    })),
    on(BillTypesCenterIndividualActions.LoadBillTypeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectBillType = (state: State) => state.billType;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.billTypes;
