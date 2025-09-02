import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import icGallery from '@iconify/icons-ic/baseline-view-module';
import icCloudDownload from '@iconify/icons-ic/outline-cloud-download';
import icTrash from '@iconify/icons-ic/outline-delete';
import icEye from '@iconify/icons-ic/outline-remove-red-eye';
import icList from '@iconify/icons-ic/outline-view-list';
import icPencil from '@iconify/icons-ic/round-edit';
import icAdd from '@iconify/icons-ic/twotone-add-box';
import icCopyAll from '@iconify/icons-ic/twotone-file-copy';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icFile from '@iconify/icons-ic/twotone-insert-drive-file';
import icLink from '@iconify/icons-ic/twotone-insert-link';
import icMoreVert from '@iconify/icons-ic/twotone-move-to-inbox';
import icRefresh from '@iconify/icons-ic/twotone-refresh';
import icCloudCircle from '@iconify/icons-ic/twotone-snippet-folder';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { stagger40ms } from 'app/core/animations/stagger.animation';
import { AuthSelectors } from 'app/reducers';
import { AuxPopupComponent } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { File, FolderComplete, VaultComplete } from 'app/shared/interfaces/user/vault-api.interface';
import { keyBy } from 'lodash-es';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderActions from '../actions/folder.actions';
import * as fromVaultActions from '../actions/vault.actions';
import { FileSelectors, FolderSelectors, VaultsSelectors } from '../reducers';
import { FileActionsMenuService } from '../services/file-actions-menu.service';
import { CreateComponent } from './create.component';
import { ActionButtonComponent } from './action-button.component';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDivider } from '@angular/material/divider';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ac-vault-center-action-bar',
    templateUrl: './vault-center-action-bar.component.html',
    styleUrls: ['./vault-center-action-bar.component.scss'],
    animations: [stagger40ms, fadeInUp400ms],
    imports: [
        ActionButtonComponent,
        MatTooltip,
        MatDivider,
        NgTemplateOutlet,
        AsyncPipe,
    ],
})
export class FileVaultActionBarComponent implements OnInit {
    icAdd = icAdd;
    icRefresh = icRefresh;
    icCloudDownload = icCloudDownload;
    icTrash = icTrash;
    icEye = icEye;
    icList = icList;
    icGallery = icGallery;
    icCloudCircle = icCloudCircle;
    icFolder = icFolder;
    icFile = icFile;
    icLink = icLink;
    icCopyAll = icCopyAll;
    icMoreVert = icMoreVert;
    icPencil = icPencil;
    isAdmin: boolean = false;
    vaultData: VaultComplete;

    viewMode$ = this.store.select(FileSelectors.selectViewMode);
    selectedFile$ = this.store.select(FileSelectors.selectSelectedFile);
    displayFn$ = this.store.select(AuthSelectors.selectIsAdmin);
    selectedVault$ = this.store.select(VaultsSelectors.selectCurrentVault);
    files$ = this.store.select(FileSelectors.selectFilesInFolder);
    folderChildren$ = this.store.select(FolderSelectors.selectChildren);
    selectedFileFolderMap: Record<number, File | FolderComplete> = {};

    constructor(
        private store: Store,
        public fileActions: FileActionsMenuService,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.displayFn$.pipe(untilDestroyed(this)).subscribe(userIsAdmin => {
            if (userIsAdmin == true) {
                this.isAdmin = true;
            } else {
                this.isAdmin = false;
            }
        });
        this.selectedVault$.pipe(untilDestroyed(this)).subscribe(result => {
            this.vaultData = result;
        });
        combineLatest([this.files$, this.folderChildren$])
            .pipe(untilDestroyed(this))
            .subscribe(([files, folders]) => {
                if (folders) {
                    this.selectedFileFolderMap = {
                        ...this.selectedFileFolderMap,
                        ...keyBy(folders, 'folderId'),
                    };
                }
                if (files) {
                    this.selectedFileFolderMap = {
                        ...this.selectedFileFolderMap,
                        ...keyBy(files, 'fileId'),
                    };
                }
            });
    }

    setViewMode(viewMode: 'list' | 'gallery') {
        this.store.dispatch(fromFileActions.setViewMode({ viewMode: viewMode === 'list' ? 'gallery' : 'list' }));
    }

    downloadFile() {
        let downLoadFiles = [];
        const selectedFiles = this.fileActions.selection.selected;
        selectedFiles.forEach(result => {
            downLoadFiles.push(this.selectedFileFolderMap[result]);
        });
        this.store.dispatch(fromFileActions.downloadFile({ files: downLoadFiles }));
    }

    fileIsSelected() {
        return this.fileActions.selection.selected.every(i =>
            this.selectedFileFolderMap[i]?.hasOwnProperty('fileName')
        );
    }

    allowDelete() {
        // Allow delete only when all the selected items are either files or folders
        // check if all selected items are files
        const hasAllFiles = this.fileActions.selection.selected.every(i =>
            this.selectedFileFolderMap[i]?.hasOwnProperty('fileName')
        );
        if (!hasAllFiles) {
            // if all items are not files then check if they are folder
            const hasAllFolders = this.fileActions.selection.selected.every(
                i => !this.selectedFileFolderMap[i]?.hasOwnProperty('fileName')
            );
            return hasAllFolders;
        }
        return true;
    }

    isSelected() {
        return this.fileActions.selection.selected.every(
            i => i.hasOwnProperty('fileName') && !i.hasOwnProperty('fileName')
        );
    }

    deleteFile() {
        let deleteFiles = [];
        const selectedDeleteFiles = this.fileActions.selection.selected;
        selectedDeleteFiles.forEach(result => {
            deleteFiles.push(this.selectedFileFolderMap[result]);
        });
        const selectedFiles = deleteFiles.filter(item => item['displayName']) as File[];
        const selectedFolders = deleteFiles.filter(item => !item['displayName']) as FolderComplete[];
        if (selectedFiles.length) {
            this.store.dispatch(fromFileActions.initDeleteFile({ file: selectedFiles }));
        } else {
            this.store.dispatch(fromFolderActions.initDeleteFolder({ folder: selectedFolders }));
        }
    }

    generateLink() {
        const selectedItem = this.fileActions.selection.selected[0];
        this.store.dispatch(
            fromVaultActions.generateDirectLink({
                resourceType: this.selectedFileFolderMap[selectedItem]['fileId'] ? 'file' : 'folder',
                resource: this.selectedFileFolderMap[selectedItem] as unknown,
            })
        );
    }

    copySelection() {}

    renameVault() {
        // this.dialog.open(CreateComponent, {
        //   data: { vault: this.vaultData, toCreate: 'Vault', isEdit: true },
        //   minWidth: '30vw'
        // })
        this.dialog
            .open(AuxPopupComponent, {
                width: '30vw',
                height: 'auto',
                data: {
                    icon: 'mat_outline:edit_note',
                    title: 'Edit Vault',
                    cancelButtonText: 'Cancel',
                    saveButtonText: 'Save',
                    dynamicComponent: CreateComponent,
                    dynamicComponentData: { vault: this.vaultData, toCreate: 'Vault', isEdit: true },
                    submitFunction: 'edit',
                    enterKeyEnabled: false,
                    deleteFunction: 'delete',
                },
                autoFocus: false,
            })

            .afterClosed()
            .pipe(filter(e => !!e))
            .subscribe(e => {
                if (!e.del) {
                    return this.store.dispatch(fromVaultActions.updateVault(e));
                }

                this._fuseConfirmationService
                    .open({
                        title: 'Confirm Delete',
                        message:
                            'Do you really want to delete <b>' +
                            this.vaultData.vaultName +
                            '</b> and all of its files and folders?',
                        actions: {
                            confirm: {
                                label: 'Yes, delete it!',
                            },
                            cancel: {
                                label: 'Cancel',
                            },
                        },
                    })
                    .afterClosed()
                    .pipe(filter(x => x == 'confirmed'))
                    .subscribe(x => {
                        this.fileActions.selection.clear();
                        this.store.dispatch(fromVaultActions.deleteVault({ id: e.id }));
                    });
            });
    }

    moveSelection() {}
}
