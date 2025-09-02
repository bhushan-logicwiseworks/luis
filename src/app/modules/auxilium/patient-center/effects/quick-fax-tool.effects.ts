import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { QuickFaxToolActions } from '../actions/quick-fax-tool.action';

@Injectable({
    providedIn: 'root',
})
export class QuickFaxToolEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}

    sendFaxMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuickFaxToolActions.sendFaxMessage),
            switchMap(action =>
                this.apiService.sendFaxMessage(action.patientId, action.title, action.message).pipe(
                    map(message => {
                        ToastConfig.CUSTOM_SUCCESS('sendFaxMessageSuccess');
                        return QuickFaxToolActions.sendFaxMessageSuccess({ message });
                    }),
                    catchError(error => of(QuickFaxToolActions.sendFaxMessageFailure({ error: error.error })))
                )
            )
        )
    );

    getDoctorDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuickFaxToolActions.getDoctorDetails),
            switchMap(action =>
                this.apiService.getDoctorDetails(action.patientId).pipe(
                    map(doctorDetails => QuickFaxToolActions.getDoctorDetailsSuccess({ doctorDetails })),
                    catchError(error => of(QuickFaxToolActions.getDoctorDetailsFailure({ error: error.error })))
                )
            )
        )
    );
}
