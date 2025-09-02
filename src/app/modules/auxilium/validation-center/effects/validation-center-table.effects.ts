import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ValidationCenterIndividualActions } from '../actions/validation-center-individual.actions';
import { ValidationCenterTableActions } from '../actions/validation-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ValidationCenterTableEffects {
    loadValidationsReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationCenterTableActions.LoadValidations),
            switchMap(action =>
                this.apiService.getValidations().pipe(
                    map(validations => ValidationCenterTableActions.LoadValidationsSuccess({ validations })),
                    catchError(error => of(ValidationCenterTableActions.LoadValidationsFailure({ error: error.error })))
                )
            )
        )
    );

    loadTax$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationCenterTableActions.LoadTaxonomy),
            switchMap(action =>
                this.apiService.getTaxonomy().pipe(
                    map(taxonomy => ValidationCenterTableActions.LoadTaxonomySuccess({ taxonomy })),
                    catchError(error => of(ValidationCenterTableActions.LoadTaxonomyFailure({ error: error.error })))
                )
            )
        )
    );

    loadValidationById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationCenterTableActions.LoadValidationById),
            switchMap(action =>
                this.apiService.getValidationById(action.id).pipe(
                    map(validation => ValidationCenterTableActions.LoadValidationByIdSuccess({ validation })),
                    catchError(error =>
                        of(ValidationCenterTableActions.LoadValidationByIdFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ValidationCenterIndividualActions.AddValidationRepSuccess,
                ValidationCenterIndividualActions.UpdateValidationSuccess,
                ValidationCenterIndividualActions.DeleteValidationSuccess
            ),
            map(() => ValidationCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
