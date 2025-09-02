import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PostingCenterTableActions } from '../actions/posting-center-table.action';

@Injectable({
    providedIn: 'root',
})
export class PostingCenterTableEffects {
    loadExplanationOfBenefits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostingCenterTableActions.LoadExplanationOfBenefits),
            switchMap(action =>
                this.apiService.getExplanationOfBenefits().pipe(
                    map(eobdata => PostingCenterTableActions.LoadExplanationOfBenefitsSuccess({ eobdata })),
                    catchError(error =>
                        of(PostingCenterTableActions.LoadExplanationOfBenefitsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadEOBDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostingCenterTableActions.LoadEOBDetails),
            switchMap(action =>
                this.apiService.getEOBDetails(action.id).pipe(
                    map(eobinfo => PostingCenterTableActions.LoadEOBDetailsSuccess({ eobinfo })),
                    catchError(error => of(PostingCenterTableActions.LoadEOBDetailsFailure({ error: error.error })))
                )
            )
        )
    );

    loadEOBById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostingCenterTableActions.LoadEOBById),
            switchMap(action =>
                this.apiService.getEOBById(action.eobid).pipe(
                    map(eobById => PostingCenterTableActions.LoadEOBByIdSuccess({ eobById })),
                    catchError(error => of(PostingCenterTableActions.LoadEOBByIdFailure({ error: error.error })))
                )
            )
        )
    );

    loadEOB$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostingCenterTableActions.LoadEOB),
            switchMap(action =>
                this.apiService.getEOB(action.id).pipe(
                    map(eob => PostingCenterTableActions.LoadEOBSuccess({ eob })),
                    catchError(error => of(PostingCenterTableActions.LoadEOBFailure({ error })))
                )
            )
        )
    );

    openEob$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PostingCenterTableActions.LoadEOBSuccess),
                tap(action => {
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                        newWindow.document.write(action.eob);
                        newWindow.document.close();
                    }
                })
            ),
        { dispatch: false }
    );

    loadPatientEOB$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostingCenterTableActions.LoadPatientEOBById),
            switchMap(action =>
                this.apiService.getPatientEOB(action.eobid, action.refId).pipe(
                    map(eob => PostingCenterTableActions.LoadPatientEOBByIdSuccess({ eob })),
                    catchError(error => of(PostingCenterTableActions.LoadPatientEOBByIdFailure({ error: error.error })))
                )
            )
        )
    );

    openPatientEob$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PostingCenterTableActions.LoadPatientEOBByIdSuccess),
                tap(action => {
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                        newWindow.document.write(action.eob);
                        newWindow.document.close();
                    }
                })
            ),
        { dispatch: false }
    );

    deleteExplanationOfBenefits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostingCenterTableActions.DeleteExplanationOfBenefits),
            switchMap(action =>
                this.apiService.deleteExplanationOfBenefits(action.id).pipe(
                    map(() => {
                        ToastConfig.DELETE_SUCCESS();
                        return PostingCenterTableActions.DeleteExplanationOfBenefitsSuccess({ id: action.id });
                    }),
                    catchError(error => {
                        ToastConfig.DELETE_FAILURE();
                        return of(PostingCenterTableActions.DeleteExplanationOfBenefitsFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostingCenterTableActions.DeleteExplanationOfBenefitsSuccess),
            map(() => PostingCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private apiService: ApiService
    ) {}
}
