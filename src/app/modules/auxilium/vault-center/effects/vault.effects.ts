import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxPopupComponent } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { File, FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';
import { VaultApiService } from 'app/shared/services/vault-api.service';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderActions from '../actions/folder.actions';
import * as fromVaultActions from '../actions/vault.actions';
import { CreateComponent } from '../components/create.component';
import { DirectLinkDisplayComponent } from '../components/direct-link-display.component';
import { FileSelectors, FolderSelectors, VaultsSelectors } from '../reducers';

@Injectable()
export class VaultEffects {
    loadVaults$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVaultActions.loadVaults),
            switchMap(() =>
                this.vaultApiService.getVaults().pipe(
                    map(vaults => fromVaultActions.loadVaultsSuccess({ vaults })),
                    catchError(error => of(fromVaultActions.loadVaultsFailure({ error })))
                )
            )
        )
    );

    addVault$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVaultActions.addVault),
            switchMap(({ vault }) =>
                this.vaultApiService.addVault(vault).pipe(
                    tap(c => console.log(c)),
                    mergeMap(createdVault => {
                        const link = `/centers/vault-center/${createdVault.vaultId}`;
                        // history.pushState(null, null, link);
                        this.router.navigateByUrl(link);
                        return [
                            fromVaultActions.addVaultSuccess({ vault: createdVault }),
                            fromVaultActions.setCurrentVault({ id: createdVault.vaultId }),
                            fromFolderActions.clearCurrentFolder(),
                            fromFileActions.setSelectedFile({ file: null, skipNavigation: true }),
                        ];
                    }),
                    catchError(error => of(fromVaultActions.addVaultFailure({ error })))
                )
            )
        )
    );

    initAddVault$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVaultActions.initAddVault),
            switchMap(() =>
                this.dialog
                    .open(AuxPopupComponent, {
                        width: '30vw',
                        height: 'auto',
                        data: {
                            icon: 'mat_outline:edit_note',
                            title: 'Create a new Vault',
                            cancelButtonText: 'Cancel',
                            saveButtonText: 'Save',
                            dynamicComponent: CreateComponent,
                            dynamicComponentData: { toCreate: 'Vault' },
                            submitFunction: 'add',
                            enterKeyEnabled: false,
                        },
                        autoFocus: false,
                    })
                    .afterClosed()
            ),
            // this.dialog.open(CreateComponent, {data: {toCreate: 'Vault'}, minWidth: '30vw'}).afterClosed()),
            filter(data => !!data),
            map(data =>
                fromVaultActions.addVault({
                    vault: {
                        vaultName: data.name.toUpperCase(),
                        vaultDescription: (data.description || '').toUpperCase(),
                    },
                })
            )
        )
    );

    updateVault$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVaultActions.updateVault),
            switchMap(({ vault: v }) =>
                this.vaultApiService
                    .addVault({
                        vaultId: Number(v.id),
                        vaultDescription: v.changes.vaultDescription,
                        vaultName: v.changes.vaultName,
                    })
                    .pipe(
                        map(vault =>
                            fromVaultActions.updateVaultSuccess({ vault: { id: vault.vaultId, changes: vault } })
                        ),
                        catchError(error => of(fromVaultActions.updateVaultFailure({ error })))
                    )
            )
        )
    );

    deleteVault$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVaultActions.deleteVault),
            withLatestFrom(this.store.select(VaultsSelectors.selectAll)),
            switchMap(([{ id }, vaults]) =>
                this.vaultApiService.deleteVault(id).pipe(
                    mergeMap(() => {
                        const vaultIndex = vaults.findIndex(vault => vault.vaultId === Number(id));
                        let newlySelectedVaultIndex = null;
                        if (vaultIndex > 0) {
                            newlySelectedVaultIndex = 0;
                        } else if (vaultIndex === 0) {
                            newlySelectedVaultIndex = 1;
                        }

                        const selectedVaultId =
                            newlySelectedVaultIndex !== null ? vaults[newlySelectedVaultIndex].vaultId : null;
                        return [
                            fromVaultActions.deleteVaultSuccess({ id }),
                            fromVaultActions.setCurrentVault({ id: selectedVaultId }),
                            fromFolderActions.clearCurrentFolder(),
                            fromFileActions.setSelectedFile({ file: null }),
                        ];
                    }),
                    catchError(error => of(fromVaultActions.deleteVaultFailure({ error })))
                )
            )
        )
    );

    generateDirectLink$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromVaultActions.generateDirectLink),
                withLatestFrom(
                    this.store.select(VaultsSelectors.selectCurrentVault),
                    this.store.select(FolderSelectors.selectCurrentFolder),
                    this.store.select(FileSelectors.selectSelectedFile)
                ),
                map(([{ resource, resourceType }, vault, folder, file]) => {
                    let link = `${window.location.origin}/centers/vault-center/`;
                    if (vault) {
                        link += vault.vaultId;
                    }
                    // if (folder) {
                    //   link += '?folderId=' + folder.folderId;
                    // }
                    // if (file || fileId) {
                    //   link += '&fileId=' + (fileId || file.fileId);
                    // }
                    if (resourceType === 'folder') {
                        link += '?folderId=' + (resource as FolderComplete).folderId;
                    }
                    if (resourceType === 'file') {
                        link += `?folderId=${(resource as File).folderId}&fileId=${(resource as File).fileId}`;
                    }
                    this.snackbar.openFromComponent(DirectLinkDisplayComponent, {
                        data: { link },
                    });
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private vaultApiService: VaultApiService,
        private dialog: MatDialog,
        private snackbar: MatSnackBar,
        private router: Router
    ) {}
}
