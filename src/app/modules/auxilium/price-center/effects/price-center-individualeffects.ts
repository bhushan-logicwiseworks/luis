import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { PriceCenterIndividualActions } from '../actions/price-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class PriceCenterIndividualEffects {
    addPrice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceCenterIndividualActions.AddPriceRep),
            switchMap(action =>
                this.apiService.saveItemPrice(action.price).pipe(
                    map(price => PriceCenterIndividualActions.AddPriceSuccess({ price })),
                    catchError(error => of(PriceCenterIndividualActions.AddPriceFailure({ error: error.error })))
                )
            )
        )
    );

    updatePrice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceCenterIndividualActions.UpdatePrice),
            switchMap(action =>
                this.apiService.saveItemPrice(action.price).pipe(
                    map(price => PriceCenterIndividualActions.UpdatePriceSuccess({ price })),
                    catchError(error => of(PriceCenterIndividualActions.UpdatePriceFailure({ error: error.error })))
                )
            )
        )
    );

    deletePrice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceCenterIndividualActions.DeletePrice),
            switchMap(action =>
                this.apiService.deletePrice(action.price).pipe(
                    map(item => PriceCenterIndividualActions.DeletePriceSuccess()),
                    catchError(error => of(PriceCenterIndividualActions.DeletePriceFailure({ error: error.error })))
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
