import { createReducer, on } from '@ngrx/store';
import { AccessDisplay } from 'app/shared/interfaces/auxilium/access-center/access.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { AccessCenterIndividualActions } from '../actions/access-center-individual.actions';

export const featureKey = 'access-center-individual';

export interface State extends LoadingState {
    access: AccessDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    access: null,
};

export const reducer = createReducer(
    initialState,

    on(AccessCenterIndividualActions.AddAccess, state => ({ ...state, loading: true, error: null, email: null })),
    on(AccessCenterIndividualActions.AddAccessSuccess, (state, { access }) => ({ ...state, loading: false, access })),
    on(AccessCenterIndividualActions.AddAccessFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(AccessCenterIndividualActions.LoadAccess, state => ({ ...state, loading: true })),
    on(AccessCenterIndividualActions.LoadAccessSuccess, (state, { access }) => ({ ...state, loading: false, access })),
    on(AccessCenterIndividualActions.LoadAccessFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectAccess = (state: State) => state.access;
