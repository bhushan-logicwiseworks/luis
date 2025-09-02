import { createAction, props } from '@ngrx/store';
import { GetIntakesResponse } from 'app/shared/interfaces/auxilium/intake-center/intake.interface';

const resetState = createAction('[Feature] Reset State');

const LoadIntake = createAction('[IntakeCenter Table/API] Load Intake', props<{ filter: string }>());
const LoadIntakeSuccess = createAction(
    '[IntakeCenter Table/API] Load Intake Success',
    props<{ Intakes: GetIntakesResponse }>()
);
const LoadIntakeFailure = createAction('[IntakeCenter Table/API] Load Intake Failure', props<{ error: Error }>());

export const IntakeCenterTableActions = {
    resetState,
    LoadIntake,
    LoadIntakeSuccess,
    LoadIntakeFailure,
};
