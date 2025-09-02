import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PhysicianCenterIndividualActions } from '../actions/physician-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class PhysicianCenterIndividualEffects {
    addPhysician$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterIndividualActions.AddPhysicianRep),
            switchMap(action =>
                this.apiService.savePhysicians(action.physician).pipe(
                    map(physician => {
                        ToastConfig.ADD_SUCCESS();
                        return PhysicianCenterIndividualActions.AddPhysicianRepSuccess({ physician });
                    }),
                    catchError(error =>
                        of(PhysicianCenterIndividualActions.AddPhysicianRepFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    updatePhysician$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterIndividualActions.UpdatePhysician),
            switchMap(action =>
                this.apiService.savePhysicians(action.physician).pipe(
                    map(physician => PhysicianCenterIndividualActions.AddPhysicianRepSuccess({ physician })),
                    catchError(error =>
                        of(PhysicianCenterIndividualActions.AddPhysicianRepFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deletePhysician$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterIndividualActions.DeletePhysician),
            switchMap(action =>
                this.apiService.deletePhysicians(action.phy).pipe(
                    map(salesrep => PhysicianCenterIndividualActions.DeletePhysicianSuccess()),
                    catchError(error =>
                        of(PhysicianCenterIndividualActions.DeletePhysicianFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterIndividualActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup =>
                        PhysicianCenterIndividualActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })
                    ),
                    catchError(error =>
                        of(PhysicianCenterIndividualActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterIndividualActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => PhysicianCenterIndividualActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error =>
                        of(PhysicianCenterIndividualActions.LoadBranchDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PhysicianCenterIndividualActions.LoadCityAndStateDropDownSuccess),
            map(() => PhysicianCenterIndividualActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
