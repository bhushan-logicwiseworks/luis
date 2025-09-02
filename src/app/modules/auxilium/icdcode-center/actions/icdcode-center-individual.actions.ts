import { createAction, props } from '@ngrx/store';
import { ICDCodeDisplay } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';

const LoadIcdCode = createAction('[IcdCodeCenter Table/API] Load IcdCode');
const LoadIcdCodeSuccess = createAction(
    '[IcdCodeCenter Table/API] Load IcdCode Success',
    props<{ icdcode: ICDCodeDisplay }>()
);
const LoadIcdCodeFailure = createAction('[IcdCodeCenter Table/API] Load IcdCode Failure', props<{ error: Error }>());

const AddIcdCode = createAction('[IcdCodeCenter Create/API] Add IcdCode', props<{ icdcode: ICDCodeDisplay }>());
const AddIcdCodeSuccess = createAction(
    '[IcdCodeCenter Create/API] Add IcdCode Success',
    props<{ icdcode: ICDCodeDisplay }>()
);
const AddIcdCodeFailure = createAction('[IcdCodeCenter Create/API] Add IcdCode Failure', props<{ error: Error }>());

const UpdateIcdCode = createAction('[IcdCodeCenter Update/API] Update IcdCode', props<{ icdcode: ICDCodeDisplay }>());
const UpdateIcdCodeSuccess = createAction(
    '[IcdCodeCenter Update/API] Update IcdCode Success',
    props<{ icdcode: ICDCodeDisplay }>()
);
const UpdateIcdCodeFailure = createAction(
    '[IcdCodeCenter Update/API] Update IcdCode Failure',
    props<{ error: Error }>()
);

const LoadIcdCodeById = createAction('[IcdCodeCenter API] Load IcdCode', props<{ id: string }>());
const LoadIcdCodeByIdSuccess = createAction(
    '[IcdCodeCenter API] Load IcdCode Success',
    props<{ icdcode: ICDCodeDisplay }>()
);
const LoadIcdCodeByIdFailure = createAction('[IcdCodeCenter API] Load IcdCode Failure', props<{ error: Error }>());

export const IcdCodesCenterIndividualActions = {
    LoadIcdCode,
    LoadIcdCodeFailure,
    LoadIcdCodeSuccess,
    AddIcdCode,
    AddIcdCodeSuccess,
    AddIcdCodeFailure,
    UpdateIcdCode,
    UpdateIcdCodeSuccess,
    UpdateIcdCodeFailure,
    LoadIcdCodeById,
    LoadIcdCodeByIdSuccess,
    LoadIcdCodeByIdFailure,
};
