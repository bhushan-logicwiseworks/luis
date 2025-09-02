import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ReferralDisplay } from 'app/shared/interfaces/auxilium/referral-center/referral.interface';
import { ReferralCenterIndividualActions } from '../actions/referral-center-individual.actions';

export const featureKey = 'referral-center-new-individual';

export interface State extends LoadingState {
    salesrep: ReferralDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    salesrep: null,
};

export const reducer = createReducer(
    initialState,
    on(ReferralCenterIndividualActions.LoadReferral, state => ({ ...state, loading: true })),
    on(ReferralCenterIndividualActions.LoadReferralSuccess, (state, { referral }) => ({
        ...state,
        loading: false,
        referral,
    })),
    on(ReferralCenterIndividualActions.LoadReferralFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectSalesRep = (state: State) => state.salesrep;
export const selectError = (state: State) => state.error;
