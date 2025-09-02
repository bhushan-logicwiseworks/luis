import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from 'environments/environment';
import { hardReset } from './app.actions';

export function clearStateMetaReducer<State>(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state, action) {
        if (action.type === hardReset.type) {
            try {
                const beforeJson = JSON.stringify(state);
                const beforeBytes = new Blob([beforeJson]).size;
                // eslint-disable-next-line no-console
                console.warn('NGRX_HARD_RESET_BEFORE', {
                    action: (action as any)?.type,
                    sizeMB: (beforeBytes / 1048576).toFixed(3),
                });
            } catch {}

            // Force re-init by passing undefined state
            const next = reducer(undefined as any, action);

            try {
                const afterJson = JSON.stringify(next);
                const afterBytes = new Blob([afterJson]).size;
                // eslint-disable-next-line no-console
                console.warn('NGRX_HARD_RESET_AFTER', {
                    action: (action as any)?.type,
                    sizeMB: (afterBytes / 1048576).toFixed(3),
                });
            } catch {}

            return next as State;
        }
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer[] = [clearStateMetaReducer];

export function sizeGuardMetaReducer<State>(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state, action) {
        const next = reducer(state, action);
        try {
            const json = JSON.stringify(next);
            const bytes = new Blob([json]).size;
            const maxBytes = (environment as any).ngrxMaxStateMB
                ? Number((environment as any).ngrxMaxStateMB) * 1024 * 1024
                : 50 * 1024 * 1024; // default 50MB
            if (bytes > maxBytes) {
                // eslint-disable-next-line no-console
                console.warn('NGRX_STATE_LARGE', {
                    action: (action as any)?.type,
                    sizeMB: (bytes / 1048576).toFixed(1),
                    maxMB: (maxBytes / 1048576).toFixed(1),
                });
                // Mirror a warning on-screen if bridge is ready
                // try {
                //     NotificationBridge.warning?.(
                //         `State size ${(bytes / 1048576).toFixed(1)}MB exceeded ${(maxBytes / 1048576).toFixed(1)}MB`
                //     );
                // } catch {}
            }
        } catch {
            // ignore serialization issues for the guard
        }
        return next as State;
    };
}

export const extraMetaReducers: MetaReducer[] = [sizeGuardMetaReducer];
