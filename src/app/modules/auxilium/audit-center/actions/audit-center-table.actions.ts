import { createAction, props } from '@ngrx/store';
import { GetAuditsResponse } from '../../../../shared/interfaces/auxilium/audit-center/audit.interface';

const resetState = createAction('[Feature] Reset State');

const LoadAudit = createAction('[AuditCenter Table/API] Load Audit', props<{ filter: string }>());
const LoadAuditSuccess = createAction(
    '[AuditCenter Table/API] Load Audit Success',
    props<{ Audits: GetAuditsResponse }>()
);
const LoadAuditFailure = createAction('[AuditCenter Table/API] Load Audit Failure', props<{ error: Error }>());

export const AuditCenterTableActions = {
    resetState,
    LoadAudit,
    LoadAuditSuccess,
    LoadAuditFailure,
};
