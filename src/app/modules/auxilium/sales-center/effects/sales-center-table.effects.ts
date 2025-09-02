import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SalesCenterIndividualActions } from '../actions/sales-center-individual.actions';
import { SalesCenterTableActions } from '../actions/sales-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class SalesCenterTableEffects {
    loadSalesReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SalesCenterTableActions.LoadSalesReps),
            switchMap(action =>
                this.apiService.getSalesReps(action.filter).pipe(
                    map(salesreps => SalesCenterTableActions.LoadSalesRepsSuccess({ salesreps })),
                    catchError(error => of(SalesCenterTableActions.LoadSalesRepsFailure({ error: error.error })))
                )
            )
        )
    );

    deleteSale$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SalesCenterTableActions.DeleteSalesRep),
            switchMap(action =>
                this.apiService.deleteSalesRep(action.dto).pipe(
                    map(salesrep => SalesCenterTableActions.DeleteSalesRepSuccess()),
                    catchError(error => of(SalesCenterTableActions.DeleteSalesRepFailure({ error: error.error })))
                )
            )
        )
    );

    getSalesByIdRe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SalesCenterTableActions.LoadSalesById),
            switchMap(action =>
                this.apiService.getSalesRep(action.id).pipe(
                    map(salesRepById => SalesCenterTableActions.LoadSalesByIdSuccess({ salesRepById })),
                    catchError(error => of(SalesCenterTableActions.LoadSalesByIdFailure({ error: error.error })))
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SalesCenterTableActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup => SalesCenterTableActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })),
                    catchError(error =>
                        of(SalesCenterTableActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                SalesCenterIndividualActions.AddSalesRepSuccess,
                SalesCenterIndividualActions.UpdateSalesRepSuccess,
                SalesCenterTableActions.DeleteSalesRepSuccess
            ),
            map(() => SalesCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
