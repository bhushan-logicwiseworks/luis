import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetZipCodesResponse, ZipCodeDisplay } from 'app/shared/interfaces/auxilium/zipcode-center/zipcode.interface';
import { ZipCodeCenterIndividualActions } from '../actions/zipcode-center-individual.actions';

export const featureKey = 'ZipCode-center-individual';

export interface State extends LoadingState {
    zipcode: GetZipCodesResponse;
    zipcodes: ZipCodeDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    zipcodes: null,
    zipcode: [],
};

export const reducer = createReducer(
    initialState,

    on(ZipCodeCenterIndividualActions.LoadZipCode, state => ({ ...state, loading: true })),
    on(ZipCodeCenterIndividualActions.LoadZipCodeSuccess, (state, { zipcodes }) => ({
        ...state,
        loading: false,
        zipcodes,
    })),
    on(ZipCodeCenterIndividualActions.LoadZipCodeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectZipCode = (state: State) => state.zipcodes;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.zipcode;
