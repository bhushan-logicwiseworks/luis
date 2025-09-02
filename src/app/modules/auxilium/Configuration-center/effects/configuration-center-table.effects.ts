import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ConfigurationCenterIndividualActions } from '../action/configuration-center-individual.actions';
import { ConfigurationCenterTableActions } from '../action/configuration-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ConfigurationCenterTableEffects {
    loadConfiguration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ConfigurationCenterTableActions.LoadConfigurations),
            switchMap(action =>
                this.apiService.getAllConfigurations().pipe(
                    map(configurationList =>
                        ConfigurationCenterTableActions.LoadConfigurationsSuccess({ configurationList })
                    ),
                    catchError(error =>
                        of(ConfigurationCenterTableActions.LoadConfigurationsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deleteConfiguration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ConfigurationCenterTableActions.DeleteConfiguration),
            switchMap(action =>
                this.apiService.deleteConfiguration(action.configuration).pipe(
                    map(configuration => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your configuration has been deleted',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        return ConfigurationCenterTableActions.DeleteConfigurationSuccess();
                    }),
                    catchError(error =>
                        of(ConfigurationCenterTableActions.DeleteConfigurationFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ConfigurationCenterIndividualActions.AddConfigurationSuccess,
                ConfigurationCenterTableActions.DeleteConfigurationSuccess
            ),
            map(() => ConfigurationCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
