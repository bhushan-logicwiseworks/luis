import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BranchCenterIndividualActions } from '../actions/branch-center-individual.actions';
import { BranchCenterTableActions } from '../actions/branch-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class BranchCenterTableEffects {
    loadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BranchCenterTableActions.LoadBranches),
            switchMap(action =>
                this.apiService.getBranch().pipe(
                    map(branches => BranchCenterTableActions.LoadBranchesSuccess({ branches })),
                    catchError(error => of(BranchCenterTableActions.LoadBranchesFailure({ error: error.error })))
                )
            )
        )
    );

    deleteBranch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BranchCenterTableActions.DeleteBranch),
            switchMap(action =>
                this.apiService.deleteBranch(action.dto).pipe(
                    map(branch => BranchCenterTableActions.DeleteBranchSuccess()),
                    catchError(error => of(BranchCenterTableActions.DeleteBranchFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                BranchCenterIndividualActions.AddBranchSuccess,
                BranchCenterIndividualActions.UpdateBranchSuccess,
                BranchCenterTableActions.DeleteBranchSuccess
            ),
            map(() => BranchCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
