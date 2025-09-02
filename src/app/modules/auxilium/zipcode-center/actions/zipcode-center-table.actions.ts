import { createAction, props } from '@ngrx/store';
import { GetZipCodesResponse, ZipCodeDisplay } from 'app/shared/interfaces/auxilium/zipcode-center/zipcode.interface';

const ResetState = createAction('[ZipCodeCenter Table/API] Reset ZipCodes State');
const LoadZipCodes = createAction('[ZipCodeCenter Table/API] Load ZipCodes');
const LoadZipCodesSuccess = createAction(
    '[ZipCodeCenter Table/API] Load ZipCodes Success',
    props<{ zipcodes: GetZipCodesResponse }>()
);
const LoadZipCodesFailure = createAction('[ZipCodeCenter Table/API] Load ZipCodes Failure', props<{ error: Error }>());

const DeleteZipCode = createAction('[ZipCodeRepCenter Delete/API] Delete ZipCode', props<{ dto: ZipCodeDisplay }>());
const DeleteZipCodeSuccess = createAction('[ZipCodeRepCenter Delete/API] Delete ZipCode Success');
const DeleteZipCodeFailure = createAction(
    '[ZipCodeRepCenter Delete/API] Delete ZipCode Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[ZipCodeCenter Table/API] Refresh');

export const ZipCodeCenterTableActions = {
    LoadZipCodes,
    LoadZipCodesSuccess,
    LoadZipCodesFailure,
    Refresh,
    ResetState,
    DeleteZipCode,
    DeleteZipCodeSuccess,
    DeleteZipCodeFailure,
};
