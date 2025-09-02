import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetReportResponse } from 'app/shared/interfaces/auxilium/report-center/report.interface';
import { ReportCenterTableActions } from '../actions/reporting-center-table.actions';

export const featureKey = 'report-center-table';

export interface State extends LoadingState {
    report: GetReportResponse | any;
    id: number;
}

const initialState: State = {
    loading: false,
    error: null,
    report: [],
    id: null,
};

export const reducer = createReducer(
    initialState,

    on(ReportCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(ReportCenterTableActions.LoadReports, state => ({ ...initialState, loading: true })),
    on(ReportCenterTableActions.LoadReportsSuccess, (state, { report }) => ({ ...state, loading: false, report })),
    on(ReportCenterTableActions.LoadReportsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ReportCenterTableActions.AddReportQuickSave, state => ({ ...state, loading: true })),
    on(ReportCenterTableActions.AddReportQuickSaveSuccess, (state, { id }) => ({ ...state, loading: false, id })),
    on(ReportCenterTableActions.AddReportQuickSaveFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ReportCenterTableActions.ReportSearch, state => ({ ...state, loading: true })),
    on(ReportCenterTableActions.ReportSearchSuccess, (state, { report }) => ({ ...state, loading: false, report })),
    on(ReportCenterTableActions.ReportSearchFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectReports = (state: State) => state.report;
export const selectReport = (state: State) => state.id;
