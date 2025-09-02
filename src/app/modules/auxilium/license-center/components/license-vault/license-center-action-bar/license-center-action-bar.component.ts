import { Component } from '@angular/core';
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
import { File, FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';
import { keyBy } from 'lodash-es';
import { combineLatest } from 'rxjs';
import * as fromFileActions from '../../../../license-center/actions/license-file.actions';
import { LicenseFileSelectors, LicenseFolderSelectors } from '../../../../license-center/reducers';
import { FileActionsMenuService } from '../../../../vault-center/services/file-actions-menu.service';
import { MatDivider } from '@angular/material/divider';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { IconModule } from '@abhinavakhil/iconify-angular';
@UntilDestroy()
@Component({
    selector: 'app-license-center-action-bar',
    templateUrl: './license-center-action-bar.component.html',
    styleUrl: './license-center-action-bar.component.scss',
    animations: [stagger40ms, fadeInUp400ms],
    imports: [
        MatDivider,
        NgTemplateOutlet,
        MatRipple,
        IconModule,
        AsyncPipe,
    ],
})
export class LicenseCenterActionBarComponent {
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

    viewMode$ = this.store.select(LicenseFileSelectors.selectViewMode);
    selectedFile$ = this.store.select(LicenseFileSelectors.selectSelectedFile);
    displayFn$ = this.store.select(AuthSelectors.selectIsAdmin);
    files$ = this.store.select(LicenseFileSelectors.selectFilesInFolder);
    folderChildren$ = this.store.select(LicenseFolderSelectors.selectChildren);
    selectedFileFolderMap: Record<number, File | FolderComplete> = {};

    constructor(
        private store: Store,
        public fileActions: FileActionsMenuService
    ) {}

    ngOnInit(): void {
        this.displayFn$.pipe(untilDestroyed(this)).subscribe(userIsAdmin => {
            if (userIsAdmin == true) {
                this.isAdmin = true;
            } else {
                this.isAdmin = false;
            }
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
}
