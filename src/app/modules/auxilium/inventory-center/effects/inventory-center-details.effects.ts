import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { InventoryCenterDeatilsActions } from '../actions/inventory-center-details.action';

@Injectable({
    providedIn: 'root',
})
export class ProductCenterDetailsEffects {
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterDeatilsActions.LoadProductDetails),
            switchMap(action =>
                this.apiService.getProductDetails(action.id).pipe(
                    map((data: any) => InventoryCenterDeatilsActions.LoadProductDetailsSuccess({ product: data })),
                    catchError(error =>
                        of(InventoryCenterDeatilsActions.LoadProductDetailsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadClassDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterDeatilsActions.LoadClassDropdown),
            switchMap(action =>
                this.apiService.getClassDorpDown().pipe(
                    map(data => InventoryCenterDeatilsActions.LoadClassDropdownSuccess({ inventoryclass: data })),
                    catchError(error =>
                        of(InventoryCenterDeatilsActions.LoadClassDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadShippingDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterDeatilsActions.LoadShippingUnitsDropdown),
            switchMap(action =>
                this.apiService.getShippingDorpDown().pipe(
                    map(data => InventoryCenterDeatilsActions.LoadShippingUnitsDropdownSuccess({ shipping: data })),
                    catchError(error =>
                        of(InventoryCenterDeatilsActions.LoadClassDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadStatusDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterDeatilsActions.LoadStatusDropdown),
            switchMap(action =>
                this.apiService.getStatusDorpDown().pipe(
                    map(data => InventoryCenterDeatilsActions.LoadStatusDropdownSuccess({ status: data })),
                    catchError(error =>
                        of(InventoryCenterDeatilsActions.LoadStatusDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadMakeDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterDeatilsActions.LoadMakeDropdown),
            switchMap(action =>
                this.apiService.getMakeDorpDown().pipe(
                    map(data => InventoryCenterDeatilsActions.LoadMakeDropdownSuccess({ make: data })),
                    catchError(error =>
                        of(InventoryCenterDeatilsActions.LoadMakeDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadModelDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterDeatilsActions.LoadModelDropdown),
            switchMap(action =>
                this.apiService.getModelDorpDown().pipe(
                    map(data => InventoryCenterDeatilsActions.LoadModelDropdownSuccess({ modal: data })),
                    catchError(error =>
                        of(InventoryCenterDeatilsActions.LoadModelDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadManufacturerDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterDeatilsActions.LoadManufacturerDropdown),
            switchMap(action =>
                this.apiService.getManufacturerDorpDown().pipe(
                    map(data => InventoryCenterDeatilsActions.LoadManufacturerDropdownSuccess({ manufacturer: data })),
                    catchError(error =>
                        of(InventoryCenterDeatilsActions.LoadManufacturerDropdownFailure({ error: error.error }))
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
