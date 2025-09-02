import { createAction, props } from '@ngrx/store';
import { EOBPatientDisplay } from '../../../../shared/interfaces/auxilium/bill-center/eob-patients.interface';
import {
    GetRemits835Response,
    Remits835Display,
} from '../../../../shared/interfaces/auxilium/bill-center/remits-835.interface';

const ResetState = createAction('[PostingCenter Table/API] Reset Charge State');

const LoadExplanationOfBenefits = createAction('[PostingCenter Table/API] Load Explanation Of Benefits');
const LoadExplanationOfBenefitsSuccess = createAction(
    '[PostingCenter Table/API] Load Explanation Of Benefits Success',
    props<{ eobdata: GetRemits835Response }>()
);
const LoadExplanationOfBenefitsFailure = createAction(
    '[PostingCenter Table/API] Load Explanation Of Benefits Failure',
    props<{ error: Error }>()
);

const DeleteExplanationOfBenefits = createAction(
    '[Remits835/API] Delete Patient Explanation Of Benefits',
    props<{ id: number }>()
);

const LoadEOBDetails = createAction('[InventoryCenter Details/API] Load EOB Details ', props<{ id: number }>());
const LoadEOBDetailsSuccess = createAction(
    '[InventoryCenter Details/API] Load EOB Details Success',
    props<{ eobinfo: Remits835Display }>()
);
const LoadEOBDetailsFailure = createAction(
    '[InventoryCenter Details/API] Load EOB Details Failure',
    props<{ error: Error }>()
);

const LoadEOB = createAction('[EOB] Load EOB', props<{ id: number }>());
const LoadEOBSuccess = createAction('[EOB] Load EOB Success', props<{ eob: string }>());

const LoadEOBFailure = createAction('[EOB] Load EOB Failure', props<{ error: any }>());

const LoadEOBById = createAction('[PostingCenter API] Load Eob', props<{ eobid: number }>());
const LoadEOBByIdSuccess = createAction(
    '[PostingCenter API] Load Eob Success',
    props<{ eobById: EOBPatientDisplay }>()
);
const LoadEOBByIdFailure = createAction('[PostingCenter API] Load Eob Failure', props<{ error: Error }>());

const LoadPatientEOBById = createAction(
    '[PostingCenter Table/API] Load Patient EOB By Id',
    props<{ eobid: number; refId: number }>()
);
const LoadPatientEOBByIdSuccess = createAction(
    '[PostingCenter Table/API] Load Patient EOB By Id Success',
    props<{ eob: string }>()
);
const LoadPatientEOBByIdFailure = createAction(
    '[PostingCenter Table/API] Load Patient EOB By Id Failure',
    props<{ error: Error }>()
);

const DeleteExplanationOfBenefitsSuccess = createAction(
    '[Remits835/API] Delete Patient Explanation Of Benefits Success',
    props<{ id: number }>()
);

const DeleteExplanationOfBenefitsFailure = createAction(
    '[Remits835/API] Delete Patient Explanation Of Benefits Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PostingCenter Table/API] Refresh');

export const PostingCenterTableActions = {
    LoadExplanationOfBenefits,
    LoadExplanationOfBenefitsSuccess,
    LoadExplanationOfBenefitsFailure,
    LoadEOBDetails,
    LoadEOBDetailsSuccess,
    LoadEOBDetailsFailure,
    LoadEOB,
    LoadEOBSuccess,
    LoadEOBFailure,
    LoadEOBById,
    LoadEOBByIdSuccess,
    LoadEOBByIdFailure,
    LoadPatientEOBById,
    LoadPatientEOBByIdSuccess,
    LoadPatientEOBByIdFailure,
    DeleteExplanationOfBenefits,
    DeleteExplanationOfBenefitsSuccess,
    DeleteExplanationOfBenefitsFailure,
    Refresh,
    ResetState,
};
