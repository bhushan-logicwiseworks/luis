import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { VaultApiService } from 'app/shared/services/vault-api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { traverse } from '../../vault-center/utils/buildFolderBreadcrumbs';
import * as fromFolderTreeActions from '../actions/license-folder-tree.actions';
import * as fromLicenseFolderAction from '../actions/license-folder.action';
import { LicenseFolderTreeSelectors } from '../reducers';

@Injectable()
export class LicenseFolderTreeEffects {
    upsertFolderTrees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFolderAction.setFolder),
            withLatestFrom(this.store.select(LicenseFolderTreeSelectors.selectEntities)),
            switchMap(([{ id }, latest]) => {
                if (Object.keys(latest).includes(String(id))) {
                    return of(fromFolderTreeActions.upsertFolderTreeSuccess({ folderTree: latest[id] }));
                }
                return this.vaultApiService.getFolderTreeJson(id).pipe(
                    map(folderTree => fromFolderTreeActions.upsertFolderTreeSuccess({ folderTree })),
                    catchError(error => {
                        console.log(error);
                        return of(fromFolderTreeActions.upsertFolderTreeFailure({ error }));
                    })
                );
            })
        )
    );

    updateFolderTree$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderTreeActions.updateFolderTree),
            switchMap(({ vaultId }) => {
                return this.vaultApiService.getFolderTreeJson(vaultId).pipe(
                    map(folderTree =>
                        fromFolderTreeActions.updateFolderTreeSuccess({
                            folderTree: { id: vaultId, changes: folderTree },
                        })
                    ),

                    catchError(error => {
                        return of(fromFolderTreeActions.updateFolderTreeFailure({ error }));
                    })
                );
            })
        )
    );

    buildFolderTreeBreadcrumbs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderTreeActions.upsertFolderTreeSuccess, fromFolderTreeActions.updateFolderTreeSuccess),
            withLatestFrom(this.store.select(LicenseFolderTreeSelectors.selectEntities)),
            map(([_, entities]) =>
                Object.entries(entities).reduce((a, [k, v]) => {
                    a[k] = traverse(v);
                    return a;
                }, Object.create(null))
            ),
            map(breadcrumbs => fromFolderTreeActions.setFolderTreeBreadcrumbsSuccess({ breadcrumbs }))
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private vaultApiService: VaultApiService
    ) {}
}
