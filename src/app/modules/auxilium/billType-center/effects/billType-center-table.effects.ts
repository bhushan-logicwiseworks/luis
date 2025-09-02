import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BillTypesCenterIndividualActions } from '../actions/billtype-center-individual.actions';
import { BillTypesCenterTableActions } from '../actions/billtype-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class BillTypesCenterTableEffects {
    loadbillTypesReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillTypesCenterTableActions.LoadBillTypes),
            switchMap(action =>
                this.apiService.getbillTypes().pipe(
                    map(billTypes => BillTypesCenterTableActions.LoadBillTypesSuccess({ billTypes })),
                    catchError(error => of(BillTypesCenterTableActions.LoadBillTypesFailure({ error: error.error })))
                )
            )
        )
    );

    deletebillType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillTypesCenterTableActions.DeleteBillType),
            switchMap(action =>
                this.apiService.deletebillType(action.dto).pipe(
                    map(billType => BillTypesCenterTableActions.DeleteBillTypesuccess()),
                    catchError(error => of(BillTypesCenterTableActions.DeleteBillTypeFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                BillTypesCenterIndividualActions.AddBillTypesuccess,
                BillTypesCenterIndividualActions.UpdateBillTypesuccess,
                BillTypesCenterTableActions.DeleteBillTypesuccess
            ),
            map(() => BillTypesCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
