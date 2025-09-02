import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReorderCenterTableActions } from '../actions/reorder-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ReorderCenterTableEffects {
    loadReorder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReorderCenterTableActions.LoadReorder),
            switchMap(action =>
                this.apiService.getReorder(action.filter).pipe(
                    //tap(e => console.log(e, 'luis')),
                    map(Reorders => ReorderCenterTableActions.LoadReorderSuccess({ Reorders })),
                    catchError(error => of(ReorderCenterTableActions.LoadReorderFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
