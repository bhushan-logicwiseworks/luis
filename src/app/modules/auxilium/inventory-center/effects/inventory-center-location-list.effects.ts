import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { InventoryCenterLocationListActions } from '../actions/inventory-center-location-list.actions';

@Injectable({
    providedIn: 'root',
})
export class InventoryCenterLocationListEffects {
    loadLocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterLocationListActions.LoadLocation),
            switchMap(action =>
                this.apiService.getLocationList(action.productId, action.location).pipe(
                    map(data => InventoryCenterLocationListActions.LoadLocationSuccess({ data })),
                    catchError(error =>
                        of(InventoryCenterLocationListActions.LoadLocationFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // addLocation$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(InventoryCenterLocationListActions.AddLocation),
    //         switchMap(action =>
    //             this.apiService.saveLocation(action.location).pipe(
    //                 map(location => {
    //                     ToastConfig.ADD_SUCCESS();
    //                     return InventoryCenterLocationListActions.AddLocationSuccess({  });
    //                 }),
    //                 catchError(error =>
    //                     of(InventoryCenterLocationListActions.AddLocationFailure({ error: error.error }))
    //                 )
    //             )
    //         )
    //     )
    // );

    LocationBinDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterLocationListActions.LocationBinDropdown),
            switchMap(() =>
                this.apiService.getLocationBinDropdown().pipe(
                    map(locationBin => InventoryCenterLocationListActions.LocationBinDropdownSuccess({ locationBin })),
                    catchError(error =>
                        of(InventoryCenterLocationListActions.LocationBinDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LocationCodeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryCenterLocationListActions.LocationCodeDropdown),
            switchMap(() =>
                this.apiService.getLocationCodeDropdown().pipe(
                    map(locationCode =>
                        InventoryCenterLocationListActions.LocationCodeDropdownSuccess({ locationCode })
                    ),
                    catchError(error =>
                        of(InventoryCenterLocationListActions.LocationCodeDropdownFailure({ error: error.error }))
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
