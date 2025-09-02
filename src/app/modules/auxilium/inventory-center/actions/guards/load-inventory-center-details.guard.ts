import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { InventoryCenterProductSelectors } from '../../reducers';
import { InventoryCenterDeatilsActions } from '../inventory-center-details.action';

@Injectable()
export class LoadProductDetialsGuard implements CanActivate {
    loadInventoryProduct() {
        return this.store.select(InventoryCenterProductSelectors.selectInventoryCenterProductState).pipe(
            take(1),
            switchMap(state => {
                if (!state.inventoryclass.length) {
                    this.store.dispatch(InventoryCenterDeatilsActions.LoadClassDropdown());
                }

                if (!state.shipping.length) {
                    this.store.dispatch(InventoryCenterDeatilsActions.LoadShippingUnitsDropdown());
                }

                if (!state.status.length) {
                    this.store.dispatch(InventoryCenterDeatilsActions.LoadStatusDropdown());
                }

                if (!state.make.length) {
                    this.store.dispatch(InventoryCenterDeatilsActions.LoadMakeDropdown());
                }

                if (!state.modal.length) {
                    this.store.dispatch(InventoryCenterDeatilsActions.LoadModelDropdown());
                }

                if (!state.manufacturer.length) {
                    this.store.dispatch(InventoryCenterDeatilsActions.LoadManufacturerDropdown());
                }
                return of(true);
            })
        );
    }
    constructor(private store: Store<any>) {}
    canActivate(): Observable<boolean> {
        // return our Observable stream from above
        return this.loadInventoryProduct().pipe(
            // if it was successful, we can return Observable.of(true)
            switchMap(() => {
                return of(true);
            }),
            // otherwise, something went wrong
            catchError(err => {
                console.log('Error', err);
                return of(false);
            })
        );
    }
}
