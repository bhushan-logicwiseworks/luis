import { createAction, props } from '@ngrx/store';
import { BillTypeDisplay } from 'app/shared/interfaces/auxilium/billType-center/billType.interface';

const LoadBillType = createAction('[BillTypeCenter Table/API] Load BillType');
const LoadBillTypesuccess = createAction(
    '[BillTypeCenter Table/API] Load BillType Success',
    props<{ billType: BillTypeDisplay }>()
);
const LoadBillTypeFailure = createAction('[BillTypeCenter Table/API] Load BillType Failure', props<{ error: Error }>());

const AddBillType = createAction('[BillTypeCenter Create/API] Add BillType', props<{ billType: BillTypeDisplay }>());
const AddBillTypesuccess = createAction(
    '[BillTypeCenter Create/API] Add BillType Success',
    props<{ billType: BillTypeDisplay }>()
);
const AddBillTypeFailure = createAction('[BillTypeCenter Create/API] Add BillType Failure', props<{ error: Error }>());

const UpdateBillType = createAction(
    '[BillTypeCenter Update/API] Update BillType',
    props<{ billType: BillTypeDisplay }>()
);
const UpdateBillTypesuccess = createAction(
    '[BillTypeCenter Update/API] Update BillType Success',
    props<{ billType: BillTypeDisplay }>()
);
const UpdateBillTypeFailure = createAction(
    '[BillTypeCenter Update/API] Update BillType Failure',
    props<{ error: Error }>()
);

export const BillTypesCenterIndividualActions = {
    LoadBillType,
    LoadBillTypeFailure,
    LoadBillTypesuccess,
    AddBillType,
    AddBillTypesuccess,
    AddBillTypeFailure,
    UpdateBillType,
    UpdateBillTypesuccess,
    UpdateBillTypeFailure,
};
