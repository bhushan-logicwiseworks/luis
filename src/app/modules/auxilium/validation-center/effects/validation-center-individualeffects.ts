import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { ValidationCenterIndividualActions } from '../actions/validation-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class ValidationCenterIndividualEffects {
    addValidation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationCenterIndividualActions.AddValidationRep),
            switchMap(action =>
                this.apiService.saveValidation(action.validation).pipe(
                    map(validation => {
                        ToastConfig.ADD_SUCCESS();
                        return ValidationCenterIndividualActions.AddValidationRepSuccess({ validation });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(ValidationCenterIndividualActions.AddValidationRepFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    updateValidation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationCenterIndividualActions.UpdateValidation),
            switchMap(action =>
                this.apiService.saveValidation(action.validation).pipe(
                    map(validation => ValidationCenterIndividualActions.AddValidationRepSuccess({ validation })),
                    catchError(error =>
                        of(ValidationCenterIndividualActions.AddValidationRepFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deleteValidation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationCenterIndividualActions.DeleteValidation),
            switchMap(action =>
                this.apiService.deleteValidation(action.phy).pipe(
                    map(salesrep => ValidationCenterIndividualActions.DeleteValidationSuccess()),
                    catchError(error =>
                        of(ValidationCenterIndividualActions.DeleteValidationFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationCenterIndividualActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup =>
                        ValidationCenterIndividualActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })
                    ),
                    catchError(error =>
                        of(ValidationCenterIndividualActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationCenterIndividualActions.LoadCityAndStateDropDownSuccess),
            map(() => ValidationCenterIndividualActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
