import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProofOfDeliveryIndividualActions } from '../actions/proof-of-delivery-individual.actions';
import { ProofOfDeliveryTableActions } from '../actions/proof-of-delivery-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ProofOfDeliveryTableEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProofOfDeliveryTableActions.LoadProofOfDelivery),
            switchMap(() =>
                this.apiService.getAllProofOfDelivery().pipe(
                    map(getall => ProofOfDeliveryTableActions.LoadProofOfDeliverySuccess({ getall })),
                    catchError(error =>
                        of(ProofOfDeliveryTableActions.LoadProofOfDeliveryFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    searchPod$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProofOfDeliveryTableActions.ProofOfDeliverySearch),
            switchMap(action =>
                this.apiService.ProofOfDeliverySearch(action.searchPOd).pipe(
                    map(getall => ProofOfDeliveryTableActions.ProofOfDeliverySearchSuccess({ getall })),
                    catchError(error =>
                        of(ProofOfDeliveryTableActions.ProofOfDeliverySearchFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProofOfDeliveryIndividualActions.saveProofOfDeliverySuccess),
            map(() => ProofOfDeliveryTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
