import { Component, OnInit } from '@angular/core';

import icGallery from '@iconify/icons-ic/baseline-view-module';
import icCloudDownload from '@iconify/icons-ic/outline-cloud-download';
import icTrash from '@iconify/icons-ic/outline-delete';
import icEye from '@iconify/icons-ic/outline-remove-red-eye';
import icList from '@iconify/icons-ic/outline-view-list';
import icAdd from '@iconify/icons-ic/twotone-add-box';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icCopyAll from '@iconify/icons-ic/twotone-file-copy';
import icFile from '@iconify/icons-ic/twotone-insert-drive-file';
import icLink from '@iconify/icons-ic/twotone-insert-link';
import icRefresh from '@iconify/icons-ic/twotone-refresh';
import icCloudCircle from '@iconify/icons-ic/twotone-snippet-folder';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { scaleInOutAnimation } from 'app/core/animations/scale-in-out.animation';
import { AuthSelectors } from 'app/reducers';
import * as fromFileActions from '../actions/file.actions';
import { FileActionsMenuService } from '../services/file-actions-menu.service';
import { MatMenuItem } from '@angular/material/menu';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { MatDivider } from '@angular/material/divider';
@UntilDestroy()
@Component({
    selector: 'ac-file-actions-menu',
    templateUrl: './file-actions-menu.component.html',
    styleUrls: ['./file-actions-menu.component.scss'],
    animations: [scaleInOutAnimation],
    imports: [
        MatMenuItem,
        IconModule,
        MatDivider,
    ],
})
export class FileActionsMenuComponent implements OnInit {
    icAdd = icAdd;
    icRefresh = icRefresh;
    icCloudDownload = icCloudDownload;
    icTrash = icTrash;
    icEye = icEye;
    icList = icList;
    icGallery = icGallery;
    icCloudCircle = icCloudCircle;
    icFile = icFile;
    icLink = icLink;
    icCopyAll = icCopyAll;
    icEdit = icEdit;
    isAdmin: boolean = false;

    displayFn$ = this.store.select(AuthSelectors.selectIsAdmin);

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
    }

    downloadFile() {
        this.store.dispatch(fromFileActions.downloadFile({ files: [this.fileActions.el] }));
        this.fileActions.closeMenu();
    }
}
