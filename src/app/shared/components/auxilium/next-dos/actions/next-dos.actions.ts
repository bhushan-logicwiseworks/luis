import { createAction, props } from '@ngrx/store';
import { NextDosRequest, NextDosResponse } from '../../../../interfaces/auxilium/next-dos/next-dos.interface';

export const calculateNextDos = createAction('[Next DOS] Calculate Next DOS', props<NextDosRequest>());

export const calculateNextDosSuccess = createAction(
    '[Next DOS] Calculate Next DOS Success',
    props<{ response: NextDosResponse }>()
);

export const calculateNextDosFailure = createAction('[Next DOS] Calculate Next DOS Failure', props<{ error: any }>());

export const NextDosActions = {
    calculateNextDos,
    calculateNextDosSuccess,
    calculateNextDosFailure,
};
