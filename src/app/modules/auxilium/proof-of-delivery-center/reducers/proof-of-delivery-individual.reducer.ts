import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { SaveProofOfDelivery } from 'app/shared/interfaces/auxilium/proof-of-delivery-center/save-proof-of-delivery.interface';
import { ProofOfDeliveryIndividualActions } from '../actions/proof-of-delivery-individual.actions';

export const featureKey = 'patient-portal-individual';

export interface State extends LoadingState {
    saveProofOfDelivery: SaveProofOfDelivery;
}

const initialState: State = {
    loading: false,
    error: null,
    saveProofOfDelivery: null,
};

export const reducer = createReducer(
    initialState,

    on(ProofOfDeliveryIndividualActions.saveProofOfDelivery, state => ({
        ...state,
        loading: true,
        error: null,
        email: null,
    })),
    on(ProofOfDeliveryIndividualActions.saveProofOfDeliverySuccess, (state, { saveProofOfDelivery }) => ({
        ...state,
        loading: false,
        saveProofOfDelivery,
    })),
    on(ProofOfDeliveryIndividualActions.saveProofOfDeliveryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
