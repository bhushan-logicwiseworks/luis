import { createAction, props } from '@ngrx/store';
import { GetIcdCodeResponse, ICDCodeDisplay } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';

const ResetState = createAction('[IcdCodeCenter Table/API] Reset IcdCode State');
const LoadIcdCodes = createAction('[IcdCodeCenter Table/API] Load IcdCode');
const LoadIcdCodesSuccess = createAction(
    '[IcdCodeCenter Table/API] Load IcdCode Success',
    props<{ icdcodes: GetIcdCodeResponse }>()
);
const LoadIcdCodesFailure = createAction('[IcdCodeCenter Table/API] Load IcdCode Failure', props<{ error: Error }>());

const DeleteIcdCode = createAction('[IcdCodeCenter Delete/API] Delete IcdCode', props<{ dto: ICDCodeDisplay }>());
const DeleteIcdCodesuccess = createAction('[IcdCodeCenter Delete/API] Delete IcdCode Success');
const DeleteIcdCodeFailure = createAction(
    '[IcdCodeCenter Delete/API] Delete IcdCode Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[IcdCodeCenter Table/API] Refresh');

export const IcdCodeCenterTableActions = {
    LoadIcdCodes,
    LoadIcdCodesSuccess,
    LoadIcdCodesFailure,
    Refresh,
    ResetState,
    DeleteIcdCode,
    DeleteIcdCodesuccess,
    DeleteIcdCodeFailure,
};
