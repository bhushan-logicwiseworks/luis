import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EventTrackingTableActions } from '../actions/event-trackingtable.actions';

@Injectable({
    providedIn: 'root',
})
export class EventTrackingTableEffects {
    loadOwners$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingTableActions.LoadOwners),
            switchMap(action =>
                this.apiService.getOwners().pipe(
                    map(owners => EventTrackingTableActions.LoadOwnersSuccess({ owners })),
                    catchError(error => of(EventTrackingTableActions.LoadOwnersFailure({ error: error.error })))
                )
            )
        )
    );

    LoadEventInformation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingTableActions.LoadEventInformation),
            switchMap(action =>
                this.apiService.getEventByStatusAndDateRange(action.status, action.dateRangeOption).pipe(
                    //tap(e => console.log(e, 'luis')),
                    map(StatusInformation =>
                        EventTrackingTableActions.LoadEventInformationSuccess({ StatusInformation })
                    ),
                    catchError(error =>
                        of(EventTrackingTableActions.LoadEventInformationFailure({ error: error.error }))
                    )
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
