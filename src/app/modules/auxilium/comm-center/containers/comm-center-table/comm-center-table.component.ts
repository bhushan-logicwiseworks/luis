import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-enterprise';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { SourceChipComponent } from 'app/shared/components/auxilium/aux-source-chip/aux-source-chip.component';
import {
    commAppColumn,
    commCompletedColumn,
    commDeletedColumn,
    commFastAndSelfColumn,
    commMyInboxAndByOwnerColumn,
    commUnassignedColumn,
} from 'app/shared/components/auxilium/comm-center-column';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { Email } from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { FuseNavigationItem } from '../../../../../../@fuse/components/navigation';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { CommCenterTableActions } from '../../actions/comm-center-table.actions';
import { CommCenterEmailComponent } from '../../components/comm-center-email/comm-center-email.component';
import { CommCenterGroupEditComponent } from '../../components/comm-center-group-edit/comm-center-group-edit.component';
import { CommCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-comm-center-table',
    templateUrl: './comm-center-table.component.html',
    styleUrls: ['./comm-center-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateTimeFormatPipe, DateFormatPipe],
    imports: [MatTooltip, MatIcon, AuxAgGridComponent, AsyncPipe],
})
export class CommCenterTableComponent implements OnInit, AfterViewInit {
    columnDefs: ColDef[] = [
        {
            headerName: 'Id',
            field: 'id',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            filter: 'agMultiColumnFilter',
            minWidth: 75,
            sortIndex: 3,
            hide: false,
        },

        {
            headerName: 'Source',
            field: 'emailSource',
            cellRenderer: SourceChipComponent,
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            filter: 'agMultiColumnFilter',
            minWidth: 80,
            sortIndex: 2,
            hide: false,
            filterParams: {
                filters: [
                    {
                        filter: 'agTextColumnFilter',
                    },
                    {
                        filter: 'agSetColumnFilter',
                        filterParams: {
                            cellRenderer: SourceChipComponent,
                        },
                    },
                ],
            },
        },

        {
            headerName: 'Due Date',
            field: 'receivedDate',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.receivedDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 5,
            hide: false,
            minWidth: 100,
        },
        {
            headerName: 'Created Date',
            field: 'createdDate',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            valueFormatter: (params: any) => this.dateTimeFormatePipe.transform(params.data.createdDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 4,
            hide: false,
            minWidth: 135,
        },
        {
            headerName: 'From',
            field: 'from',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            filter: 'agMultiColumnFilter',
            minWidth: 225,
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'To',
            field: 'to',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            filter: 'agMultiColumnFilter',
            minWidth: 225,
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Date of SVC',
            field: 'dos',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.dos),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 8,
            hide: false,
            minWidth: 100,
        },
        {
            headerName: 'Subject',
            field: 'subject',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
            minWidth: 175,
        },
        {
            headerName: 'Patient ID',
            field: 'patientid',
            filter: 'agMultiColumnFilter',
            minWidth: 100,
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'patientid' },
            onCellClicked: params => this.handleRedirect('patientid', { data: { patientid: params.data.patientid } }),
        },
        {
            headerName: 'Owner',
            field: 'owner',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
            minWidth: 100,
        },
        {
            headerName: 'Label',
            field: 'label',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
            minWidth: 250,
        },
        {
            headerName: 'Modified by',
            field: 'modifiedBy',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
            minWidth: 70,
        },
        {
            headerName: 'Modified Date',
            field: 'modifiedDate',
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            valueFormatter: (params: any) => this.dateTimeFormatePipe.transform(params.data.modifiedDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 14,
            hide: false,
            minWidth: 150,
        },
        {
            headerName: 'Completed',
            field: 'completed',
            cellRenderer: ButtonWithIconsComponents,
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            cellRendererParams: { field: 'completed' },
            sortIndex: 15,
            hide: false,
            minWidth: 150,
        },
        {
            headerName: 'Deleted',
            field: 'deleted',
            cellRenderer: ButtonWithIconsComponents,
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            cellRendererParams: { field: 'deleted' },
            sortIndex: 16,
            hide: false,
            minWidth: 150,
        },
        {
            headerName: 'File',
            field: 'fileCount',
            cellRenderer: ButtonWithIconsComponents,
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            cellRendererParams: { field: 'fileCount' },
            sortIndex: 17,
            hide: false,
            minWidth: 65,
        },
        {
            headerName: 'Ins Ver',
            field: 'status',
            cellRenderer: ButtonWithIconsComponents,
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            cellRendererParams: { field: 'status' },
            filter: 'agMultiColumnFilter',
            sortIndex: 18,
            hide: false,
            minWidth: 100,
        },
        {
            headerName: 'Insurance',
            field: 'insurance',
            minWidth: 175,
            onCellClicked: event => {
                this.openEmailDrawer(event);
            },
            cellRenderer: params => {
                return `
                <div class="rounded px-2 py-1 font-medium text-xs flex-none bg-cyan-100 text-cyan-600 truncate insurance-pill">
                    ${params.data.insurance !== null ? params.data.insurance : ''}
                </div>
                `;
            },
            filter: 'agMultiColumnFilter',
            sortIndex: 19,
            hide: false,
            cellStyle: {
                display: 'flex',
                alignItems: 'center',
            },
        },
        {
            headerName: '',
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Mark as Completed',
                        action: this.markAsCompleted.bind(this),
                        icon: 'check',
                        color: 'text-green-500',
                    },
                    {
                        name: 'Delete',
                        action: this.deleteMessage.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            minWidth: 120,
            filter: false,
            sortIndex: 20,
            hide: false,
        },
    ];

    rowData = [];
    selectedRow;
    options = {
        gridOptions: {
            rowSelection: {
                mode: 'multiRow',
                checkboxes: true,
                headerCheckbox: true,
                selectAll: 'filtered',
                checkboxColumn: {
                    resizable: false,
                    suppressMovable: true,
                    lockPosition: true,
                    filter: false,
                    sortable: false,
                    headerName: '',
                    headerTooltip: 'Checkboxes indicate selection',
                },
            },
            rowMultiSelectWithClick: true,
            headerHeight: 36,
            rowHeight: 40,
            suppressRowClickSelection: true,
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    visibleColumns = commMyInboxAndByOwnerColumn;
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => {
            switch (paramMap.get('filterSlug')) {
                case 'unassigned':
                    return this.store.select(CommCenterTableSelectors.selectEmails);

                case 'by-owner':
                    return this.store.select(CommCenterTableSelectors.selectEmailsByOwner);

                case 'completed':
                    return this.store.select(CommCenterTableSelectors.selectCompletedEmails);

                case 'deleted':
                    return this.store.select(CommCenterTableSelectors.selectDeletedEmails);

                case 'my-inbox':
                    return this.store.select(CommCenterTableSelectors.selectMyEmails);

                case 'app':
                    return this.store.select(CommCenterTableSelectors.selectEmailsBySource);

                case 'fast':
                    return this.store.select(CommCenterTableSelectors.selectEmailsBySource);

                case 'self':
                    return this.store.select(CommCenterTableSelectors.selectEmailsBySource);
            }
        })
    );

    loading$ = this.store.select(CommCenterTableSelectors.selectLoading);

    pageSizeOption = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    selectedRowIndex: number = -1;
    toolbarData: FuseNavigationItem[];

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private dateTimeFormatePipe: DateTimeFormatPipe,
        private dateFormatePipe: DateFormatPipe,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private searchService: AuxSearchService,
        private auxUtilService: AuxUtilService
    ) {
        // this.toolbarData = [
        //     // {
        //     //     title: 'Refresh',
        //     //     type: 'basic',
        //     //     icon: 'mat_outline:refresh',
        //     //     function: () => {
        //     //         this.refresh.next(null);
        //     //     },
        //     // },
        // ];
    }

    selection = new SelectionModel<Email>(true, []);
    filterSlug = '';

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                // make sure we do not reset filter on page load and when we have same params
                if (filterSlug && this.filterSlug !== '' && filterSlug !== this.filterSlug) {
                    this.searchService.resetFilter.next({ resetGrid: true });
                }
                this.filterSlug = filterSlug;
                switch (filterSlug) {
                    case 'unassigned':
                        this.visibleColumns = commUnassignedColumn;
                        this.selection.clear();
                        this.store.dispatch(CommCenterTableActions.LoadEmails({ days: 0 }));
                        break;

                    case 'by-owner':
                        this.visibleColumns = commMyInboxAndByOwnerColumn;
                        this.selection.clear();
                        this.store.dispatch(CommCenterTableActions.LoadEmailsByOwner());
                        break;

                    case 'completed':
                        this.visibleColumns = commCompletedColumn;
                        this.selection.clear();
                        this.resetGridFilters();
                        this.store.dispatch(CommCenterTableActions.LoadCompletedEmails());
                        break;

                    case 'deleted':
                        this.visibleColumns = commDeletedColumn;
                        this.selection.clear();
                        this.store.dispatch(CommCenterTableActions.LoadDeletedEmails());
                        break;

                    case 'my-inbox':
                        this.visibleColumns = commMyInboxAndByOwnerColumn;
                        this.selection.clear();
                        this.store.dispatch(CommCenterTableActions.LoadMyEmails());
                        break;

                    case 'app':
                        this.visibleColumns = commAppColumn;
                        this.selection.clear();
                        this.store.dispatch(CommCenterTableActions.LoadEmailsBySource({ source: 'app' }));
                        break;

                    case 'fast':
                        this.visibleColumns = commFastAndSelfColumn;
                        this.selection.clear();
                        this.store.dispatch(CommCenterTableActions.LoadEmailsBySource({ source: 'fast' }));
                        break;

                    case 'self':
                        this.visibleColumns = commFastAndSelfColumn;
                        this.selection.clear();
                        this.store.dispatch(CommCenterTableActions.LoadEmailsBySource({ source: 'self' }));
                        break;

                    default:
                        this.visibleColumns = commMyInboxAndByOwnerColumn;
                        this.selection.clear();
                        this.store.dispatch(CommCenterTableActions.LoadMyEmails());
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(emails => {
            this.rowData = emails;
        });

        this.actions$
            .pipe(ofType(CommCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    markAsCompleted(params: any) {
        this.completeMail(params.data);
    }

    Refresh() {
        this.refresh.next(null);
    }

    deleteMessage(params: any) {
        this.deleteMail(params.data);
    }
    onSelectionChanged(event: any) {
        this.selectedRow = event.api.getSelectedRows();
        const rows = event.api.getSelectedRows();
        this.selection.setSelection(...event.api.getSelectedRows());
    }

    openEmailDrawer(event) {
        this.selectedRowIndex = event.rowIndex;
        event.api.deselectAll();
        this.openEmail(event);
    }

    ngAfterViewInit() {}

    openEmail(email) {
        this.selection.clear();
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'DETAILS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Add',
            dynamicComponent: CommCenterEmailComponent,
            dynamicComponentData: email.data || null,
            submitFunction: 'addNote',
            enterKeyEnabled: false,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: 0 + 'px',
                    right: 0 + 'px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(val => {
                // if (val !== 'email-section') {
                //     this.refresh.next(val);
                // }
                //email.api.clearFocusedCell();
            });
    }

    deleteMail(email: Email) {
        const modal = this._fuseConfirmationService.open({
            title: 'Are you sure?',
            message: `You won't be able to revert this!`,
            actions: {
                confirm: {
                    label: 'Yes, delete it!',
                },
                cancel: {
                    label: 'Cancel',
                },
            },
        });
        modal
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result == 'confirmed') {
                    this.store.dispatch(CommCenterTableActions.DeleteMail({ emailId: email.id }));
                    this.successMessage('Deleted!', 'Record has been deleted.');
                }
            });
    }

    completeMail(email: Email) {
        const modal = this._fuseConfirmationService.open({
            title: 'Are you sure?',
            message: `You will flag this item as completed!`,
            actions: {
                confirm: {
                    label: "Yes, it's completed!",
                },
                cancel: {
                    label: 'Cancel',
                },
            },
        });

        modal
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result == 'confirmed') {
                    this.store.dispatch(CommCenterTableActions.MarkMailAsComplete({ emailId: email.id }));
                    //this.successMessage('Completed!', 'Record has been flagged as completed.');
                }
            });
    }

    batchCompleteMail() {
        const modal = this._fuseConfirmationService.open({
            title: 'Are you sure?',
            message: `You will flag ${this.selection.selected.length} selected items as completed!`,
            actions: {
                confirm: {
                    label: "Yes, it's completed!",
                },
                cancel: {
                    label: 'Cancel',
                },
            },
        });

        modal
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result == 'confirmed') {
                    const data: number[] = this.selection.selected.map(email => email.id);
                    this.store.dispatch(CommCenterTableActions.MarkMailsAsComplete({ emaildata: data }));
                    //this.successMessage('Completed!', 'Record has been flagged as completed.');
                }
            });
    }

    batchDeleteMail() {
        const modal = this._fuseConfirmationService.open({
            title: 'Are you sure?',
            message: "You won't be able to revert this!",
            actions: {
                confirm: {
                    label: 'Yes, delete!',
                },
                cancel: {
                    label: 'Cancel',
                },
            },
        });
        modal
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result == 'confirmed') {
                    const data: number[] = this.selection.selected.map(email => email.id);
                    this.store.dispatch(CommCenterTableActions.DeleteMails({ emaildata: data }));
                    this.successMessage('Deleted!', 'Record has been deleted.');
                }
            });
    }

    isDisabled() {
        return this.selection.isEmpty();
    }

    successMessage(title, message) {
        this._fuseConfirmationService.open({
            title: title,
            message: message,
            actions: {
                confirm: {
                    label: 'OK',
                },
                cancel: {
                    show: false,
                },
            },
            icon: {
                name: 'heroicons_outline:check-circle',
                color: 'success',
            },
        });
    }

    resetGridFilters() {}

    groupEdit() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Group Edit',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: CommCenterGroupEditComponent,
            dynamicComponentData: this.selectedRow,
            submitFunction: 'submit',
            enterKeyEnabled: true,
        };
        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '700px',
            height: 'auto',
            data: popupData,
        });
        // modalRef.afterClosed()
        // .pipe(untilDestroyed(this))
        // .subscribe((result) => {
        //     // this.selectedRow = []
        //     // this.selection.clear()
        // });
    }
    handleRedirect(field: string, params: any) {
        if (params.data.patientid) {
            this.auxUtilService.redirectToNewTab(field, params);
        }
    }
}
