import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { ShortcutCenterTableActions } from '../action/shortcut-center-table.action';

@Injectable({
    providedIn: 'root',
})
export class ShortcutCenterTableEffects {
    loadShortcut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ShortcutCenterTableActions.LoadShortcut,
                ShortcutCenterTableActions.SaveShortcutsSuccess,
                ShortcutCenterTableActions.DeleteShortcutSuccess
            ),
            switchMap(action =>
                this.apiService.getAllShortcut().pipe(
                    map(shortcuts => ShortcutCenterTableActions.LoadShortcutSuccess({ shortcuts })),
                    catchError(error => of(ShortcutCenterTableActions.LoadShortcutFailure({ error: error.error })))
                )
            )
        )
    );

    loadShortcutItemCodes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShortcutCenterTableActions.LoadSelectedShortcutDetailsSuccess),
            switchMap(({ shortcut }) => {
                const itemCodes = [
                    shortcut.itemId1,
                    shortcut.itemId2,
                    shortcut.itemId3,
                    shortcut.itemId4,
                    shortcut.itemId5,
                    shortcut.itemId6,
                    shortcut.itemId7,
                ];
                const itemCodesObservables = itemCodes.map(itemCode =>
                    this.apiService.getShortcutItemCode(itemCode).pipe(
                        map(data => ({
                            ...(data as unknown as Record<string, string>),
                            itemCode,
                        }))
                    )
                );
                return forkJoin(itemCodesObservables).pipe(
                    map(results => ShortcutCenterTableActions.LoadShortcutItemCodesSuccess({ itemCodes: results })),
                    catchError(error =>
                        of(ShortcutCenterTableActions.LoadShortcutItemCodesFailure({ error: error.error }))
                    )
                );
            })
        )
    );

    saveShortcuts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShortcutCenterTableActions.SaveShortcuts),
            switchMap(action =>
                this.apiService.addShortcuts(action.shortcuts).pipe(
                    map(shortcut => {
                        ToastConfig.ADD_SUCCESS();
                        return ShortcutCenterTableActions.SaveShortcutsSuccess();
                    }),
                    catchError(error => of(ShortcutCenterTableActions.SaveShortcutsFailure({ error: error.error })))
                )
            )
        )
    );

    deleteShortcut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShortcutCenterTableActions.DeleteShortcut),
            switchMap(action =>
                this.apiService.deleteShortcut(action.shortcut).pipe(
                    map(shortcut => {
                        ToastConfig.DELETE_SUCCESS();
                        return ShortcutCenterTableActions.DeleteShortcutSuccess();
                    }),
                    catchError(error => of(ShortcutCenterTableActions.DeleteShortcutFailure({ error: error.error })))
                )
            )
        )
    );

    loadSelectedShortcuts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShortcutCenterTableActions.LoadSelectedShortcutDetails),
            switchMap(action =>
                this.apiService.getSelectedShortcut(action.id).pipe(
                    map(shortcut => ShortcutCenterTableActions.LoadSelectedShortcutDetailsSuccess({ shortcut })),
                    catchError(error =>
                        of(ShortcutCenterTableActions.LoadSelectedShortcutDetailsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadBillTypesDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShortcutCenterTableActions.BillTypeDropdown),
            switchMap(action =>
                this.apiService.getShortcutBillTypeDropdown().pipe(
                    map(billType => ShortcutCenterTableActions.BillTypeDropdownSuccess({ billType })),
                    catchError(error => of(ShortcutCenterTableActions.BillTypeDropdownFailure({ error: error.error })))
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
