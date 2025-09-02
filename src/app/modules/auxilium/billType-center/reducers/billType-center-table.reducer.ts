import { createReducer, on } from '@ngrx/store';
import { GetBillTypeResponse } from 'app/shared/interfaces/auxilium/billType-center/billType.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { BillTypesCenterTableActions } from '../actions/billtype-center-table.actions';

export const featureKey = 'billType-center-table';

export interface State extends LoadingState {
    billTypes: GetBillTypeResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    billTypes: [],
};

export const reducer = createReducer(
    initialState,

    on(BillTypesCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(BillTypesCenterTableActions.LoadBillTypes, state => ({ ...initialState, loading: true })),
    on(BillTypesCenterTableActions.LoadBillTypesSuccess, (state, { billTypes }) => ({
        ...state,
        loading: false,
        billTypes,
    })),
    on(BillTypesCenterTableActions.LoadBillTypesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectBillTypesReps = (state: State) => state.billTypes;
