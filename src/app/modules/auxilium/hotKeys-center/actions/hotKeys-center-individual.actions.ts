import { createAction, props } from '@ngrx/store';
import { HotKeysDisplay } from 'app/shared/interfaces/auxilium/hotKeys-center/hotkeys.interface';

const LoadHotKey = createAction('[HotKeyCenter Table/API] Load HotKey');
const LoadHotKeySuccess = createAction(
    '[HotKeyCenter Table/API] Load HotKey Success',
    props<{ hotkey: HotKeysDisplay }>()
);
const LoadHotKeyFailure = createAction('[HotKeyCenter Table/API] Load HotKey Failure', props<{ error: Error }>());

const AddHotKey = createAction('[HotKeyCenter Create/API] Add HotKey', props<{ hotkey: HotKeysDisplay }>());
const AddHotKeySuccess = createAction(
    '[HotKeyCenter Create/API] Add HotKey Success',
    props<{ hotkey: HotKeysDisplay }>()
);
const AddHotKeyFailure = createAction('[HotKeyCenter Create/API] Add HotKey Failure', props<{ error: Error }>());

const UpdateHotKey = createAction('[HotKeyCenter Update/API] Update HotKey', props<{ hotkey: HotKeysDisplay }>());
const UpdateHotKeySuccess = createAction(
    '[HotKeyCenter Update/API] Update HotKey Success',
    props<{ hotkey: HotKeysDisplay }>()
);
const UpdateHotKeyFailure = createAction('[HotKeyCenter Update/API] Update HotKey Failure', props<{ error: Error }>());

export const HotKeysCenterIndividualActions = {
    LoadHotKey,
    LoadHotKeyFailure,
    LoadHotKeySuccess,
    AddHotKey,
    AddHotKeySuccess,
    AddHotKeyFailure,
    UpdateHotKey,
    UpdateHotKeySuccess,
    UpdateHotKeyFailure,
};
