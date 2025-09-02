import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { BranchCenterIndividualActions } from '../actions/branch-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class BranchCenterIndividualEffects {
    addBranchRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BranchCenterIndividualActions.AddBranch),
            switchMap(action =>
                this.apiService.saveBranch(action.branch).pipe(
                    map(branch => BranchCenterIndividualActions.AddBranchSuccess({ branch })),
                    catchError(error => of(BranchCenterIndividualActions.AddBranchFailure({ error: error.error })))
                )
            )
        )
    );

    updateBranchRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BranchCenterIndividualActions.UpdateBranch),
            switchMap(action =>
                this.apiService.saveBranch(action.branch).pipe(
                    map(branch => BranchCenterIndividualActions.AddBranchSuccess({ branch })),
                    catchError(error => of(BranchCenterIndividualActions.AddBranchFailure({ error: error.error })))
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BranchCenterIndividualActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup =>
                        BranchCenterIndividualActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })
                    ),
                    catchError(error =>
                        of(BranchCenterIndividualActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
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
