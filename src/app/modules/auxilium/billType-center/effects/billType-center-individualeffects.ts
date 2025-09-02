import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { BillTypesCenterIndividualActions } from '../actions/billtype-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class BillTypeCenterIndividualEffects {
    addBillTypeRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillTypesCenterIndividualActions.AddBillType),
            switchMap(action =>
                this.apiService.savebillType(action.billType).pipe(
                    map(billType => BillTypesCenterIndividualActions.AddBillTypesuccess({ billType })),
                    catchError(error => of(BillTypesCenterIndividualActions.AddBillTypeFailure({ error: error.error })))
                )
            )
        )
    );

    updateBillTypeRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillTypesCenterIndividualActions.UpdateBillType),
            switchMap(action =>
                this.apiService.savebillType(action.billType).pipe(
                    map(billType => BillTypesCenterIndividualActions.UpdateBillTypesuccess({ billType })),
                    catchError(error =>
                        of(BillTypesCenterIndividualActions.UpdateBillTypeFailure({ error: error.error }))
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
