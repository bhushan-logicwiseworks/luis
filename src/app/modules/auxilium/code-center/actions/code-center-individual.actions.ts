import { createAction, props } from '@ngrx/store';
import { CodeDisplay } from 'app/shared/interfaces/auxilium/code-center/code.interface';

const LoadCode = createAction('[CodeCenter Table/API] Load Code');
const LoadCodeSuccess = createAction('[CodeCenter Table/API] Load Code Success', props<{ code: CodeDisplay }>());
const LoadCodeFailure = createAction('[CodeCenter Table/API] Load Code Failure', props<{ error: Error }>());

const AddCode = createAction('[CodeCenter Create/API] Add Code', props<{ code: CodeDisplay }>());
const AddCodeSuccess = createAction('[CodeCenter Create/API] Add Code Success', props<{ code: CodeDisplay }>());
const AddCodeFailure = createAction('[CodeCenter Create/API] Add Code Failure', props<{ error: Error }>());

export const CodeCenterIndividualActions = {
    LoadCode,
    LoadCodeFailure,
    LoadCodeSuccess,
    AddCode,
    AddCodeSuccess,
    AddCodeFailure,
};
