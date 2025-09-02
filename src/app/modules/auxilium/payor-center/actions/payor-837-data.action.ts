import { createAction, props } from '@ngrx/store';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';

const AddPayor837Data = createAction('[Payor 837 Data/API] Add Payor 837 Data', props<{ payor: Payor }>());
const AddPayor837DataSuccess = createAction(
    '[Payor 837 Data/API] Add Payor 837 Data Success',
    props<{ payor837Data: Payor }>()
);
const AddPayor837DataFailure = createAction(
    '[Payor 837 Data/API] Add Payor 837 Data Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Payor 837 Data/API] Refresh');

export const Payor837DataActions = {
    AddPayor837Data,
    AddPayor837DataSuccess,
    AddPayor837DataFailure,
    Refresh,
};
