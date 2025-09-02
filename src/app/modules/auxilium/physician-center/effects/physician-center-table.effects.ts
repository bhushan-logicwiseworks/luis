import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PhysicianCenterIndividualActions } from '../actions/physician-center-individual.actions';
import { PhysicianCenterTableActions } from '../actions/physician-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class SalesCenterTableEffects {
    loadSalesReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterTableActions.LoadPhysicians),
            switchMap(action =>
                this.apiService.getPhysicians(action.filter).pipe(
                    map(physicians => PhysicianCenterTableActions.LoadPhysiciansSuccess({ physicians })),
                    catchError(error => of(PhysicianCenterTableActions.LoadPhysiciansFailure({ error: error.error })))
                )
            )
        )
    );

    loadTax$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterTableActions.LoadTaxonomy),
            switchMap(action =>
                this.apiService.getTaxonomy().pipe(
                    map(taxonomy => PhysicianCenterTableActions.LoadTaxonomySuccess({ taxonomy })),
                    catchError(error => of(PhysicianCenterTableActions.LoadTaxonomyFailure({ error: error.error })))
                )
            )
        )
    );

    loadPhysicianById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterTableActions.LoadPhysicianById),
            switchMap(action =>
                this.apiService.getPhysicianById(action.id).pipe(
                    map(physician => PhysicianCenterTableActions.LoadPhysicianByIdSuccess({ physician })),
                    catchError(error =>
                        of(PhysicianCenterTableActions.LoadPhysicianByIdFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    quickAddPhysician$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterTableActions.QuickAddPhysician),
            switchMap(action =>
                this.apiService.physicianQuickSave(action.physician).pipe(
                    mergeMap(id => [
                        PhysicianCenterTableActions.QuickAddPhysicianSuccess({ id }),
                        PhysicianCenterTableActions.RedirectPhysicianCenter(),
                    ]),
                    catchError(error =>
                        of(PhysicianCenterTableActions.QuickAddPhysicianFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    redirectPhysicianDemographic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterTableActions.QuickAddPhysicianSuccess),
            switchMap(action => {
                const id = action.id['id'];
                return of(
                    PhysicianCenterTableActions.Navigate({
                        commands: [`/centers/physician-center/${id}/demographics`],
                    })
                );
            })
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PhysicianCenterIndividualActions.AddPhysicianRepSuccess,
                PhysicianCenterIndividualActions.UpdatePhysicianSuccess,
                PhysicianCenterIndividualActions.DeletePhysicianSuccess
            ),
            map(() => PhysicianCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
