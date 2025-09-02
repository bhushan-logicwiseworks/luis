import { createAction, props } from '@ngrx/store';
import { GetHotKeysResponse, HotKeysDisplay } from 'app/shared/interfaces/auxilium/hotKeys-center/hotkeys.interface';

const ResetState = createAction('[HotKeysCenter Table/API] Reset HotKeys State');
const LoadHotKeys = createAction('[HotKeysCenter Table/API] Load HotKeys');
const LoadHotKeysSuccess = createAction(
    '[HotKeysCenter Table/API] Load HotKeys Success',
    props<{ hotkeys: GetHotKeysResponse }>()
);
const LoadHotKeysFailure = createAction('[HotKeysCenter Table/API] Load HotKeys Failure', props<{ error: Error }>());

const DeleteHotKey = createAction('[HotKeysCenter Delete/API] Delete HotKey', props<{ dto: HotKeysDisplay }>());
const DeleteHotKeySuccess = createAction('[HotKeyCenter Delete/API] Delete HotKey Success');
const DeleteHotKeyFailure = createAction('[HotKeyCenter Delete/API] Delete HotKey Failure', props<{ error: Error }>());

const Refresh = createAction('[HotKeysCenter Table/API] Refresh');

export const HotKeysCenterTableActions = {
    LoadHotKeys,
    LoadHotKeysSuccess,
    LoadHotKeysFailure,
    Refresh,
    ResetState,
    DeleteHotKey,
    DeleteHotKeySuccess,
    DeleteHotKeyFailure,
};
