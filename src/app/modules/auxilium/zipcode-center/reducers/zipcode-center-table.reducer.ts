import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetZipCodesResponse } from 'app/shared/interfaces/auxilium/zipcode-center/zipcode.interface';
import { ZipCodeCenterTableActions } from '../actions/zipcode-center-table.actions';

export const featureKey = 'ZipCode-center-table';

export interface State extends LoadingState {
    zipcodes: GetZipCodesResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    zipcodes: [],
};

export const reducer = createReducer(
    initialState,

    on(ZipCodeCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(ZipCodeCenterTableActions.LoadZipCodes, state => ({ ...initialState, loading: true })),
    on(ZipCodeCenterTableActions.LoadZipCodesSuccess, (state, { zipcodes }) => ({
        ...state,
        loading: false,
        zipcodes,
    })),
    on(ZipCodeCenterTableActions.LoadZipCodesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectZipCodes = (state: State) => state.zipcodes;
