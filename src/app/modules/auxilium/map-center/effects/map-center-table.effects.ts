import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MapCenterTableActions } from '../actions/map-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class MapListTableEffects {
    loadMapList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MapCenterTableActions.LoadAMapList),
            switchMap(action =>
                this.apiService.getMapPoints(action.filter).pipe(
                    map(maplist => MapCenterTableActions.LoadAMapListSuccess({ maplist })),
                    catchError(error => of(MapCenterTableActions.LoadAMapListFailure({ error: error.error })))
                )
            )
        )
    );

    loadSalesReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MapCenterTableActions.LoadSalesReps),
            switchMap(action =>
                this.apiService.getMapCenterSalesReps().pipe(
                    map(salesreps => MapCenterTableActions.LoadSalesRepsSuccess({ salesreps })),
                    catchError(error => of(MapCenterTableActions.LoadSalesRepsFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(),
            map(() => MapCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
