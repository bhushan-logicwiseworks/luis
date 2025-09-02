import { Component } from '@angular/core';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icFolderOpen from '@iconify/icons-ic/twotone-folder-open';
import { Store } from '@ngrx/store';
import * as fromFolderActions from '../../../../license-center/actions/license-folder.action';
import * as fromFileActions from '../../../../vault-center/actions/file.actions';
import { FileActionsMenuService } from '../../../../vault-center/services/file-actions-menu.service';
import { LicenseFolderTreeSelectors } from '../../../reducers';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-license-file-list-breadcrumbs',
    templateUrl: './license-file-list-breadcrumbs.component.html',
    styleUrl: './license-file-list-breadcrumbs.component.scss',
    imports: [AsyncPipe],
})
export class LicenseFileListBreadcrumbsComponent {
    icChevronRight = icChevronRight;
    icFolderOpen = icFolderOpen;
    breadcrumbs$ = this.store.select(LicenseFolderTreeSelectors.selectBreadcrumbsArray);
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
