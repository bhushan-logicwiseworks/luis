import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { ConfigurationCenterIndividualActions } from '../action/configuration-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class ConfigurationCenterIndividualEffects {
    addCodeRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ConfigurationCenterIndividualActions.AddConfiguration),
            switchMap(action =>
                this.apiService.saveConfiguration(action.configuration).pipe(
                    map(configuration => {
                        ToastConfig.ADD_SUCCESS();
                        return ConfigurationCenterIndividualActions.AddConfigurationSuccess({ configuration });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(ConfigurationCenterIndividualActions.AddConfigurationFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
