import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReorderCenterService } from 'app/core/services/reorder-center.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import * as fromPatientActions from '../actions/reorder-patient.actions';
import { ReorderPatientNotesDialogComponent } from '../components/reorder-patient-notes-dialog/reorder-patient-notes-dialog.component';

@Injectable()
export class ReorderPatientEffects {
    loadPatientData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPatientActions.loadReorderPatientData),
            switchMap(({ id }) =>
                forkJoin([
                    this.api.getPatient(id).pipe(catchError(() => of([]))),
                    this.api.getPatientDoctor(id).pipe(catchError(() => of([]))),
                    this.api.getPatientInsurance(id).pipe(catchError(() => of([]))),
                    this.api.getAlternateShipToAddress(id).pipe(catchError(() => of([]))),
                    this.api.getNextOrderDates(id).pipe(catchError(() => of([]))),
                    this.api.getPatientNotes(id).pipe(catchError(() => of([]))),
                    this.api.getReorderProducts(id).pipe(catchError(() => of([]))),
                ]).pipe(
                    tap(),
                    map(
                        ([
                            patient,
                            doctor,
                            insurance,
                            alternateShipToAddress,
                            datesEtc,
                            patientNotes,
                            reorderProducts,
                        ]) =>
                            fromPatientActions.loadReorderPatientDataSuccess({
                                patient: patient[0],
                                doctor: doctor[0],
                                insurance,
                                alternateShipToAddress: alternateShipToAddress[0],
                                datesEtc: datesEtc[0],
                                patientNotes,
                                reorderProducts,
                            })
                    ),
                    catchError(error => of(fromPatientActions.loadReorderPatientDataFailure({ error })))
                )
            )
        )
    );

    openPatientNotes$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromPatientActions.openPatientNotes),
                tap(() => {
                    const popupData: PopupData = {
                        icon: 'mat_outline:assignment',
                        iconColor: 'primary',
                        title: 'PATIENT NOTES',
                        titleColor: 'text-secondary',
                        cancelButtonText: 'Cancel',
                        saveButtonText: '',
                        dynamicComponent: ReorderPatientNotesDialogComponent,
                        dynamicComponentData: null,
                        submitFunction: 'saveContact',
                        enterKeyEnabled: true,
                    };
                    this.dialog
                        .open(AuxPopupComponent, {
                            width: '650px',
                            maxWidth: '100%',
                            panelClass: [
                                'animate__animated',
                                'animate__slideInRight',
                                'animated',
                                'ac-commcenter-dialog',
                                'm0-dialog',
                            ],
                            position: {
                                top: 0 + 'px',
                                right: 0 + 'px',
                            },
                            height: '100vh',
                            data: popupData,
                        })
                        .afterClosed()
                        .pipe(untilDestroyed(this))
                        .subscribe(result => {});
                })
            ),
        { dispatch: false }
    );

    prismAuthorization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPatientActions.prismAuthorization),
            switchMap(action =>
                this.api.prismAuthorization(action.id).pipe(
                    map(prism => {
                        ToastConfig.CUSTOM_SUCCESS('prismAuthorizationSuccess');
                        return fromPatientActions.prismAuthorizationSuccess({ id: action.id });
                    }),
                    catchError(error => {
                        ToastConfig.CUSTOM_FAILURE('prismAuthorizationFailure');
                        return of(fromPatientActions.prismAuthorizationFailure({ error }));
                    })
                )
            )
        )
    );

    loadPatientDataAfterAuthorization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPatientActions.prismAuthorizationSuccess),
            map(action => {
                return fromPatientActions.loadReorderPatientData({ id: action.id });
            })
        )
    );

    constructor(
        private actions$: Actions,
        private api: ReorderCenterService,
        private dialog: MatDialog
    ) {}
}
