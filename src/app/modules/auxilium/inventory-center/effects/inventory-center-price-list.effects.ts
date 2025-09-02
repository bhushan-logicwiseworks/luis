import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { InventoryCenterPriceListActions } from '../actions/inventory-center-price-list.action';

@Injectable({
    providedIn: 'root',
})
export class InventoryCenterPriceListEffects {
    loadPriceList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterPriceListActions.LoadPriceList),
            switchMap(action =>
                this.apiService.getPriceList(action.productId).pipe(
                    map(data => InventoryCenterPriceListActions.LoadPriceListSuccess({ data })),
                    catchError(error =>
                        of(InventoryCenterPriceListActions.LoadPriceListFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPriceById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterPriceListActions.LoadPriceById),
            switchMap(action =>
                this.apiService.getPriceById(action.priceId).pipe(
                    map(priceData => InventoryCenterPriceListActions.LoadPriceByIdSuccess({ priceData })),
                    catchError(error =>
                        of(InventoryCenterPriceListActions.LoadPriceByIdFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    savePriceById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterPriceListActions.SavePrice),
            switchMap(action =>
                this.apiService.savePriceById(action.price).pipe(
                    map(price => {
                        ToastConfig.ADD_SUCCESS();
                        return InventoryCenterPriceListActions.SavePriceSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(InventoryCenterPriceListActions.SavePriceFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    priceCodeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterPriceListActions.PriceCodeDropdown),
            switchMap(action =>
                this.apiService.getPriceCodeDropdown().pipe(
                    map(priceCode => InventoryCenterPriceListActions.PriceCodeDropdownSuccess({ priceCode })),
                    catchError(error =>
                        of(InventoryCenterPriceListActions.PriceCodeDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    cmnFormsDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterPriceListActions.CMNFormsDropdown),
            switchMap(action =>
                this.apiService.getCMNFormsDropdown().pipe(
                    map(cmnForms => InventoryCenterPriceListActions.CMNFormsDropdownSuccess({ cmnForms })),
                    catchError(error =>
                        of(InventoryCenterPriceListActions.CMNFormsDropdownFailure({ error: error.error }))
                    )
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
