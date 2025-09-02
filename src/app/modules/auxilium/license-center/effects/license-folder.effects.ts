import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { VaultApiService } from 'app/shared/services/vault-api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromFileActions from '../actions/license-file.actions';
import * as fromLicenseFolderActions from '../actions/license-folder.action';
import { setFolder } from '../actions/license-folder.action';
import { LicenseFolderSelectors } from '../reducers';

@Injectable()
export class LicenseFolderEffects {
    upsertFolders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setFolder),
            withLatestFrom(this.store.select(LicenseFolderSelectors.selectAll)),
            switchMap(([{ id }, _folders]) => {
                const folders = _folders.filter(folder => folder.vaultId === id);
                if (folders.length) {
                    return of(fromLicenseFolderActions.upsertFoldersSuccess({ folders }));
                }
                return this.vaultApiService.getFolders(id).pipe(
                    map(newFolders =>
                        fromLicenseFolderActions.upsertFoldersSuccess({
                            folders: newFolders,
                        })
                    ),
                    catchError(error =>
                        of(
                            fromLicenseFolderActions.upsertFoldersFailure({
                                error,
                            })
                        )
                    )
                );
            })
        )
    );

    setCurrentFolder$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromLicenseFolderActions.setCurrentFolder),
                withLatestFrom(this.store.select(LicenseFolderSelectors.selectEntities)),
                map(([action, fileEntities]) => {
                    const licenseId = parseInt(window.location.href.split('/')[5], 10);
                    let link = `/company/license-center/${licenseId}/license-folder`;
                    if (action.folder?.folderId) {
                        link += `?folderId=${action.folder?.folderId}`;
                    }

                    const params = new URLSearchParams(window.location.search);
                    const currentFolderId = Number(params.get('folderId'));
                    if (!action.withFile && currentFolderId !== action.folder?.folderId) {
                        // history.pushState(null, null, link);
                        this.router.navigateByUrl(link);
                    }
                    if (action.withFile && !fileEntities[action.withFile]) {
                        this.vaultApiService.getFile(action.withFile).subscribe(e => {
                            this.store.dispatch(
                                fromFileActions.setSelectedFile({
                                    file: e[0],
                                })
                            );
                        });
                    }
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private vaultApiService: VaultApiService,
        private router: Router,
        private store: Store
    ) {}
}
