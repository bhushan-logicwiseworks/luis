import { createAction, props } from '@ngrx/store';

const resetState = createAction('[Feature] Reset State');

const LoadSalesReps = createAction('[Territory] Load Sales Reps');
const LoadSalesRepsSuccess = createAction('[Territory/API] Load Sales Reps Success', props<{ salesReps }>());
const LoadSalesRepsFailure = createAction('[Reorders/API] Load Sales Reps Failure', props<{ error: Error }>());

const LoadCategories = createAction('[Territory] Load Patient Categories');
const LoadCategoriesSuccess = createAction(
    '[Territory/API] Load Patient Categories Success',
    props<{ patientCategory }>()
);
const LoadCategoriesFailure = createAction('[Reorders/API] Load Patient Categories Failure', props<{ error: Error }>());

const AddTerritoryTransfer = createAction('[Territory] Territory Transfer', props<{ TerritoryTransfer: any }>());
const AddTerritoryTransferSuccess = createAction(
    '[Territory/API] Load Territory Transfer Success',
    props<{ TerritoryTransfer }>()
);
const AddTerritoryTransferFailure = createAction(
    '[Territory/API] Load Territory Transfer Failure',
    props<{ error: Error }>()
);

export const TerritoryTransferActions = {
    resetState,
    LoadSalesReps,
    LoadSalesRepsSuccess,
    LoadSalesRepsFailure,
    LoadCategories,
    LoadCategoriesSuccess,
    LoadCategoriesFailure,
    AddTerritoryTransfer,
    AddTerritoryTransferSuccess,
    AddTerritoryTransferFailure,
};
