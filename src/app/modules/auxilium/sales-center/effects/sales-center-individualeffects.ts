import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { SalesCenterIndividualActions } from '../actions/sales-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class SalesCenterIndividualEffects {
    addSalesRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SalesCenterIndividualActions.AddSalesRep),
            switchMap(action =>
                this.apiService.saveSalesRep(action.salesrep).pipe(
                    map(salesrep => {
                        ToastConfig.ADD_SUCCESS();
                        return SalesCenterIndividualActions.AddSalesRepSuccess({ salesrep });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(SalesCenterIndividualActions.AddSalesRepFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    updateSalesRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SalesCenterIndividualActions.UpdateSalesRep),
            switchMap(action =>
                this.apiService.saveSalesRep(action.salesrep).pipe(
                    map(salesrep => {
                        ToastConfig.EDIT_SUCCESS();

                        return SalesCenterIndividualActions.AddSalesRepSuccess({ salesrep });
                    }),
                    catchError(error => {
                        ToastConfig.EDIT_FAILURE();
                        return of(SalesCenterIndividualActions.AddSalesRepFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SalesCenterIndividualActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => SalesCenterIndividualActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error =>
                        of(SalesCenterIndividualActions.LoadBranchDropDownFailure({ error: error.error }))
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
