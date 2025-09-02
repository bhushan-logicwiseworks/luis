import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { HotKeysCenterIndividualActions } from '../actions/hotKeys-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class HotKeysCenterIndividualEffects {
    addHotKey$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HotKeysCenterIndividualActions.AddHotKey),
            switchMap(action =>
                this.apiService.savehotKeys(action.hotkey).pipe(
                    map(hotkey => HotKeysCenterIndividualActions.AddHotKeySuccess({ hotkey })),
                    catchError(error => of(HotKeysCenterIndividualActions.AddHotKeyFailure({ error: error.error })))
                )
            )
        )
    );

    updateSales$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HotKeysCenterIndividualActions.UpdateHotKey),
            switchMap(action =>
                this.apiService.savehotKeys(action.hotkey).pipe(
                    map(hotkey => HotKeysCenterIndividualActions.UpdateHotKeySuccess({ hotkey })),
                    catchError(error => of(HotKeysCenterIndividualActions.UpdateHotKeyFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
