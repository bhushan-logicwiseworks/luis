import { createAction, props } from '@ngrx/store';
import { DropdownDisplay } from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import {
    GetShortcutResponse,
    ShortcutDisplay,
} from 'app/shared/interfaces/auxilium/shortcut-center/shortcut.interface';

const ResetState = createAction('[ShortcutCenter Table/API] Reset Change State');
const LoadShortcut = createAction('[ShortcutCenter Table/API] Load Shortcuts');
const LoadShortcutSuccess = createAction(
    '[ShortcutCenter Table/API] Load Shortcut Success',
    props<{ shortcuts: GetShortcutResponse }>()
);
const LoadShortcutFailure = createAction('[ShortcutCenter Table/API] Load Shortcut Failure', props<{ error: Error }>());

const SaveShortcuts = createAction(
    '[ShortcutCenter Table/API] Save Shortcuts',
    props<{ shortcuts: GetShortcutResponse }>()
);
const SaveShortcutsSuccess = createAction('[ShortcutCenter Table/API] Save Shortcuts Success');
const SaveShortcutsFailure = createAction(
    '[ShortcutCenter Table/API] Save Shortcuts Failure',
    props<{ error: Error }>()
);

const LoadShortcutItemCodes = createAction(
    '[ShortcutCenter Table/API] Load Shortcut Item Codes',
    props<{ itemCodes: number[] }>()
);
const LoadShortcutItemCodesSuccess = createAction(
    '[ShortcutCenter Table/API] Load Shortcut Item Codes Success',
    props<{ itemCodes: any[] }>()
);
const LoadShortcutItemCodesFailure = createAction(
    '[ShortcutCenter Table/API] Load Shortcut Item Codes Failure',
    props<{ error: Error }>()
);

const LoadSelectedShortcutDetails = createAction(
    '[ShortcutCenter Table/API] Load Selected Shortcuts Details ',
    props<{ id: number }>()
);
const LoadSelectedShortcutDetailsSuccess = createAction(
    '[ShortcutCenter Table/API] Load Selected Shortcuts Details Success',
    props<{ shortcut: ShortcutDisplay }>()
);
const LoadSelectedShortcutDetailsFailure = createAction(
    '[ShortcutCenter Table/API] Load Selected Shortcuts Details Failure',
    props<{ error: Error }>()
);

const DeleteShortcut = createAction(
    '[ShortcutCenter Table/API] Delete Shortcut',
    props<{ shortcut: ShortcutDisplay }>()
);
const DeleteShortcutSuccess = createAction('[ShortcutCenter Table/API] Delete Shortcut Success');
const DeleteShortcutFailure = createAction(
    '[ShortcutCenter Table/API] Delete Shortcut Failure',
    props<{ error: Error }>()
);

const BillTypeDropdown = createAction('[ShortcutCenter Table/API] Load BillType DropDown');
const BillTypeDropdownSuccess = createAction(
    '[ShortcutCenter Table/API] Load BillType DropDown Success',
    props<{ billType: DropdownDisplay[] }>()
);
const BillTypeDropdownFailure = createAction(
    '[ShortcutCenter Table/API] Load BillType DropDown Failure',
    props<{ error: Error }>()
);

export const ShortcutCenterTableActions = {
    LoadShortcut,
    LoadShortcutSuccess,
    LoadShortcutFailure,
    LoadShortcutItemCodes,
    LoadShortcutItemCodesSuccess,
    LoadShortcutItemCodesFailure,
    ResetState,
    SaveShortcuts,
    SaveShortcutsSuccess,
    SaveShortcutsFailure,
    LoadSelectedShortcutDetails,
    LoadSelectedShortcutDetailsSuccess,
    LoadSelectedShortcutDetailsFailure,
    DeleteShortcut,
    DeleteShortcutSuccess,
    DeleteShortcutFailure,
    BillTypeDropdown,
    BillTypeDropdownSuccess,
    BillTypeDropdownFailure,
};
