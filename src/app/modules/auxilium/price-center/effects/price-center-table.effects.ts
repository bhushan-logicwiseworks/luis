import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PriceCenterIndividualActions } from '../actions/price-center-individual.actions';
import { PriceCenterTableActions } from '../actions/price-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class PriceCenterTableEffects {
    searchItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceCenterTableActions.ItemSearch),
            switchMap(action =>
                this.apiService.searchPrice(action.itemSearch).pipe(
                    map(item => PriceCenterTableActions.ItemSearchSuccess({ item })),
                    catchError(error => of(PriceCenterTableActions.ItemSearchFailure({ error: error.error })))
                )
            )
        )
    );

    loadItemPriceList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceCenterTableActions.loadItemPriceList),
            switchMap(action =>
                this.apiService.getItemPriceList(action.id).pipe(
                    map(itemPriceList => PriceCenterTableActions.LoadItemPriceListSuccess({ itemPriceList })),
                    catchError(error => of(PriceCenterTableActions.LoadItemPriceListFailure({ error: error.error })))
                )
            )
        )
    );

    loadPriceInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceCenterTableActions.loadItemPriceInfo),
            switchMap(action =>
                this.apiService.getItemPriceInfo(action.id).pipe(
                    map(itemPriceInfo =>
                        PriceCenterTableActions.LoadItemPriceInfoSuccess({ itemPriceInfo: itemPriceInfo['value'] })
                    ),
                    catchError(error => of(PriceCenterTableActions.LoadItemPriceInfoFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceCenterIndividualActions.DeletePriceSuccess, PriceCenterIndividualActions.UpdatePriceSuccess),
            map(() => PriceCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
