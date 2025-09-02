import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import * as fromFileActions from '../actions/file.actions';
import * as fromFolderActions from '../actions/folder.actions';
import { FileActionsMenuComponent } from '../components/file-actions-menu.component';
import { FileDetailComponent } from '../components/file-detail.component';
import { FileSelectors, FolderSelectors } from '../reducers';
import { DragDropService } from '../services/drag-drop.service';
import { FileActionsMenuService } from '../services/file-actions-menu.service';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { CdkNoDataRow } from '@angular/cdk/table';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { GalleryViewItemComponent } from '../components/gallery-view-item.component';
import { LoadingOverlayComponent } from '../../../../shared/components/loading-overlay/loading-overlay.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NgxFilesizeModule } from 'ngx-filesize';
import { ContentTypePipe } from '../pipes/content-type.pipe';
@UntilDestroy()
@Component({
    selector: 'ac-vault-center-file-list',
    templateUrl: './vault-center-file-list.component.html',
    styleUrls: ['./vault-center-file-list.component.scss'],
    providers: [
    // {
    //   provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    //   useValue: {
    //     appearance: 'standard'
    //   } as MatFormFieldDefaultOptions
    // }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatTable,
        MatSort,
        CdkNoDataRow,
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
        GalleryViewItemComponent,
        LoadingOverlayComponent,
        AsyncPipe,
        DatePipe,
        NgxFilesizeModule,
        ContentTypePipe,
    ],
})
export class FileVaultFileListComponent implements OnInit, AfterViewInit, OnDestroy {
    // @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    //   this._paginator = value;
    //   if (value) {
    //     this.dataSource.paginator = value;
    //   }
    // }
    //
    // get paginator(): MatPaginator {
    //   return this._paginator;
    // }

    icFolder = icFolder;
    icQueryStats = icQueryStats;
    icCloudNone = icCloudNone;
    icControl = icControl;

    files$ = this.store.select(FileSelectors.selectFilesInFolder);
    currentFolder$ = this.store.select(FolderSelectors.selectCurrentFolder);
    selectedFile$ = this.store.select(FileSelectors.selectSelectedFile);
    loading$ = this.store.select(FileSelectors.selectLoading);
    viewMode$ = this.store.select(FileSelectors.selectViewMode);
    folderChildren$ = this.store.select(FolderSelectors.selectChildren);
    selectFolders$ = this.store.select(FolderSelectors.selectEntities);
    allFiles$ = this.store.select(FileSelectors.selectEntities);
    folders$ = this.store.select(FolderSelectors.selectAll);

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
                const folderBelongsToVault = (folderObj && folderObj.vaultId === Number(vaultId)) || false;
                if (!folderObj || !folderBelongsToVault) {
                    folderObj = this.findRootFolder(allFolders, vaultId);
                }
                if (params.has('folderId') && folderObj) {
                    if (params.has('fileId') && isFileDifferent) {
                        this.store.dispatch(
                            fromFolderActions.setCurrentFolder({
                                folder: folderObj,
                                withFile: Number(fileId),
                            })
                        );
                        return;
                    }

                    if (isFolderDifferent || !folderBelongsToVault) {
                        this.store.dispatch(
                            fromFolderActions.setCurrentFolder({
                                folder: folderObj,
                            })
                        );
                    }
                }

                if (vaultId && !params.has('folderId')) {
                    const rootFolder = this.findRootFolder(allFolders, vaultId);
                    if (rootFolder) {
                        // this.router.navigateByUrl(`/centers/vault-center/${getData[0].vaultId}`, {replaceUrl: true});
                        this.store.dispatch(fromFolderActions.setCurrentFolder({ folder: rootFolder }));
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
            this.store.dispatch(fromFileActions.setSelectedFile({ file }));
        }
    }

    setUnselectedFile($event: Event, file: any) {
        $event.stopImmediatePropagation();
        $event.preventDefault();
        this.fileActionsMenuService.selection.deselect(file.fileId || file.folderId);
        if (file.displayName) {
            this.store.dispatch(fromFileActions.setSelectedFile({ file: null }));
            if (this.fileActionsMenuService.selection.selected) {
                this.fileActionsMenuService.selection.selected.forEach(result => {
                    if (this.selectedFileFolderMap[result]['displayName']) {
                        this.store.dispatch(
                            fromFileActions.setSelectedFile({ file: this.selectedFileFolderMap[result] as File })
                        );
                    }
                });
            }
        }
    }

    selectFile(file) {
        this.fileActionsMenuService.selection.clear();
        if (!file.displayName) {
            this.store.dispatch(fromFileActions.setSelectedFile({ file: null }));
            return this.store.dispatch(fromFolderActions.setCurrentFolder({ folder: file }));
        }
        this.fileSelected = true;
        this.store.dispatch(fromFileActions.setSelectedFile({ file }));
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'VIEW FILE DETAIL',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: FileDetailComponent,
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

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this._paginator;
    }

    ngOnDestroy(): void {
        this.store.dispatch(fromFileActions.ResetState());
        this.store.dispatch(fromFolderActions.ResetState());
    }

    trackByFn(item: any) {
        return item.fileId || item.folderId;
    }

    onMenu(event, row, type) {
        this.fileActionsMenuService.open(event, row, type, FileActionsMenuComponent);
    }

    startDrag(element) {
        this.dragService.startDragging(element);
    }

    stopDrag() {
        this.dragService.stopDragging();
    }
}
