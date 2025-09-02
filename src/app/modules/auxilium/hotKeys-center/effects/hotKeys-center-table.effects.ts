import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HotKeysCenterIndividualActions } from '../actions/hotKeys-center-individual.actions';
import { HotKeysCenterTableActions } from '../actions/hotKeys-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class HotKeysCenterTableEffects {
    loadhotKeys$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HotKeysCenterTableActions.LoadHotKeys),
            switchMap(action =>
                this.apiService.gethotKeys().pipe(
                    map(hotkeys => HotKeysCenterTableActions.LoadHotKeysSuccess({ hotkeys })),
                    catchError(error => of(HotKeysCenterTableActions.LoadHotKeysFailure({ error: error.error })))
                )
            )
        )
    );

    deletehotKeys$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HotKeysCenterTableActions.DeleteHotKey),
            switchMap(action =>
                this.apiService.deletehotKeys(action.dto).pipe(
                    map(hotkey => HotKeysCenterTableActions.DeleteHotKeySuccess()),
                    catchError(error => of(HotKeysCenterTableActions.DeleteHotKeyFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                HotKeysCenterIndividualActions.AddHotKeySuccess,
                HotKeysCenterIndividualActions.UpdateHotKeySuccess,
                HotKeysCenterTableActions.DeleteHotKeySuccess
            ),
            map(() => HotKeysCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
