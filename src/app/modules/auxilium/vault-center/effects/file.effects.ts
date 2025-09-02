import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxPopupComponent } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ConfirmComponent } from 'app/shared/components/auxilium/confirm-dialog';
import { VaultApiService } from 'app/shared/services/vault-api.service';
import { b64toBlob } from 'app/shared/utils/b64toBlob';
import { forkJoin, of, zip } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderActions from '../actions/folder.actions';
import { FileUploadComponent } from '../components/file-upload.component';
import { UpdateElementComponent } from '../components/update-element.component';
import { FileSelectors, FolderSelectors, VaultsSelectors } from '../reducers';
import { FileActionsMenuService } from '../services/file-actions-menu.service';

@Injectable()
export class FileEffects {
    upsertFiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderActions.setCurrentFolder),
            tap(() => this.store.dispatch(fromFileActions.upsertFiles())),
            withLatestFrom(this.store.select(FileSelectors.selectFilesInFolder)),
            switchMap(([{ folder, withFile }, filesForTheFolder]) => {
                // if (withFile && filesForTheFolder.length) {
                //   return of(fromFileActions.upsertFilesSuccess({files: filesForTheFolder}));
                // }
                return this.vaultApiService.getFiles(folder?.folderId).pipe(
                    map(files => {
                        //console.log(files);
                        return fromFileActions.upsertFilesSuccess({ files });
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(fromFileActions.upsertFilesFailure({ error }));
                    })
                );
            })
        )
    );

    upsertChangesFiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFolderActions.setResetFiles),
            tap(() => this.store.dispatch(fromFileActions.upsertFiles())),
            switchMap(({ file }) => {
                return this.vaultApiService.getFiles(file.folderId).pipe(
                    mergeMap(files => {
                        let actions: any[] = [fromFileActions.upsertFilesSuccess({ files })];

                        const hasFile = files.find(fileObj => fileObj.fileId === file.fileId);

                        if (!hasFile) {
                            actions.push(fromFileActions.deleteFileSuccess({ ids: [file.fileId] }));
                        }
                        return actions;
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(fromFileActions.upsertFilesFailure({ error }));
                    })
                );
            })
        )
    );

    initAddFiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.initAddFiles),
            withLatestFrom(this.store.select(FolderSelectors.selectCurrentFolder)),
            switchMap(([{ files }, folder]) => {
                return this.dialog
                    .open(AuxPopupComponent, {
                        width: '40vw',
                        height: 'auto',
                        data: {
                            icon: 'mat_outline:edit_note',
                            title: 'Upload Files',
                            cancelButtonText: 'Cancel',
                            saveButtonText: 'Upload',
                            dynamicComponent: FileUploadComponent,
                            dynamicComponentData: { files, folder },
                            submitFunction: 'uploadFiles',
                            enterKeyEnabled: false,
                        },
                        autoFocus: false,
                    })
                    .afterClosed();
                //     this.dialog.closeAll()
                //     return this.dialog.open(FileUploadComponent, {
                //     data: {files, folder},
                //     autoFocus: false,
                //     minWidth: '40vw'
                //   }).afterClosed()
            }),

            filter(res => !!res),
            map(files => fromFileActions.addFiles({ files }))
        )
    );

    addFiles = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.addFiles),
            switchMap(({ files }) =>
                zip(...files.map(file => this.vaultApiService.addFile(file))).pipe(
                    map(_files => fromFileActions.addFilesSuccess({ allFiles: _files })),
                    catchError(error => of(fromFileActions.addFilesFailure({ error })))
                )
            )
        )
    );

    initUpdateFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.initUpdateFile),
            switchMap(({ file }) =>
                this.sheet.open(UpdateElementComponent, { data: { element: file, type: 'file' } }).afterDismissed()
            ),
            filter(e => !!e),
            map(file => fromFileActions.updateFile({ file, updateStatus: null }))
        )
    );

    updateFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.updateFile),
            withLatestFrom(this.store.select(FolderSelectors.selectCurrentFolder)),
            mergeMap(([{ file: f, updateStatus }, folder]) => {
                if (f.fileBlob) {
                    const b = f.fileBlob;
                    delete f.fileBlob;
                }
                return this.vaultApiService.addFile(f).pipe(
                    mergeMap(file => {
                        const actions: any[] = [
                            fromFileActions.updateFileSuccess({
                                file: { id: f.fileId, changes: file },
                                updateStatus: updateStatus,
                            }),
                        ];
                        if (updateStatus) {
                            actions.push(fromFolderActions.setResetFiles({ file }));
                        }
                        return actions;
                    }),
                    catchError(error => of(fromFileActions.updateFileFailure({ error }))),
                    tap(() => {
                        ToastConfig.CUSTOM_SUCCESS('fileSaveSuccess');
                    })
                );
            })
        )
    );

    loadTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.loadTags),
            switchMap(({ fileId }) =>
                this.vaultApiService.getTags(fileId).pipe(
                    tap(e => console.log(e, '')),
                    map(tags => fromFileActions.loadTagsSuccess({ tags, fileId })),
                    catchError(error => of(fromFileActions.loadTagsFailure({ error })))
                )
            )
        )
    );

    addTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.addTag),
            switchMap(({ tag: t }) =>
                this.vaultApiService.addTag(t).pipe(
                    tap(e => console.log(e)),
                    map(tag => fromFileActions.addTagSuccess({ tag })),
                    catchError(error => {
                        console.log(error);
                        return of(fromFileActions.addTagFailure({ error }));
                    })
                )
            )
        )
    );

    deleteTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.rmTag),
            switchMap(({ tag: t }) =>
                this.vaultApiService.deleteTag(t).pipe(
                    map(() => fromFileActions.rmTagSuccess()),
                    catchError(error => of(fromFileActions.rmTagFailure({ error })))
                )
            )
        )
    );

    loadNotifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.loadNotifications),
            switchMap(({ fileId }) => {
                return this.vaultApiService.getNotifications(fileId).pipe(
                    map(notification =>
                        fromFileActions.loadNotificationsSuccess({ notification: notification[0], fileId })
                    ),
                    catchError(error => of(fromFileActions.loadNotificationsFailure({ error })))
                );
            })
        )
    );

    addNotification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.addNotification),
            switchMap(({ notification: n }) => {
                return this.vaultApiService.addNotification(n).pipe(
                    map(notification => fromFileActions.addNotificationSuccess({ notification })),
                    catchError(error => of(fromFileActions.addNotificationFailure({ error })))
                );
            })
        )
    );

    deleteNotification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.rmNotification),
            switchMap(({ notification }) =>
                this.vaultApiService.deleteNotification(notification).pipe(
                    map(() => fromFileActions.rmNotificationSuccess()),
                    catchError(error => of(fromFileActions.rmNotificationFailure({ error })))
                )
            )
        )
    );

    updateFileSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.updateFileSuccess),
            withLatestFrom(this.store.select(VaultsSelectors.selectSelectedVaultId)),
            map(([file, vaultId]) => {
                if (file.updateStatus) {
                    const urlParams = new URLSearchParams(this.activatedRoute.snapshot.queryParams);
                    urlParams.delete('fileId');
                    const queryParams = urlParams.toString().length ? '?' + urlParams : '';
                    const link = `${window.location.origin}/centers/vault-center/${vaultId}${queryParams}`;
                    history.pushState(null, null, link);
                }
                return fromFileActions.setSelectedFile({ file: file.file.changes });
            })
        )
    );

    previewFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.previewFile),
            withLatestFrom(this.store.select(FileSelectors.selectSelectedFile)),
            switchMap(([{ file: fileObj }, f]) => {
                return this.vaultApiService.getFile(fileObj.fileId || f.fileId).pipe(
                    map(file => fromFileActions.previewFileSuccess({ file: file[0] })),
                    catchError(error => of(fromFileActions.previewFileFailure({ error })))
                );
            })
        )
    );

    previewFileSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromFileActions.previewFileSuccess),
                tap(({ file }) => {
                    const blob = b64toBlob(file.fileBlob, 'application/pdf');
                    const blobUrl = URL.createObjectURL(blob);
                    window?.open(blobUrl, '_blank');
                })
            ),
        { dispatch: false }
    );

    getFileURL$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.getPreviewFile),
            switchMap(({ id }) =>
                this.vaultApiService.getFile(id).pipe(
                    map(file => {
                        const blob = b64toBlob(file[0].fileBlob, 'application/pdf');
                        const blobUrl = URL.createObjectURL(blob);
                        return blobUrl;
                    }),
                    map(url => fromFileActions.getPreviewFileSuccess({ url })),
                    catchError(error => of(fromFileActions.previewFileFailure({ error })))
                )
            )
        )
    );

    downloadFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.downloadFile),
            switchMap(({ files }) => {
                const observables = files.map(file =>
                    this.vaultApiService.getFile(file.fileId).pipe(map(response => response[0]))
                );
                return forkJoin(observables).pipe(
                    map(filesResult => fromFileActions.downloadFileSuccess({ files: filesResult })),
                    catchError(error => of(fromFileActions.downloadFileFailure({ error })))
                );
            })
        )
    );

    downloadFileSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromFileActions.downloadFileSuccess),
                tap(({ files }) => {
                    files.forEach(file => {
                        const blob = b64toBlob(file.fileBlob, 'application/pdf');
                        const blobUrl = URL.createObjectURL(blob);
                        const el = document.createElement('a');
                        el.download = file.displayName;
                        el.href = blobUrl;
                        el.target = '_blank';
                        el.click();
                    });
                })
            ),
        { dispatch: false }
    );

    initDeleteFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.initDeleteFile),
            switchMap(files =>
                this.dialog
                    .open(AuxPopupComponent, {
                        width: '40vw',
                        height: 'auto',
                        data: {
                            icon: 'mat_outline:edit_note',
                            title: 'Delete Files',
                            cancelButtonText: 'Cancel',
                            saveButtonText: 'Confirm',
                            dynamicComponent: ConfirmComponent,
                            dynamicComponentData: {
                                message:
                                    '<div class="flex flex-col justify-center items-center"><span class="text-gray-500">Do you really want to delete</span><span class="text-red-500 font-bold">' +
                                    files.file
                                        .map(result => '<span class="block">' + result.displayName + '</span>')
                                        .join('') +
                                    '</span></div>',
                                obj: files.file,
                            },
                            submitFunction: 'confirmDelete',
                            enterKeyEnabled: false,
                        },
                        autoFocus: false,
                    })
                    .afterClosed()
            ),
            filter(e => !!e),
            tap(e => console.log(e)),
            switchMap(file => {
                this.fileActions.selection.clear();
                return of(fromFileActions.deleteFile({ file: file }));
            })
        )
    );

    deleteFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFileActions.deleteFile),
            withLatestFrom(this.store.select(FileSelectors.selectSelectedFile)),
            switchMap(([{ file }, selected]) => {
                const observables = file.map(item =>
                    this.vaultApiService.deleteFile({ fileId: (item || selected).fileId })
                );
                return forkJoin(observables).pipe(
                    map(filesResult => {
                        this.fileActions.selection.clear();
                        return fromFileActions.deleteFileSuccess({ ids: file.map(res => res.fileId) });
                    }),
                    catchError(error => of(fromFileActions.deleteFileFailure({ error })))
                );
            })
        )
    );

    setCurrentFolder$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromFileActions.setSelectedFile),
                withLatestFrom(
                    this.store.select(VaultsSelectors.selectSelectedVaultId),
                    this.store.select(FolderSelectors.selectCurrentFolderId)
                ),
                map(([{ file, skipNavigation = false }, vaultId, folderId]) => {
                    if (!skipNavigation) {
                        const queryParamsObj = {};
                        if (folderId) {
                            queryParamsObj['folderId'] = folderId;
                        }

                        if (file) {
                            queryParamsObj['fileId'] = file.fileId;
                        }
                        const urlParams = new URLSearchParams(queryParamsObj).toString();
                        const queryParams = urlParams.length ? '?' + urlParams : '';
                        const link = `/centers/vault-center/${vaultId}${queryParams}`;
                        // history.pushState(null, null, link);
                        this.router.navigateByUrl(link);
                    }
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private vaultApiService: VaultApiService,
        private dialog: MatDialog,
        private sheet: MatBottomSheet,
        private fileActions: FileActionsMenuService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}
}

// win IgT56bHGz*r&b(-
