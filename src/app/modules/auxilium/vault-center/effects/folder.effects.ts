import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderTreeActions from '../actions/folder-tree.actions';
import * as fromFolderActions from '../actions/folder.actions';
import * as fromVaultActions from '../actions/vault.actions';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { AuxPopupComponent } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ConfirmComponent } from 'app/shared/components/auxilium/confirm-dialog';
import { FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';
import { VaultApiService } from 'app/shared/services/vault-api.service';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CreateComponent } from '../components/create.component';
import { UpdateElementComponent } from '../components/update-element.component';
import { FileSelectors, FolderSelectors, VaultsSelectors } from '../reducers';
import { FileActionsMenuService } from '../services/file-actions-menu.service';

@Injectable()
export class FolderEffects {
    upsertFolders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVaultActions.setCurrentVault),
            withLatestFrom(this.store.select(FolderSelectors.selectAll)),
            switchMap(([{ id }, _folders]) => {
                const folders = _folders.filter(folder => folder.vaultId === id);
                if (folders.length) {
                    return of(fromFolderActions.upsertFoldersSuccess({ folders }));
                }
                return this.vaultApiService.getFolders(id).pipe(
                    map(newFolders => fromFolderActions.upsertFoldersSuccess({ folders: newFolders })),
                    catchError(error => of(fromFolderActions.upsertFoldersFailure({ error })))
                );
            })
        )
    );

    addFolder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderActions.addFolder),
            withLatestFrom(this.store.select(VaultsSelectors.selectCurrentVault)),
            switchMap(([{ folder }]) => {
                return this.vaultApiService.addFolder(folder).pipe(
                    mergeMap(createdFolder => {
                        return [
                            fromFolderActions.addFolderSuccess({
                                folder: { ...createdFolder, folderParentId: createdFolder.folderParentId.toString() },
                            }),
                            fromFolderTreeActions.updateFolderTree({ vaultId: createdFolder.vaultId }),
                            fromVaultActions.setCurrentVault({ id: folder.vaultId }),
                            // fromFolderActions.setCurrentFolder({folder: createdFolder})
                        ];
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(fromFolderActions.addFolderFailure({ error }));
                    })
                );
            })
        )
    );

    initUpdateFolder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderActions.initUpdateFolder),
            switchMap(({ folder }) =>
                this.sheet.open(UpdateElementComponent, { data: { element: folder, type: 'folder' } }).afterDismissed()
            ),
            filter(e => !!e),
            map(folder => fromFolderActions.updateFolder({ folder }))
        )
    );

    updateFolder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderActions.updateFolder),
            withLatestFrom(this.store.select(VaultsSelectors.selectCurrentVault)),
            mergeMap(([{ folder: f, preventSetCurrent }, vault]) => {
                // console.log(f, 'oldFolder');
                return this.vaultApiService.addFolder(f).pipe(
                    tap(e => console.log(e, 'newFolder')),
                    mergeMap((folder: FolderComplete) => {
                        const folderId = folder.folderId;
                        return [
                            fromFolderActions.updateFolderSuccess({
                                folder: {
                                    id: folderId,
                                    changes: folder,
                                },
                            }),
                            fromFolderTreeActions.updateFolderTree({ vaultId: vault.vaultId }),
                            // fromFolderActions.setCurrentFolder({folder: folder}),
                            fromVaultActions.setCurrentVault({ id: folder.vaultId }),
                        ];
                    }),
                    catchError(error => of(fromFolderActions.updateFolderFailure({ error })))
                );
            })
        )
    );

    initAddFolder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderActions.initAddFolder),
            withLatestFrom(
                this.store.select(FolderSelectors.selectCurrentFolder),
                this.store.select(VaultsSelectors.selectCurrentVault)
            ),
            switchMap(([_, latestFolder, latestVault]) =>
                this.dialog
                    .open(AuxPopupComponent, {
                        width: '30vw',
                        height: 'auto',
                        data: {
                            icon: 'mat_outline:edit_note',
                            title: 'Create a new Folder',
                            cancelButtonText: 'Cancel',
                            saveButtonText: 'Save',
                            dynamicComponent: CreateComponent,
                            dynamicComponentData: {
                                toCreate: 'Folder',
                                createInVault: latestVault,
                                createInFolder: latestFolder,
                            },
                            submitFunction: 'add',
                            enterKeyEnabled: false,
                        },
                        autoFocus: false,
                    })
                    .afterClosed()
            ),
            //     this.dialog.open(CreateComponent, {
            //     data: {
            //       toCreate: 'Folder',
            //       createInVault: latestVault,
            //       createInFolder: latestFolder
            //     }, minWidth: '30vw'
            //   }).afterClosed()),
            filter(data => !!data),
            map(data =>
                fromFolderActions.addFolder({
                    folder: {
                        folderName: data.name.toUpperCase(),
                        folderDescription: data.description?.toUpperCase(),
                        folderParentId: String(data.parentId),
                        vaultId: data.vaultId,
                    },
                })
            )
        )
    );

    initDeleteFolder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderActions.initDeleteFolder),
            switchMap(({ folder }) => {
                return this.dialog
                    .open(AuxPopupComponent, {
                        width: '40vw',
                        height: 'auto',
                        data: {
                            icon: 'mat_outline:edit_note',
                            title: 'Delete Folder',
                            cancelButtonText: 'Cancel',
                            saveButtonText: 'Confirm',
                            dynamicComponent: ConfirmComponent,
                            dynamicComponentData: {
                                message:
                                    '<div class="flex flex-col justify-center items-center"><span class="text-gray-500">Do you really want to delete</span><span class="text-red-500 font-bold">' +
                                    folder.map(res => res.folderName) +
                                    '</span><span>and all of its files?</span></div>',
                                obj: folder.map(result => result.folderId),
                            },
                            submitFunction: 'confirmDelete',
                            enterKeyEnabled: false,
                        },
                        autoFocus: false,
                    })
                    .afterClosed();
            }),
            filter(e => !!e),
            map(folderId => {
                return fromFolderActions.deleteFolder({ id: folderId });
            })
        )
    );

    deleteFolder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderActions.deleteFolder),
            withLatestFrom(
                this.store.select(VaultsSelectors.selectCurrentVault),
                this.store.select(FolderSelectors.selectCurrentFolder)
            ),
            switchMap(([{ id }, vault, folder]) => {
                const observables = id.map(item => this.vaultApiService.deleteFolder(item));
                return forkJoin(observables).pipe(
                    mergeMap(folderResult => {
                        this.fileActions.selection.clear();
                        return [
                            fromFolderActions.deleteFolderSuccess({ id }),
                            fromFolderTreeActions.updateFolderTree({ vaultId: vault.vaultId }),
                            fromFolderActions.setCurrentFolder({ folder }),
                        ];
                    }),
                    catchError(error => of(fromFolderActions.deleteFolderFailure({ error })))
                );
            })
        )
    );

    setCurrentFolder$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromFolderActions.setCurrentFolder),
                withLatestFrom(
                    this.store.select(VaultsSelectors.selectSelectedVaultId),
                    this.store.select(FileSelectors.selectEntities)
                ),
                map(([action, vaultId, fileEntities]) => {
                    let link = `/centers/vault-center/${vaultId}`;
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
                            this.store.dispatch(fromFileActions.addFile({ file: e[0] }));
                            this.store.dispatch(fromFileActions.setSelectedFile({ file: e[0] }));
                        });
                    }
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private dialog: MatDialog,
        private vaultApiService: VaultApiService,
        private sheet: MatBottomSheet,
        private fileActions: FileActionsMenuService,
        private router: Router
    ) {}
}
