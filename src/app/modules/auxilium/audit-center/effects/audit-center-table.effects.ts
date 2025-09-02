import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { AuditCenterTableActions } from '../actions/audit-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class AuditCenterTableEffects {
    loadAudits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuditCenterTableActions.LoadAudit),
            switchMap(action =>
                this.apiService.getAudit(action.filter).pipe(
                    map(Audits => AuditCenterTableActions.LoadAuditSuccess({ Audits })),
                    catchError(error => of(AuditCenterTableActions.LoadAuditFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
