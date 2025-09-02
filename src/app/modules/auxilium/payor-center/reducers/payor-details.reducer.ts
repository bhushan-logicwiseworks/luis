import { createReducer, on } from '@ngrx/store';

import { GetCommonDropDownResponse } from 'app/shared/interfaces/auxilium/inventory-center/common-product-dropdown.interface';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PayorCenterDeatilsActions } from '../actions/payor-details.action';

export const featureKey = 'payor-center-detail';

export interface State {
    // additional entities state properties
    loading: boolean;
    error: Error;
    loaded: boolean;
    salesrep: GetPatientResponse;
    priceCode: GetCommonDropDownResponse;
    primaryBillForm: GetCommonDropDownResponse;
    payorType: GetCommonDropDownResponse;
    boxOne: GetCommonDropDownResponse;
    financialclass: GetCommonDropDownResponse;
    claimindicator: GetCommonDropDownResponse;
    clearinghouse: GetCommonDropDownResponse;
}

export const initialState: State = {
    // additional entity state properties
    loading: false,
    error: null,
    loaded: false,

    priceCode: [],
    salesrep: [],
    primaryBillForm: [],
    payorType: [],
    boxOne: [],
    financialclass: [],
    claimindicator: [],
    clearinghouse: [],
};

export const reducer = createReducer(
    initialState,

    on(PayorCenterDeatilsActions.ResetState, () => {
        return initialState;
    }),

    on(PayorCenterDeatilsActions.LoadPriceCodeDropDown, state => ({ ...state, loading: true })),
    on(PayorCenterDeatilsActions.LoadPriceCodeDropDownSuccess, (state, { priceCode }) => ({
        ...state,
        loading: false,
        priceCode,
    })),
    on(PayorCenterDeatilsActions.LoadPriceCodeDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDown, state => ({ ...state, loading: true })),
    on(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDownSuccess, (state, { primaryBillForm }) => ({
        ...state,
        loading: false,
        primaryBillForm,
    })),
    on(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorCenterDeatilsActions.LoadPayorTypeDropDown, state => ({ ...state, loading: true })),
    on(PayorCenterDeatilsActions.LoadPayorTypeDropDownSuccess, (state, { payorType }) => ({
        ...state,
        loading: false,
        payorType,
    })),
    on(PayorCenterDeatilsActions.LoadPayorTypeDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorCenterDeatilsActions.LoadBoxOneDropDown, state => ({ ...state, loading: true })),
    on(PayorCenterDeatilsActions.LoadBoxOneDropDownSuccess, (state, { boxOne }) => ({
        ...state,
        loading: false,
        boxOne,
    })),
    on(PayorCenterDeatilsActions.LoadBoxOneDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorCenterDeatilsActions.LoadClaimIndicatorDropDown, state => ({ ...state, loading: true })),
    on(PayorCenterDeatilsActions.LoadClaimIndicatorDropDownSuccess, (state, { claimindicator }) => ({
        ...state,
        loading: false,
        claimindicator,
    })),
    on(PayorCenterDeatilsActions.LoadClaimIndicatorDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorCenterDeatilsActions.LoadFinancialClassDown, state => ({ ...state, loading: true })),
    on(PayorCenterDeatilsActions.LoadFinancialClassDownSuccess, (state, { financialclass }) => ({
        ...state,
        loading: false,
        financialclass,
    })),
    on(PayorCenterDeatilsActions.LoadFinancialClassDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorCenterDeatilsActions.LoadPatientSalesRep, state => ({ ...state, loading: true })),
    on(PayorCenterDeatilsActions.LoadPatientSalesRepSuccess, (state, { salesrep }) => ({
        ...state,
        loading: false,
        salesrep,
    })),
    on(PayorCenterDeatilsActions.LoadPatientSalesRepFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorCenterDeatilsActions.LoadClearinghouseDropDown, state => ({ ...state, loading: true })),
    on(PayorCenterDeatilsActions.LoadClearinghouseDropDownSuccess, (state, { clearinghouse }) => ({
        ...state,
        loading: false,
        clearinghouse,
    })),
    on(PayorCenterDeatilsActions.LoadClearinghouseDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPayorPriceCode = (state: State) => state.priceCode;
export const selectPayorPrimaryBillForm = (state: State) => state.primaryBillForm;
export const selectPayorType = (state: State) => state.payorType;
export const selectPayorBoxOne = (state: State) => state.boxOne;
export const selectPayorClaimIndicator = (state: State) => state.claimindicator;
export const selectPatientSalesRep = (state: State) => state.salesrep;
export const selectPayorFinancialClass = (state: State) => state.financialclass;
export const selectPayorClearinghouse = (state: State) => state.clearinghouse;
