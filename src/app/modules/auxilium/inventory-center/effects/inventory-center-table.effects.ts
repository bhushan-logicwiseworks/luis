import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { InventoryCenterIndividualActions } from '../actions/inventory-center-individual.actions';
import { InventoryCenterTableActions } from '../actions/inventory-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class InventoryCenterTableEffects {
    loadInventory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterTableActions.LoadInventory),
            switchMap(action =>
                this.apiService.getInventory(action.filter).pipe(
                    map(inventory => InventoryCenterTableActions.LoadInventorySuccess({ inventory })),
                    catchError(error => of(InventoryCenterTableActions.LoadInventoryFailure({ error: error.error })))
                )
            )
        )
    );

    deleteSale$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterTableActions.DeleteInventory),
            switchMap(action =>
                this.apiService.deleteInventory(action.dto).pipe(
                    map(inventory => InventoryCenterTableActions.DeleteInventoryuccess()),
                    catchError(error => of(InventoryCenterTableActions.DeleteInventoryFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                InventoryCenterIndividualActions.AddInventory,
                InventoryCenterIndividualActions.UpdateInventorySuccess,
                InventoryCenterTableActions.DeleteInventoryuccess
            ),
            map(() => InventoryCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
