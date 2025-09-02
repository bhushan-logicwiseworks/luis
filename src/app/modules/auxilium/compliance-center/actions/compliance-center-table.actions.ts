import { createAction, props } from '@ngrx/store';
import { GetCompliancesResponse } from 'app/shared/interfaces/auxilium/compliance-center/compliance.interface';

const resetState = createAction('[Feature] Reset State');

const LoadCompliance = createAction('[ComplianceCenter Table/API] Load Compliance', props<{ filter: string }>());
const LoadComplianceSuccess = createAction(
    '[ComplianceCenter Table/API] Load Compliance Success',
    props<{ Compliances: GetCompliancesResponse }>()
);
const LoadComplianceFailure = createAction(
    '[ComplianceCenter Table/API] Load Compliance Failure',
    props<{ error: Error }>()
);

export const ComplianceCenterTableActions = {
    resetState,
    LoadCompliance,
    LoadComplianceSuccess,
    LoadComplianceFailure,
};
