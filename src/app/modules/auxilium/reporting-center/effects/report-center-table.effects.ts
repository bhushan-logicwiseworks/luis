import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReportCenterTableActions } from '../actions/reporting-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ReportCenterTableEffects {
    loadReports$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportCenterTableActions.LoadReports),
            switchMap(action =>
                this.apiService.getReportingCenterPatients(action.filter).pipe(
                    map((report: any) => ReportCenterTableActions.LoadReportsSuccess({ report })),
                    catchError(error => of(ReportCenterTableActions.LoadReportsFailure({ error: error.error })))
                )
            )
        )
    );

    /* addReport$ = createEffect(() => this.actions$.pipe(
    ofType(ReportCenterTableActions.AddReportQuickSave),
    switchMap(action => this.apiService.patientQuickSave(action.report).pipe(
      mergeMap(id =>[
        ReportCenterTableActions.AddReportQuickSaveSuccess({ id }),
        ReportCenterTableActions.RedirectReportCenter()
        ]),
      catchError(error => of(ReportCenterTableActions.AddReportQuickSaveFailure({ error: error.error })))
    )
    )
  ));

  searchReport$ = createEffect(() => this.actions$.pipe(
    ofType(ReportCenterTableActions.ReportSearch),
    switchMap(action =>
      this.apiService.patientSearch(action.ReportSearch).pipe(
        map((report) => ReportCenterTableActions.ReportSearchSuccess({ report })),
        catchError(error => of(ReportCenterTableActions.ReportSearchFailure({ error: error.error })))
      )
    )
  )); */

    deleteReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportCenterTableActions.DeleteReport),
            switchMap(action =>
                this.apiService.deletePatient(action.dto).pipe(
                    map(report => ReportCenterTableActions.DeleteReportSuccess()),
                    catchError(error => of(ReportCenterTableActions.DeleteReportFailure({ error: error.error })))
                )
            )
        )
    );

    redirectReportCenter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportCenterTableActions.AddReportQuickSaveSuccess),
            map(action =>
                ReportCenterTableActions.Navigate({
                    commands: [`/centers/patient-center/${action.id.toString()}/demographics`],
                })
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportCenterTableActions.AddReportQuickSaveSuccess, ReportCenterTableActions.DeleteReportSuccess),
            map(() => ReportCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
