import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { InventoryCenterVendorTableActions } from '../actions/inventory-center-vendor-table.actions';

@Injectable({
    providedIn: 'root',
})
export class InventoryCenterVendorTableEffects {
    loadVendorTable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterVendorTableActions.LoadVendor),
            switchMap(action =>
                this.apiService.getVendorList(action.productId).pipe(
                    map(data => InventoryCenterVendorTableActions.LoadVendorSuccess({ data })),
                    catchError(error => of(InventoryCenterVendorTableActions.LoadVendorFailure({ error: error.error })))
                )
            )
        )
    );

    addInventoryVendor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterVendorTableActions.AddInventoryVendor),
            exhaustMap(action =>
                this.apiService.saveInventoryVendor(action.vendor).pipe(
                    map(vendor => {
                        ToastConfig.ADD_SUCCESS();
                        return InventoryCenterVendorTableActions.AddInventoryVendorSuccess();
                    }),
                    catchError(error =>
                        of(InventoryCenterVendorTableActions.AddInventoryVendorFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    redirectInventoryCenterVendor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterVendorTableActions.AddInventoryVendorSuccess),
            map(action =>
                InventoryCenterVendorTableActions.Navigate({
                    commands: [window.history.back()],
                })
            )
        )
    );

    VendorCodeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterVendorTableActions.VendorCodeDropdown),
            switchMap(() =>
                this.apiService.getVendorCodeDropdown().pipe(
                    map(vendorCode => InventoryCenterVendorTableActions.VendorCodeDropdownSuccess({ vendorCode })),
                    catchError(error =>
                        of(InventoryCenterVendorTableActions.VendorCodeDropdownFailure({ error: error.error }))
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
