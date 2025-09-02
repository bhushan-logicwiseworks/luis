import { Component, OnInit } from '@angular/core';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icFolderOpen from '@iconify/icons-ic/twotone-folder-open';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderActions from '../actions/folder.actions';
import { FolderTreeSelectors, VaultsSelectors } from '../reducers';
import { FileActionsMenuService } from '../services/file-actions-menu.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ac-file-list-breadcrumbs',
    templateUrl: './file-list-breadcrumbs.component.html',
    styleUrls: ['./file-list-breadcrumbs.component.scss'],
    imports: [AsyncPipe],
})
export class FileListBreadcrumbsComponent implements OnInit {
    icChevronRight = icChevronRight;
    icFolderOpen = icFolderOpen;
    breadcrumbs$ = this.store.select(FolderTreeSelectors.selectBreadcrumbsArray).pipe(map(response => response || []));
    selectedVault$ = this.store.select(VaultsSelectors.selectCurrentVault);
    constructor(
        private store: Store,
        private fileActionService: FileActionsMenuService
    ) {}

    ngOnInit(): void {}

    setCurrentFolder(folder) {
        this.fileActionService.selection.clear();
        this.store.dispatch(fromFolderActions.setCurrentFolder({ folder }));
        this.store.dispatch(fromFileActions.setSelectedFile({ file: null, skipNavigation: true }));
    }
}
