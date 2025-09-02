import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPayorOverrideResponse } from 'app/shared/interfaces/auxilium/payor-center/payor-override.interface';
import { GetPayorResponse, Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import { PayorCenterTableActions } from '../actions/payor-center-table.actions';

export const featureKey = 'payor-center-table';

export interface State extends LoadingState {
    payor: GetPayorResponse;
    payorDetails: Payor;
    id: number;
    payorDetailsById: Payor;
    payorOverrideId: number;
    payorOverrides: GetPayorOverrideResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    payor: null,
    payorDetails: null,
    id: null,
    payorDetailsById: null,
    payorOverrideId: null,
    payorOverrides: [],
};

export const reducer = createReducer(
    initialState,
    on(PayorCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(PayorCenterTableActions.LoadPayor, state => ({ ...initialState, loading: true })),
    on(PayorCenterTableActions.LoadPayorSuccess, (state, { payor }) => ({ ...state, loading: false, payor })),
    on(PayorCenterTableActions.LoadPayorFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PayorCenterTableActions.AddPayorQuickSave, state => ({ ...state, loading: true })),
    on(PayorCenterTableActions.AddPayorQuickSaveSuccess, (state, { id }) => ({ ...state, loading: false, id })),
    on(PayorCenterTableActions.AddPayorQuickSaveFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PayorCenterTableActions.SavePayorOverride, state => ({ ...state, loading: true })),
    on(PayorCenterTableActions.SavePayorOverrideSuccess, state => ({ ...state, loading: false })),
    on(PayorCenterTableActions.SavePayorOverrideFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorCenterTableActions.LoadPayorDetails, state => ({ ...state, loading: true })),
    on(PayorCenterTableActions.LoadPayorDetailsSuccess, (state, { payorDetails }) => ({
        ...state,
        loading: false,
        payorDetails,
    })),
    on(PayorCenterTableActions.LoadPayorDetailsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PayorCenterTableActions.LoadPayorById, state => ({ ...state, loading: true })),
    on(PayorCenterTableActions.LoadPayorByIdSuccess, (state, { payorDetailsById }) => ({
        ...state,
        loading: false,
        payorDetailsById,
    })),
    on(PayorCenterTableActions.LoadPayorByIdFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PayorCenterTableActions.LoadPayorOverrides, state => ({ ...state, loading: true })),
    on(PayorCenterTableActions.LoadPayorOverridesSuccess, (state, { payorOverrides }) => ({
        ...state,
        loading: false,
        payorOverrides,
    })),
    on(PayorCenterTableActions.LoadPayorOverridesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PayorCenterTableActions.DeletePayorOverride, state => ({ ...state, loading: true })),
    on(PayorCenterTableActions.DeletePayorOverrideSuccess, state => ({ ...state, loading: false })),
    on(PayorCenterTableActions.DeletePayorOverrideFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPayor = (state: State) => state.payor;
export const selectPayorDetails = (state: State) => state.payorDetails;
export const selectPayorId = (state: State) => state.id;
export const selectPayorById = (state: State) => state.payorDetailsById;
export const selectPayorOverrideId = (state: State) => state.payorOverrideId;
export const selectPayorOverrides = (state: State) => state.payorOverrides;
