import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import circle from '@iconify/icons-ic/outline-circle';
import icCheck from '@iconify/icons-ic/twotone-check-circle';
import icCloudNone from '@iconify/icons-ic/twotone-cloud-off';
import icControl from '@iconify/icons-ic/twotone-control-point';
import icFolder from '@iconify/icons-ic/twotone-folder-open';
import icQueryStats from '@iconify/icons-ic/twotone-query-builder';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { File, FolderComplete } from 'app/shared/interfaces/user/vault-api.interface';
import { keyBy } from 'lodash-es';
import { combineLatest } from 'rxjs';
import * as fromLicenseFileActions from '../../../../license-center/actions/license-file.actions';
import * as fromLicenseFolderActions from '../../../../license-center/actions/license-folder.action';
import { LicenseFileSelectors, LicenseFolderSelectors } from '../../../../license-center/reducers';
import * as fromFolderActions from '../../../../vault-center/actions/folder.actions';
import { DragDropService } from '../../../../vault-center/services/drag-drop.service';
import { FileActionsMenuService } from '../../../../vault-center/services/file-actions-menu.service';
import { LicenseFileDetailComponent } from '../../license-file-detail/license-file-detail.component';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { LicenseGalleryViewItemComponent } from '../../license-gallery-view-item/license-gallery-view-item.component';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ContentTypePipe } from '../../../../vault-center/pipes/content-type.pipe';
@UntilDestroy()
@Component({
    selector: 'app-license-center-file-list',
    templateUrl: './license-center-file-list.component.html',
    styleUrl: './license-center-file-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatTable,
        MatSort,
        IconModule,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatSortHeader,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        LicenseGalleryViewItemComponent,
        LoadingOverlayComponent,
        AsyncPipe,
        DatePipe,
        ContentTypePipe,
    ],
})
export class LicenseCenterFileListComponent {
    icFolder = icFolder;
    icQueryStats = icQueryStats;
    icCloudNone = icCloudNone;
    icControl = icControl;

    files$ = this.store.select(LicenseFileSelectors.selectFilesInFolder);
    currentFolder$ = this.store.select(LicenseFolderSelectors.selectCurrentFolder);
    selectedFile$ = this.store.select(LicenseFileSelectors.selectSelectedFile);
    loading$ = this.store.select(LicenseFileSelectors.selectLoading);
    viewMode$ = this.store.select(LicenseFileSelectors.selectViewMode);
    folderChildren$ = this.store.select(LicenseFolderSelectors.selectChildren);
    selectFolders$ = this.store.select(LicenseFolderSelectors.selectEntities);
    allFiles$ = this.store.select(LicenseFileSelectors.selectEntities);
    folders$ = this.store.select(LicenseFolderSelectors.selectAll);

    dataSource: MatTableDataSource<File> = new MatTableDataSource<File>();
    displayedColumns = ['logo', 'displayName', 'contentSize', 'modifiedDate'];

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];

    // private _paginator: MatPaginator;
    icAddCircle = circle;
    icCheck = icCheck;

    fileSelected = false;
    paramVaultId: string;
    paramFolderId: string;
    paramFileId: string;
    selectedFileFolderMap: Record<number, File | FolderComplete> = {};

    constructor(
        private store: Store,
        private cd: ChangeDetectorRef,
        public fileActionsMenuService: FileActionsMenuService,
        private route: ActivatedRoute,
        private dragService: DragDropService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        combineLatest([this.route.queryParamMap, this.selectFolders$, this.folders$, this.route.params])
            .pipe(untilDestroyed(this))
            .subscribe(([params, folders, allFolders, vaultparams]) => {
                const vaultId = vaultparams['vaultId'];
                const folderId = params.get('folderId');
                const fileId = params.get('fileId');
                const licenseId = parseInt(window.location.href.split('/')[5], 10);
                if (!folders || !Object.keys(folders).length) {
                    return;
                }
                const queryParams = new URLSearchParams(window.location.search);
                const currentFolderId = queryParams.get('folderId');
                const currentFileId = queryParams.get('fileId');

                const isFolderDifferent =
                    !this.paramFolderId || currentFolderId !== folderId || this.paramVaultId !== vaultId;
                const isFileDifferent = !this.paramFileId || currentFileId !== fileId;
                // console.log('vaultId', vaultId);
                // console.log('folderId', folderId);
                // console.log('fileId', fileId);

                this.paramVaultId = vaultId;
                this.paramFolderId = folderId;
                this.paramFileId = fileId;
                let folderObj = params.has('folderId') ? folders[folderId] : null;
                if (!folderObj) {
                    folderObj = this.findRootFolder(allFolders, vaultId);
                }
                if (params.has('folderId') && folderObj) {
                    if (params.has('fileId') && isFileDifferent) {
                        this.store.dispatch(
                            fromLicenseFolderActions.setCurrentFolder({
                                folder: folderObj,
                                withFile: Number(fileId),
                            })
                        );
                        return;
                    }

                    if (isFolderDifferent) {
                        this.store.dispatch(
                            fromLicenseFolderActions.setCurrentFolder({
                                folder: folderObj,
                            })
                        );
                    }
                }

                if (vaultId && !params.has('folderId')) {
                    const rootFolder = this.findRootFolder(allFolders, vaultId);
                    if (rootFolder) {
                        this.router.navigateByUrl(`/company/license-center/${licenseId}/license-folder`, {
                            replaceUrl: true,
                        });
                        this.store.dispatch(fromLicenseFolderActions.setCurrentFolder({ folder: rootFolder }));
                    }
                }
            });

        this.fileActionsMenuService.search.subscribe(value => {
            value = value?.trim();
            value = value?.toLowerCase();
            this.dataSource.filter = value || '';
            this.cd.markForCheck();
        });

        combineLatest([this.files$, this.folderChildren$])
            .pipe(untilDestroyed(this))
            .subscribe(([files, folders]) => {
                const list = [];
                if (folders) {
                    this.selectedFileFolderMap = {
                        ...this.selectedFileFolderMap,
                        ...keyBy(folders, 'folderId'),
                    };
                    list.push(...folders);
                }
                if (files) {
                    list.push(...files);
                    this.selectedFileFolderMap = {
                        ...this.selectedFileFolderMap,
                        ...keyBy(files, 'fileId'),
                    };
                }
                this.dataSource.data = list;
                this.cd.detectChanges();
            });
    }

    findRootFolder(allFolders: FolderComplete[], vaultId: string) {
        return allFolders.find(res => res.vaultId === Number(vaultId) && res.folderParentId === null);
    }

    setSelectedFile($event: Event, file: any) {
        $event.stopImmediatePropagation();
        $event.preventDefault();
        this.fileActionsMenuService.selection.select(file.fileId || file.folderId);
        if (file.displayName) {
            this.store.dispatch(fromLicenseFileActions.setSelectedFile({ file }));
        }
    }

    setUnselectedFile($event: Event, file: any) {
        $event.stopImmediatePropagation();
        $event.preventDefault();
        this.fileActionsMenuService.selection.deselect(file.fileId || file.folderId);
        if (file.displayName) {
            this.store.dispatch(fromLicenseFileActions.setSelectedFile({ file: null }));
            if (this.fileActionsMenuService.selection.selected) {
                this.fileActionsMenuService.selection.selected.forEach(result => {
                    if (this.selectedFileFolderMap[result]['displayName']) {
                        this.store.dispatch(
                            fromLicenseFileActions.setSelectedFile({ file: this.selectedFileFolderMap[result] as File })
                        );
                    }
                });
            }
        }
    }

    selectFile(file) {
        this.fileActionsMenuService.selection.clear();
        if (!file.displayName) {
            this.store.dispatch(fromLicenseFileActions.setSelectedFile({ file: null }));
            return this.store.dispatch(fromLicenseFolderActions.setCurrentFolder({ folder: file }));
        }
        this.fileSelected = true;
        this.store.dispatch(fromLicenseFileActions.setSelectedFile({ file }));
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'VIEW FILE DETAIL',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: LicenseFileDetailComponent,
            dynamicComponentData: false,
            submitFunction: 'saveData',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '550px',
                maxWidth: '100%',
                panelClass: [
                    'animate__animated',
                    'animate__slideInRight',
                    'animated',
                    'ac-commcenter-dialog',
                    'm0-dialog',
                    'custom-container',
                ],
                position: {
                    top: 0 + 'px',
                    right: 0 + 'px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                this.fileSelected = false;
            });
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        this.store.dispatch(fromLicenseFileActions.ResetState());
        this.store.dispatch(fromFolderActions.ResetState());
    }

    trackByFn(item: any) {
        return item.fileId || item.folderId;
    }
}
