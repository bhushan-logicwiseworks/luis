import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { PODSearchDetail } from 'app/shared/interfaces/auxilium/proof-of-delivery-center/proof-of-delivery.interface';
import { catchError, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { ProofOfDeliveryIndividualActions } from '../actions/proof-of-delivery-individual.actions';
import { ProofOfDeliveryTableActions } from '../actions/proof-of-delivery-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ProofOfDeliveryIndividualEffects {
    updateProofsOfDelivery$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProofOfDeliveryIndividualActions.saveProofOfDelivery),
            switchMap(action =>
                this.apiService.saveProofOfDelivery(action.saveProofOfDelivery).pipe(
                    switchMap(SaveProofOfDelivery => {
                        ToastConfig.ADD_SUCCESS();
                        const searchDetail: PODSearchDetail = {
                            patientId: action.saveProofOfDelivery.patientid,
                            invoiceNo: '',
                            shipDate: null,
                            shipdate: null,
                            trackingNumber: null,
                        };
                        return [
                            ProofOfDeliveryIndividualActions.saveProofOfDeliverySuccess({
                                saveProofOfDelivery: SaveProofOfDelivery,
                            }),
                            ProofOfDeliveryTableActions.ProofOfDeliverySearch({ searchPOd: searchDetail }),
                        ];
                    }),
                    catchError(error =>
                        of(ProofOfDeliveryIndividualActions.saveProofOfDeliveryFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
