import { createAction, props } from '@ngrx/store';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';

const AddPayorBillOption = createAction('[Payor Bill option/API] Add Payor Bill option', props<{ payor: Payor }>());
const AddPayorBillOptionSuccess = createAction(
    '[Payor Bill option/API] Add Payor Bill option Success',
    props<{ payorBillOption: Payor }>()
);
const AddPayorBillOptionFailure = createAction(
    '[Payor Bill option/API] Add Payor Bill option Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Payor ContactType/API] Refresh');

export const PayorBillOptionActions = {
    AddPayorBillOption,
    AddPayorBillOptionSuccess,
    AddPayorBillOptionFailure,

    Refresh,
};
