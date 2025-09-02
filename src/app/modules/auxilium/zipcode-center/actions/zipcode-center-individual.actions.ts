import { createAction, props } from '@ngrx/store';
import { ZipCodeDisplay } from 'app/shared/interfaces/auxilium/zipcode-center/zipcode.interface';

const LoadZipCode = createAction('[ZipCodeCenter Table/API] Load ZipCode');
const LoadZipCodeSuccess = createAction(
    '[ZipCodeCenter Table/API] Load ZipCode Success',
    props<{ zipcodes: ZipCodeDisplay }>()
);
const LoadZipCodeFailure = createAction('[ZipCodeCenter Table/API] Load ZipCode Failure', props<{ error: Error }>());

const AddZipCode = createAction('[ZipCodeRepCenter Create/API] Add ZipCode', props<{ zipcode: ZipCodeDisplay }>());
const AddZipCodeSuccess = createAction(
    '[ZipCodeRepCenter Create/API] Add ZipCode Success',
    props<{ zipcode: ZipCodeDisplay }>()
);
const AddZipCodeFailure = createAction('[ZipCodeRepCenter Create/API] Add ZipCode Failure', props<{ error: Error }>());

const UpdateZipCode = createAction(
    '[ZipCodeRepCenter Update/API] Update ZipCode',
    props<{ zipcode: ZipCodeDisplay }>()
);
const UpdateZipCodeSuccess = createAction(
    '[ZipCodeRepCenter Update/API] Update ZipCode Success',
    props<{ zipcode: ZipCodeDisplay }>()
);
const UpdateZipCodeFailure = createAction(
    '[ZipCodeRepCenter Update/API] Update ZipCode Failure',
    props<{ error: Error }>()
);

export const ZipCodeCenterIndividualActions = {
    LoadZipCode,
    LoadZipCodeFailure,
    LoadZipCodeSuccess,
    AddZipCode,
    AddZipCodeSuccess,
    AddZipCodeFailure,
    UpdateZipCode,
    UpdateZipCodeSuccess,
    UpdateZipCodeFailure,
};
