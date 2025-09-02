import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { TerritoryTransferActions } from '../actions/territory-transfer.actions';

@Injectable({
    providedIn: 'root',
})
export class TerritoryTransferEffects {
    loadSalesReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TerritoryTransferActions.LoadSalesReps),
            switchMap(action =>
                this.apiService.getTerritorySalesReps().pipe(
                    map(salesReps => TerritoryTransferActions.LoadSalesRepsSuccess({ salesReps })),
                    catchError(error => of(TerritoryTransferActions.LoadSalesRepsFailure({ error: error.error })))
                )
            )
        )
    );

    LoadCategoriesDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TerritoryTransferActions.LoadCategories),
            switchMap(action =>
                this.apiService.getTerritoryCategory().pipe(
                    map(patientCategory => TerritoryTransferActions.LoadCategoriesSuccess({ patientCategory })),
                    catchError(error => of(TerritoryTransferActions.LoadCategoriesFailure({ error: error.error })))
                )
            )
        )
    );

    loadTerritoryTransfer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TerritoryTransferActions.AddTerritoryTransfer),
            switchMap(action =>
                this.apiService.postTerritoryTransfer(action.TerritoryTransfer).pipe(
                    map(TerritoryTransfer => {
                        ToastConfig.ADD_SUCCESS();
                        return TerritoryTransferActions.AddTerritoryTransferSuccess({ TerritoryTransfer });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(TerritoryTransferActions.AddTerritoryTransferFailure({ error: error.error }));
                    })
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
