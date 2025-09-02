import { createAction, props } from '@ngrx/store';
import {
    GetPayorOverrideResponse,
    PayorOverride,
} from 'app/shared/interfaces/auxilium/payor-center/payor-override.interface';
import { GetPayorResponse, Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';

const ResetState = createAction('[PayorCenter Table/API] Reset Payors State');

const LoadPayor = createAction('[PayorCenter Table/API] Load Payors');
const LoadPayorSuccess = createAction(
    '[PayorCenter Table/API] Load Payors Success',
    props<{ payor: GetPayorResponse }>()
);
const LoadPayorFailure = createAction('[PayorCenter Table/API] Load Payors Failure', props<{ error: Error }>());

const AddPayorQuickSave = createAction('[PayorCenter Table/API] Add Payor QuickSave', props<{ payor: Payor }>());
const AddPayorQuickSaveSuccess = createAction(
    '[PayorCenter Table/API] Add Payor QuickSave Success',
    props<{ id: Payor['id'] }>()
);
const AddPayorQuickSaveFailure = createAction(
    '[PayorCenter Table/API] Add Payor QuickSave Failure',
    props<{ error: Error }>()
);

const SavePayorOverride = createAction(
    '[PayorCenter Table/API] Save Payor Override',
    props<{ payorOverride: PayorOverride }>()
);
const SavePayorOverrideSuccess = createAction(
    '[PayorCenter Table/API] Save Payor Override Success',
    props<{ payorOverride: PayorOverride }>()
);
const SavePayorOverrideFailure = createAction(
    '[PayorCenter Table/API] Save Payor Override Failure',
    props<{ error: Error }>()
);

const LoadPayorDetails = createAction('[PayorCenter Table/API] Load Payor Details', props<{ id: number }>());
const LoadPayorDetailsSuccess = createAction(
    '[PayorCenter Table/API] Load Payor Details Success',
    props<{ payorDetails: Payor }>()
);
const LoadPayorDetailsFailure = createAction(
    '[PayorCenter Table/API] Load Payor Details Failure',
    props<{ error: Error }>()
);

const LoadPayorById = createAction('[PayorCenter API] Load Payor', props<{ id: number }>());
const LoadPayorByIdSuccess = createAction('[PayorCenter API] Load Payor Success', props<{ payorDetailsById: Payor }>());
const LoadPayorByIdFailure = createAction('[PayorCenter API] Load Payor Failure', props<{ error: Error }>());

const LoadPayorOverrides = createAction('[PayorCenter Table/API] Load Payor Overrides', props<{ filter: string }>());
const LoadPayorOverridesSuccess = createAction(
    '[PayorCenter Table/API] Load Payor Overrides Success',
    props<{ payorOverrides: GetPayorOverrideResponse }>()
);
const LoadPayorOverridesFailure = createAction(
    '[PayorCenter Table/API] Load Payor Overrides Failure',
    props<{ error: Error }>()
);

const DeletePayorOverride = createAction(
    '[PayorOverride/API] Delete Payor Override',
    props<{ payorOverride: PayorOverride }>()
);
const DeletePayorOverrideSuccess = createAction('[PayorOverride/API] Delete Payor Override Success');
const DeletePayorOverrideFailure = createAction(
    '[PayorOverride/API] Delete Payor Override Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PayorCenter Table/API] Refresh');
const RedirectPayorCenter = createAction('[Router] Redirect PayorCenter');
const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());

export const PayorCenterTableActions = {
    Refresh,
    ResetState,

    LoadPayor,
    LoadPayorSuccess,
    LoadPayorFailure,

    AddPayorQuickSave,
    AddPayorQuickSaveSuccess,
    AddPayorQuickSaveFailure,

    SavePayorOverride,
    SavePayorOverrideSuccess,
    SavePayorOverrideFailure,

    LoadPayorDetails,
    LoadPayorDetailsSuccess,
    LoadPayorDetailsFailure,

    DeletePayorOverride,
    DeletePayorOverrideSuccess,
    DeletePayorOverrideFailure,

    LoadPayorById,
    LoadPayorByIdSuccess,
    LoadPayorByIdFailure,
    LoadPayorOverrides,
    LoadPayorOverridesSuccess,
    LoadPayorOverridesFailure,
    RedirectPayorCenter,
    Navigate,
};
