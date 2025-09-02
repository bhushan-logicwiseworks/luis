import { createAction, props } from '@ngrx/store';
import { CodeDisplay, GetCodesResponse } from 'app/shared/interfaces/auxilium/code-center/code.interface';

const ResetState = createAction('[CodeCenter Table/API] Reset Codes State');
const LoadCodes = createAction('[CodeCenter Table/API] Load Codes');
const LoadCodesSuccess = createAction(
    '[CodeCenter Table/API] Load Codes Success',
    props<{ codelist: GetCodesResponse }>()
);
const LoadCodesFailure = createAction('[CodeCenter Table/API] Load Codes Failure', props<{ error: Error }>());

const DeleteCode = createAction('[CodeCenter Delete/API] Delete Code', props<{ dto: CodeDisplay }>());
const DeleteCodeSuccess = createAction('[CodeCenter Delete/API] Delete Code Success');
const DeleteCodeFailure = createAction('[CodeCenter Delete/API] Delete Code Failure', props<{ error: Error }>());

const Refresh = createAction('[CodeCenter Table/API] Refresh');

export const CodeCenterTableActions = {
    LoadCodes,
    LoadCodesSuccess,
    LoadCodesFailure,
    Refresh,
    ResetState,
    DeleteCode,
    DeleteCodeSuccess,
    DeleteCodeFailure,
};
