import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../../../../core/services/api.service';
import { NextDosActions } from '../actions/next-dos.actions';

@Injectable()
export class NextDosEffects {
    calculateNextDos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NextDosActions.calculateNextDos),
            switchMap(payload =>
                this.apiService.calculateNextDos(payload).pipe(
                    map(response => NextDosActions.calculateNextDosSuccess({ response })),
                    catchError(error => of(NextDosActions.calculateNextDosFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
