import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import {
    GetPhysicianResponse,
    PhysicianDisplay,
} from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import { PhysicianCenterTableActions } from '../actions/physician-center-table.actions';

export const featureKey = 'sales-center-table';

export interface State extends LoadingState {
    physicians: GetPhysicianResponse;
    taxonomy: PhysicianDisplay[];
    physician: PhysicianDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    physicians: [],
    taxonomy: [],
    physician: null,
};

export const reducer = createReducer(
    initialState,

    on(PhysicianCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(PhysicianCenterTableActions.LoadPhysicians, state => ({ ...initialState, loading: true })),
    on(PhysicianCenterTableActions.LoadPhysiciansSuccess, (state, { physicians }) => ({
        ...state,
        loading: false,
        physicians,
    })),
    on(PhysicianCenterTableActions.LoadPhysiciansFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PhysicianCenterTableActions.LoadTaxonomy, state => ({ ...state, loading: true })),
    on(PhysicianCenterTableActions.LoadTaxonomySuccess, (state, { taxonomy }) => ({
        ...state,
        loading: false,
        taxonomy,
    })),
    on(PhysicianCenterTableActions.LoadTaxonomyFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PhysicianCenterTableActions.LoadPhysicianById, state => ({ ...initialState, loading: true })),
    on(PhysicianCenterTableActions.LoadPhysicianByIdSuccess, (state, { physician }) => ({
        ...state,
        loading: false,
        physician,
    })),
    on(PhysicianCenterTableActions.LoadPhysicianByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPhysicians = (state: State) => state.physicians;
export const selecttaxonomy = (state: State) => state.taxonomy;
export const selectPhysicianById = (state: State) => state.physician;
