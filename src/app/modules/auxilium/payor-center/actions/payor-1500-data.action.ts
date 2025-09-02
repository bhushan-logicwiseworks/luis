import { createAction, props } from '@ngrx/store';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';

const AddPayor1500Data = createAction('[Payor 1500 Data/API] Add Payor 1500 Data', props<{ payor: Payor }>());
const AddPayor1500DataSuccess = createAction(
    '[Payor 1500 Data/API] Add Payor 1500 Data Success',
    props<{ payor1500Data: Payor }>()
);
const AddPayor1500DataFailure = createAction(
    '[Payor 1500 Data/API] Add Payor 1500 Data Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Payor 1500 Data/API] Refresh');

export const Payor1500DataActions = {
    AddPayor1500Data,
    AddPayor1500DataSuccess,
    AddPayor1500DataFailure,
    Refresh,
};
