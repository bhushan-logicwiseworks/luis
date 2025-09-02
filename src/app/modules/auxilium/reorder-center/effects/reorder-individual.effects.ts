import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';

@Injectable({
    providedIn: 'root',
})
export class ReorderIndividualEffects {
    /* addAccess$ = createEffect(() => this.actions$.pipe(
    ofType(JobIndividualActions.CreateAccess),
    switchMap(action =>
      this.apiService.addAccess({
        ...action.dto
      }).pipe(
        map(access => JobIndividualActions.CreateAccessSuccess({ access })),
        catchError(error => of(JobIndividualActions.CreateAccessFailure({ error: error.error })))
      )
    )
  )); */

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
