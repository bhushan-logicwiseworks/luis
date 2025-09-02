import { createReducer, on } from '@ngrx/store';
import { GetCareManagementsResponse } from 'app/shared/interfaces/auxilium/caremanagement-center/caremanagement.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { CareManagementCenterTableActions } from '../actions/caremanagement-center-table.actions';

export const featureKey = 'compliance-center-table';

export interface State extends LoadingState {
    CareManagements: GetCareManagementsResponse;
}

// interface IdEntity {
//   id: number;
// }

const initialState: State = {
    loading: false,
    error: null,
    CareManagements: [],
};

export const reducer = createReducer(
    initialState,
    on(CareManagementCenterTableActions.resetState, () => initialState),

    on(CareManagementCenterTableActions.LoadCareManagement, state => ({ ...initialState, loading: true })),
    on(CareManagementCenterTableActions.LoadCareManagementSuccess, (state, { CareManagements }) => ({
        ...state,
        loading: false,
        CareManagements,
    })),
    on(CareManagementCenterTableActions.LoadCareManagementFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectCareManagements = (state: State) => state.CareManagements;
