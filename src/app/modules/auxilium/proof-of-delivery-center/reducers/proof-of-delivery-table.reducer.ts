import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ProofOfDeliveryDetail } from 'app/shared/interfaces/auxilium/proof-of-delivery-center/proof-of-delivery.interface';
import { ProofOfDeliveryTableActions } from '../actions/proof-of-delivery-table.actions';

export const featureKey = 'proof-of-delivery-table';

export interface State extends LoadingState {
    getall: ProofOfDeliveryDetail[];
}

interface IdEntity {
    id: number;
}

const initialState: State = {
    loading: false,
    error: null,
    getall: [],
};

export const reducer = createReducer(
    initialState,

    on(ProofOfDeliveryTableActions.ResetState, () => {
        return initialState;
    }),

    on(ProofOfDeliveryTableActions.LoadProofOfDelivery, state => ({ ...initialState, loading: true })),
    on(ProofOfDeliveryTableActions.LoadProofOfDeliverySuccess, (state, { getall }) => ({
        ...state,
        loading: false,
        getall,
    })),
    on(ProofOfDeliveryTableActions.LoadProofOfDeliveryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(ProofOfDeliveryTableActions.ProofOfDeliverySearch, state => ({ ...state, loading: true })),
    on(ProofOfDeliveryTableActions.ProofOfDeliverySearchSuccess, (state, { getall }) => ({
        ...state,
        loading: false,
        getall: getall,
    })),
    on(ProofOfDeliveryTableActions.ProofOfDeliverySearchFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(ProofOfDeliveryTableActions.ProofOfDeliverySearch, state => ({ ...state, loading: true })),
    on(ProofOfDeliveryTableActions.ProofOfDeliverySearchSuccess, (state, { getall }) => ({
        ...state,
        loading: false,
        getall,
    })),
    on(ProofOfDeliveryTableActions.ProofOfDeliverySearchFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectProofOfDelivery = (state: State) => state.getall;
