import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { SearchCriteria } from 'app/shared/interfaces/auxilium/work-order-center/search-criteria.interface';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientWorkOrderActions } from '../../patient-center/actions/patient-work-order.action';
import { WorkOrderCenterIndividualActions } from '../actions/work-order-center-individual.actions';
import { WorkOrderCenterTableActions } from '../actions/work-order-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class WorkCenterTableEffects {
    loadWorksReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterTableActions.LoadWorkReps),
            switchMap(action =>
                this.apiService.getWorkOrders(action.filter).pipe(
                    map(workreps => WorkOrderCenterTableActions.LoadWorkRepsSuccess({ workreps })),
                    catchError(error => of(WorkOrderCenterTableActions.LoadWorkRepsFailure({ error: error.error })))
                )
            )
        )
    );

    deleteWork$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterTableActions.DeleteWorkRep),
            switchMap(action =>
                this.apiService.deleteWorOrder(action.dto).pipe(
                    map(workrep => WorkOrderCenterTableActions.DeleteWorkRepSuccess()),
                    catchError(error => of(WorkOrderCenterTableActions.DeleteWorkRepFailure({ error: error.error })))
                )
            )
        )
    );

    deleteMultipleWork$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterTableActions.DeleteMultipleWorkRep),
            switchMap(action =>
                this.apiService.deleteMultipleWorOrder(action.ids).pipe(
                    map(workrep => WorkOrderCenterTableActions.DeleteMultipleWorkRepSuccess()),
                    catchError(error =>
                        of(WorkOrderCenterTableActions.DeleteMultipleWorkRepFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    searchWorkOrderEpoSent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterTableActions.SearchWorkOrderEpoSent),
            switchMap(({ criteria }) => {
                const filter = this.buildFilter('eposent', criteria);
                return this.apiService.getWorkOrders(filter).pipe(
                    map(workreps => WorkOrderCenterTableActions.SearchWorkOrderEpoSentSuccess({ workreps })),
                    catchError(error =>
                        of(WorkOrderCenterTableActions.SearchWorkOrderEpoSentFailure({ error: error.error }))
                    )
                );
            })
        )
    );

    searchWorkOrderMonthlyMarker$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterTableActions.SearchWorkOrderMonthlyMarker),
            switchMap(({ criteria }) => {
                const filter = this.buildFilter('monthlymarker', criteria);
                return this.apiService.getWorkOrders(filter).pipe(
                    map(workreps => WorkOrderCenterTableActions.SearchWorkOrderMonthlyMarkerSuccess({ workreps })),
                    catchError(error =>
                        of(WorkOrderCenterTableActions.SearchWorkOrderMonthlyMarkerFailure({ error: error.error }))
                    )
                );
            })
        )
    );

    // Work Order Group Edit
    wogroupEdit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterTableActions.WOGroupEdit),
            switchMap(action =>
                this.apiService.wogroupEdit(action.patientData).pipe(
                    map(data => {
                        ToastConfig.EDIT_SUCCESS();
                        return WorkOrderCenterTableActions.WOGroupEditSuccess();
                    }),
                    catchError(error => of(WorkOrderCenterTableActions.WOGroupEditFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                WorkOrderCenterIndividualActions.AddworkOrderSuccess,
                WorkOrderCenterTableActions.DeleteWorkRepSuccess,
                WorkOrderCenterTableActions.WOGroupEditSuccess,
                PatientWorkOrderActions.EditGroupWorkEditSuccess,
                PatientWorkOrderActions.SaveSelectedProcessShortcutSuccess,
                WorkOrderCenterTableActions.DeleteMultipleWorkRepSuccess
            ),
            map(() => WorkOrderCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}

    private buildFilter(baseFilter: string, criteria: SearchCriteria): string {
        const params = [];
        if (criteria.nextBill) params.push(`nextBill=${encodeURIComponent(criteria.nextBill)}`);
        if (criteria.itemCode) params.push(`itemCode=${encodeURIComponent(criteria.itemCode)}`);
        if (criteria.description) params.push(`description=${encodeURIComponent(criteria.description)}`);
        if (criteria.state) params.push(`state=${encodeURIComponent(criteria.state)}`);
        if (criteria.payor) params.push(`payor=${encodeURIComponent(criteria.payor)}`);
        return params.length ? `${baseFilter}?${params.join('&')}` : baseFilter;
    }
}
