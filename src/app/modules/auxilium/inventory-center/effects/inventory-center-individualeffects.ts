import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { InventoryCenterIndividualActions } from '../actions/inventory-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class InventoryCenterIndividualEffects {
    addInventory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterIndividualActions.AddInventory),
            switchMap(action =>
                this.apiService.saveInventory(action.inventory).pipe(
                    map(inventory => {
                        ToastConfig.ADD_SUCCESS();
                        return InventoryCenterIndividualActions.AddInventorySuccess({ inventory });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(InventoryCenterIndividualActions.AddInventoryFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    updateInventory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterIndividualActions.UpdateInventory),
            switchMap(action =>
                this.apiService.updateInventory(action.inventory).pipe(
                    map(inventory => InventoryCenterIndividualActions.UpdateInventorySuccess({ inventory })),
                    catchError(error =>
                        of(InventoryCenterIndividualActions.UpdateInventoryFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterIndividualActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => InventoryCenterIndividualActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error =>
                        of(InventoryCenterIndividualActions.LoadBranchDropDownFailure({ error: error.error }))
                    )
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
