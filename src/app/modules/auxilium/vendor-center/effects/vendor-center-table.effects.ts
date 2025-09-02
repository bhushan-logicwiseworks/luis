import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { VendorCenterIndividualActions } from '../actions/vendor-center-individual.actions';
import { VendorCenterTableActions } from '../actions/vendor-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class VendorCenterTableEffects {
    loadVendors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VendorCenterTableActions.LoadVendors),
            switchMap(action =>
                this.apiService.getVendors().pipe(
                    map(vendors => VendorCenterTableActions.LoadVendorsSuccess({ vendors })),
                    catchError(error => of(VendorCenterTableActions.LoadVendorsFailure({ error: error.error })))
                )
            )
        )
    );

    deleteVendor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VendorCenterTableActions.DeleteVendor),
            switchMap(action =>
                this.apiService.deleteVendor(action.dto).pipe(
                    map(vendors => VendorCenterTableActions.DeleteVendorSuccess()),
                    catchError(error => of(VendorCenterTableActions.DeleteVendorFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                VendorCenterIndividualActions.AddVendorSuccess,
                VendorCenterIndividualActions.UpdateVendorSuccess,
                VendorCenterTableActions.DeleteVendorSuccess
            ),
            map(() => VendorCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
