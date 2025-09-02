import { createReducer, on } from '@ngrx/store';
import { GetCompliancesResponse } from 'app/shared/interfaces/auxilium/compliance-center/compliance.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ComplianceCenterTableActions } from '../actions/compliance-center-table.actions';

export const featureKey = 'compliance-center-table';

export interface State extends LoadingState {
    Compliances: GetCompliancesResponse;
}

// interface IdEntity {
//   id: number;
// }

const initialState: State = {
    loading: false,
    error: null,
    Compliances: [],
};

export const reducer = createReducer(
    initialState,
    on(ComplianceCenterTableActions.resetState, () => initialState),

    on(ComplianceCenterTableActions.LoadCompliance, state => ({ ...initialState, loading: true })),
    on(ComplianceCenterTableActions.LoadComplianceSuccess, (state, { Compliances }) => ({
        ...state,
        loading: false,
        Compliances,
    })),
    on(ComplianceCenterTableActions.LoadComplianceFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectCompliances = (state: State) => state.Compliances;
