import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxPopupComponent } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { VaultApiService } from 'app/shared/services/vault-api.service';
import { b64toBlob } from 'app/shared/utils/b64toBlob';
import { catchError, filter, forkJoin, map, mergeMap, of, switchMap, tap, withLatestFrom, zip } from 'rxjs';
import Swal from 'sweetalert2';
import { UpdateElementComponent } from '../../vault-center/components/update-element.component';
import * as fromLicenseFileAction from '../actions/license-file.actions';
import * as fromLicenseFolderAction from '../actions/license-folder.action';
import { LicenseFileUploadComponent } from '../components/license-file-upload/license-file-upload.component';
import { LicenseFileSelectors, LicenseFolderSelectors } from '../reducers';
@Injectable()
export class LicenseFileEffects {
    loadTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.loadTags),
            switchMap(({ fileId }) =>
                this.vaultApiService.getTags(fileId).pipe(
                    map(tags => fromLicenseFileAction.loadTagsSuccess({ tags, fileId })),
                    catchError(error => of(fromLicenseFileAction.loadTagsFailure({ error })))
                )
            )
        )
    );

    initAddFiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.initAddFiles),
            withLatestFrom(this.store.select(LicenseFolderSelectors.selectCurrentFolder)),
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
                            dynamicComponent: LicenseFileUploadComponent,
                            dynamicComponentData: { files, folder },
                            submitFunction: 'uploadFiles',
                            enterKeyEnabled: false,
                        },
                        autoFocus: false,
                    })
                    .afterClosed();
            }),

            filter(res => !!res),
            map(files => fromLicenseFileAction.addFiles({ files }))
        )
    );

    addFiles = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.addFiles),
            switchMap(({ files }) =>
                zip(...files.map(file => this.vaultApiService.addFile(file))).pipe(
                    map(_files =>
                        fromLicenseFileAction.addFilesSuccess({
                            allFiles: _files,
                        })
                    ),
                    catchError(error => of(fromLicenseFileAction.addFilesFailure({ error })))
                )
            )
        )
    );

    loadNotifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.loadNotifications),
            switchMap(({ fileId }) => {
                return this.vaultApiService.getNotifications(fileId).pipe(
                    map(notification =>
                        fromLicenseFileAction.loadNotificationsSuccess({
                            notification: notification[0],
                            fileId,
                        })
                    ),
                    catchError(error =>
                        of(
                            fromLicenseFileAction.loadNotificationsFailure({
                                error,
                            })
                        )
                    )
                );
            })
        )
    );

    downloadFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.downloadFile),
            switchMap(({ files }) => {
                const observables = files.map(file =>
                    this.vaultApiService.getFile(file.fileId).pipe(map(response => response[0]))
                );
                return forkJoin(observables).pipe(
                    map(filesResult =>
                        fromLicenseFileAction.downloadFileSuccess({
                            files: filesResult,
                        })
                    ),
                    catchError(error => of(fromLicenseFileAction.downloadFileFailure({ error })))
                );
            })
        )
    );

    downloadFileSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromLicenseFileAction.downloadFileSuccess),
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

    initUpdateFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.initUpdateFile),
            switchMap(({ file }) =>
                this.sheet
                    .open(UpdateElementComponent, {
                        data: { element: file, type: 'file' },
                    })
                    .afterDismissed()
            ),
            filter(e => !!e),
            map(file => fromLicenseFileAction.updateFile({ file, updateStatus: null }))
        )
    );

    updateFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.updateFile),
            withLatestFrom(this.store.select(LicenseFolderSelectors.selectCurrentFolder)),
            mergeMap(([{ file: f, updateStatus }, folder]) => {
                if (f.fileBlob) {
                    const b = f.fileBlob;
                    delete f.fileBlob;
                }
                return this.vaultApiService.addFile(f).pipe(
                    mergeMap(file => {
                        const actions: any[] = [
                            fromLicenseFileAction.updateFileSuccess({
                                file: { id: f.fileId, changes: file },
                                updateStatus: updateStatus,
                            }),
                        ];
                        if (updateStatus) {
                            actions.push(fromLicenseFolderAction.setResetFiles({ file }));
                        }
                        return actions;
                    }),
                    catchError(error => of(fromLicenseFileAction.updateFileFailure({ error }))),
                    tap(() => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your file has been saved',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                );
            })
        )
    );

    previewFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.previewFile),
            withLatestFrom(this.store.select(LicenseFileSelectors.selectSelectedFile)),
            switchMap(([{ file: fileObj }, f]) => {
                return this.vaultApiService.getFile(fileObj.fileId || f.fileId).pipe(
                    map(file =>
                        fromLicenseFileAction.previewFileSuccess({
                            file: file[0],
                        })
                    ),
                    catchError(error =>
                        of(
                            fromLicenseFileAction.previewFileFailure({
                                error,
                            })
                        )
                    )
                );
            })
        )
    );

    previewFileSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromLicenseFileAction.previewFileSuccess),
                tap(({ file }) => {
                    const blob = b64toBlob(file.fileBlob, 'application/pdf');
                    const blobUrl = URL.createObjectURL(blob);
                    window?.open(blobUrl, '_blank');
                })
            ),
        { dispatch: false }
    );

    addTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.addTag),
            switchMap(({ tag: t }) =>
                this.vaultApiService.addTag(t).pipe(
                    map(tag => fromLicenseFileAction.addTagSuccess({ tag })),
                    catchError(error => {
                        console.log(error);
                        return of(fromLicenseFileAction.addTagFailure({ error }));
                    })
                )
            )
        )
    );

    deleteTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.rmTag),
            switchMap(({ tag: t }) =>
                this.vaultApiService.deleteTag(t).pipe(
                    map(() => fromLicenseFileAction.rmTagSuccess()),
                    catchError(error => of(fromLicenseFileAction.rmTagFailure({ error })))
                )
            )
        )
    );

    getFileURL$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFileAction.getPreviewFile),
            switchMap(({ id }) =>
                this.vaultApiService.getFile(id).pipe(
                    map(file => {
                        const blob = b64toBlob(file[0].fileBlob, 'application/pdf');
                        const blobUrl = URL.createObjectURL(blob);
                        return blobUrl;
                    }),
                    map(url => fromLicenseFileAction.getPreviewFileSuccess({ url })),
                    catchError(error => of(fromLicenseFileAction.previewFileFailure({ error })))
                )
            )
        )
    );

    upsertFiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLicenseFolderAction.setCurrentFolder),
            tap(() => this.store.dispatch(fromLicenseFileAction.upsertFiles())),
            withLatestFrom(this.store.select(LicenseFileSelectors.selectFilesInFolder)),
            switchMap(([{ folder, withFile }, filesForTheFolder]) => {
                return this.vaultApiService.getFiles(folder?.folderId).pipe(
                    map(files => {
                        //console.log(files);
                        return fromLicenseFileAction.upsertFilesSuccess({
                            files,
                        });
                    }),
                    catchError(error => {
                        console.log(error);
                        return of(fromLicenseFileAction.upsertFilesFailure({ error }));
                    })
                );
            })
        )
    );

    setCurrentFolder$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromLicenseFileAction.setSelectedFile),
                withLatestFrom(this.store.select(LicenseFolderSelectors.selectCurrentFolderId)),
                map(([{ file, skipNavigation = false }, folderId]) => {
                    const licenseId = parseInt(window.location.href.split('/')[5], 10);
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
                        const link = `/company/license-center/${licenseId}/license-folder${queryParams}`;
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
        private router: Router,
        private vaultApiService: VaultApiService,
        private sheet: MatBottomSheet,
        private dialog: MatDialog
    ) {}
}
