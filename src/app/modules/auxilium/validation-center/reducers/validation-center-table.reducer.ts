import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PhysicianDisplay } from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import {
    GetValidationResponse,
    Validation,
} from 'app/shared/interfaces/auxilium/validation-center/validation.interface';
import { ValidationCenterTableActions } from '../actions/validation-center-table.actions';

export const featureKey = 'validation-center-table';

export interface State extends LoadingState {
    validations: GetValidationResponse;
    taxonomy: PhysicianDisplay[];
    validation: Validation;
}

const initialState: State = {
    loading: false,
    error: null,
    validations: [],
    taxonomy: [],
    validation: null,
};

export const reducer = createReducer(
    initialState,

    on(ValidationCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(ValidationCenterTableActions.LoadValidations, state => ({ ...initialState, loading: true })),
    on(ValidationCenterTableActions.LoadValidationsSuccess, (state, { validations }) => ({
        ...state,
        loading: false,
        validations,
    })),
    on(ValidationCenterTableActions.LoadValidationsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(ValidationCenterTableActions.LoadTaxonomy, state => ({ ...state, loading: true })),
    on(ValidationCenterTableActions.LoadTaxonomySuccess, (state, { taxonomy }) => ({
        ...state,
        loading: false,
        taxonomy,
    })),
    on(ValidationCenterTableActions.LoadTaxonomyFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ValidationCenterTableActions.LoadValidationById, state => ({ ...initialState, loading: true })),
    on(ValidationCenterTableActions.LoadValidationByIdSuccess, (state, { validation }) => ({
        ...state,
        loading: false,
        validation,
    })),
    on(ValidationCenterTableActions.LoadValidationByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectValidations = (state: State) => state.validations;
export const selecttaxonomy = (state: State) => state.taxonomy;
export const selectValidationById = (state: State) => state.validation;
