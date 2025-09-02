import { createAction, props } from '@ngrx/store';
import {
    BillTypeDisplay,
    GetBillTypeResponse,
} from 'app/shared/interfaces/auxilium/billType-center/billType.interface';

const ResetState = createAction('[BillTypesCenter Table/API] Reset BillTypes State');
const LoadBillTypes = createAction('[BillTypesCenter Table/API] Load BillTypes');
const LoadBillTypesSuccess = createAction(
    '[BillTypesCenter Table/API] Load BillTypes Success',
    props<{ billTypes: GetBillTypeResponse }>()
);
const LoadBillTypesFailure = createAction(
    '[BillTypesCenter Table/API] Load BillTypes Failure',
    props<{ error: Error }>()
);

const DeleteBillType = createAction('[BillTypeCenter Delete/API] Delete BillType', props<{ dto: BillTypeDisplay }>());
const DeleteBillTypesuccess = createAction('[BillTypeCenter Delete/API] Delete BillType Success');
const DeleteBillTypeFailure = createAction(
    '[BillTypeCenter Delete/API] Delete BillType Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[BillTypesCenter Table/API] Refresh');

export const BillTypesCenterTableActions = {
    LoadBillTypes,
    LoadBillTypesSuccess,
    LoadBillTypesFailure,
    Refresh,
    ResetState,
    DeleteBillType,
    DeleteBillTypesuccess,
    DeleteBillTypeFailure,
};
