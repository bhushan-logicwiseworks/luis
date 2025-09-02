import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetAuditsResponse } from '../../../../shared/interfaces/auxilium/audit-center/audit.interface';
import { AuditCenterTableActions } from '../actions/audit-center-table.actions';

export const featureKey = 'audit-center-table';

export interface State extends LoadingState {
    Audits: GetAuditsResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    Audits: [],
};

export const reducer = createReducer(
    initialState,
    on(AuditCenterTableActions.resetState, () => initialState),
    on(AuditCenterTableActions.LoadAudit, state => ({ ...initialState, loading: true })),
    on(AuditCenterTableActions.LoadAuditSuccess, (state, { Audits }) => ({
        ...state,
        loading: false,
        Audits,
    })),
    on(AuditCenterTableActions.LoadAuditFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectAudits = (state: State) => state.Audits;
