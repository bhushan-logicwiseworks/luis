import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import {
    GetReferralResponse,
    ReferralDetails,
} from 'app/shared/interfaces/auxilium/referral-center/referral.interface';
import { GetSalesRepsResponse } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { ReferralCenterTableActions } from '../actions/referral-center-table.actions';

export const featureKey = 'referral-center-new-table';

export interface State extends LoadingState {
    referrals: GetReferralResponse;
    salesreps: GetSalesRepsResponse;
    zipCodeLookup: GetPatientZipCodeLookUp;
    Referral: ReferralDetails;
}

const initialState: State = {
    loading: false,
    error: null,
    salesreps: [],
    referrals: [],
    zipCodeLookup: undefined,
    Referral: null,
};

export const reducer = createReducer(
    initialState,

    on(ReferralCenterTableActions.ResetState, () => {
        return initialState;
    }),
    on(ReferralCenterTableActions.ResetStateZipCode, state => ({ ...state, zipCodeLookup: null })),

    on(ReferralCenterTableActions.LoadReferrals, state => ({ ...initialState, loading: true })),
    on(ReferralCenterTableActions.LoadReferralsSuccess, (state, { referrals }) => ({
        ...state,
        loading: false,
        referrals,
    })),
    on(ReferralCenterTableActions.LoadReferralsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ReferralCenterTableActions.LoadSalesRepDropDown, state => ({ ...state, loading: true })),
    on(ReferralCenterTableActions.LoadSalesRepDropDownSuccess, (state, { salesreps }) => ({
        ...state,
        loading: false,
        salesreps,
    })),
    on(ReferralCenterTableActions.LoadSalesRepDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(ReferralCenterTableActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(ReferralCenterTableActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(ReferralCenterTableActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(ReferralCenterTableActions.LoadReferralById, state => ({ ...initialState, loading: true })),
    on(ReferralCenterTableActions.LoadReferralByIdSuccess, (state, { Referral }) => ({
        ...state,
        loading: false,
        Referral,
    })),
    on(ReferralCenterTableActions.LoadReferralByIdFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectReferrals = (state: State) => state.referrals;
export const selectsalesreps = (state: State) => state.salesreps;
export const selectZipCode = (state: State) => state.zipCodeLookup;
export const selectReferralById = (state: State) => state.Referral;
