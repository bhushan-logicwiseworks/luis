import { createAction, props } from '@ngrx/store';
import { GetCareManagementsResponse } from 'app/shared/interfaces/auxilium/caremanagement-center/caremanagement.interface';

const resetState = createAction('[Feature] Reset State');

const LoadCareManagement = createAction(
    '[CareManagementCenter Table/API] Load CareManagement',
    props<{ filter: string }>()
);
const LoadCareManagementSuccess = createAction(
    '[CareManagementCenter Table/API] Load CareManagement Success',
    props<{ CareManagements: GetCareManagementsResponse }>()
);
const LoadCareManagementFailure = createAction(
    '[CareManagementCenter Table/API] Load CareManagement Failure',
    props<{ error: Error }>()
);

export const CareManagementCenterTableActions = {
    resetState,
    LoadCareManagement,
    LoadCareManagementSuccess,
    LoadCareManagementFailure,
};
