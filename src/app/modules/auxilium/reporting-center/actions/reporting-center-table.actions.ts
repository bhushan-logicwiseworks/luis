import { createAction, props } from '@ngrx/store';
import { Report } from 'app/shared/interfaces/auxilium/report-center/report.interface';
import { ReportEntity } from 'app/shared/interfaces/auxilium/report-center/reportentity.entity';

const ResetState = createAction('[ReportCenter Table/API] Reset Reports State');

const LoadReports = createAction('[ReportCenter Table/API] Load Reports', props<{ filter: string }>());
const LoadReportsSuccess = createAction('[ReportCenter Table/API] Load Reports Success', props<{ report: Report }>());
const LoadReportsFailure = createAction('[ReportCenter Table/API] Load Reports Failure', props<{ error: Error }>());

const AddReportQuickSave = createAction('[ReportCenter Table/API] Add Report QuickSave', props<{ report: Report }>());
const AddReportQuickSaveSuccess = createAction(
    '[ReportCenter Table/API] Add Report QuickSave Success',
    props<{ id: Report['id'] }>()
);
const AddReportQuickSaveFailure = createAction(
    '[ReportCenter Table/API] Add Report QuickSave Failure',
    props<{ error: Error }>()
);

const ReportSearch = createAction('[ReportCenter Table/API] Report Search', props<{ ReportSearch: Report }>());
const ReportSearchSuccess = createAction('[ReportCenter Table/API] Report Search Success', props<{ report: Report }>());
const ReportSearchFailure = createAction('[ReportCenter Table/API] Report Search Failure', props<{ error: Error }>());

const DeleteReport = createAction('[ReportCenter Delete/API] Delete Report', props<{ dto: ReportEntity }>());
const DeleteReportSuccess = createAction('[ReportCenter Delete/API] Delete Report Success');
const DeleteReportFailure = createAction('[ReportCenter Delete/API] Delete Report Failure', props<{ error: Error }>());

const Refresh = createAction('[ReportCenter Table/API] Refresh');

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());
const RedirectReportCenter = createAction('[Router] Redirect ReportCenter');

export const ReportCenterTableActions = {
    LoadReports,
    LoadReportsSuccess,
    LoadReportsFailure,
    AddReportQuickSave,
    AddReportQuickSaveSuccess,
    AddReportQuickSaveFailure,
    ReportSearch,
    ReportSearchSuccess,
    ReportSearchFailure,
    DeleteReport,
    DeleteReportSuccess,
    DeleteReportFailure,
    Refresh,
    ResetState,
    Navigate,
    RedirectReportCenter,
};
