import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { WorkOrderGroupEditComponent } from 'app/modules/auxilium/work-order-center/components/work-order-group-edit/work-order-group-edit.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { SearchCriteria } from 'app/shared/interfaces/auxilium/work-order-center/search-criteria.interface';
import { WorkOrderDisplay } from 'app/shared/interfaces/auxilium/work-order-center/work-order-center.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxUtilService } from '../../../../../shared/aux-service/aux-utils.service';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ButtonWithIconsComponents } from '../../../../../shared/components/button-with-icons/button-with-icons.component';
import { WorkOrderCenterTableActions } from '../../actions/work-order-center-table.actions';
import { WorkOrderSearchPopupComponent } from '../../components/work-order-search-popup/work-order-search-popup.component';
import { WorkOrderCenterTableSelectors } from '../../reducers';

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'ac-work-order-center-table',
    templateUrl: './work-order-center-table.component.html',
    styleUrls: ['./work-order-center-table.component.scss'],
    providers: [DateTimeFormatPipe, DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class WorkCenterTableComponent implements OnInit {
    toolbarData: FuseNavigationItem[];

    columnDefs: ColDef[] = [
        {
            headerName: 'Id',
            field: 'id',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 107,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Patient Id',
            field: 'patientid',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 107,
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'patientid' },
            onCellClicked: params => this.handleRedirect('patientid', { data: { patientid: params.data.patientid } }),
        },
        {
            headerName: 'Invoice #',
            field: 'invoiceno',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 107,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Svc Date',
            field: 'svcdate',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.svcdate),
            minWidth: 125,
            filterParams: filterParams,
            sortable: true,
            sort: 'desc', // Set the default sort order to descending
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Item Code',
            field: 'itemcode',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 115,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'T',
            field: 'billtype',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 75,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'C',
            field: 'confirm',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 75,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Qty',
            field: 'quantity',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 80,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Ship Status',
            field: 'shipstatus',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 115,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Shipped On',
            field: 'shipdate',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateTimeFormatePipe.transform(params.data.shipdate),
            minWidth: 160,
            filterParams: filterParams,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Description',
            field: 'description',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 200,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'State',
            field: 'state',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 100,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Next Bill',
            field: 'lastdatebilled',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.lastdatebilled),
            minWidth: 114,
            filterParams: filterParams,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'CMN Expire',
            field: 'cmnexpire',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.cmnexpire),
            minWidth: 114,
            filterParams: filterParams,
            cellClass: params => {
                if (params.data.cmnexpire === '1900-01-01T00:00:00') {
                    return 'bg-red-400';
                } else if (params.data.cmnexpire === '') {
                    return 'bg-red-400';
                } else {
                    return params.data.cmnexpire < params.data.svcdate ? 'bg-red-400' : '';
                }
            },
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Notes Expire',
            field: 'notesexpiredate',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.notesexpiredate),
            minWidth: 116,
            filterParams: filterParams,
            cellClass: params => {
                if (params.data.notesexpiredate === '1900-01-01T00:00:00') {
                    return 'bg-red-400';
                } else if (params.data.notesexpiredate === '') {
                    return 'bg-red-400';
                } else {
                    return params.data.notesexpiredate < params.data.svcdate ? 'bg-red-400' : '';
                }
            },
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Auth Date',
            field: 'authdate',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.authdate),
            minWidth: 116,
            filterParams: filterParams,
            cellClass: params => {
                if (params.data.authdate === '1900-01-01T00:00:00') {
                    return 'bg-red-400';
                } else if (params.data.authdate === '') {
                    return 'bg-red-400';
                } else {
                    return params.data.authdate < params.data.svcdate ? 'bg-red-400' : '';
                }
            },
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        /* { headerName: 'Auth Date', field: 'authdate',hide: false, filter: 'agDateColumnFilter',valueFormatter: (params:any) => this.dateFormatePipe.transform(params.data.authdate), minWidth: 116,filterParams: filterParams}, */
        {
            headerName: 'Payor',
            field: 'billTo',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 165,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        /* {
            headerName: 'Actions',
            field: 'actions',
            cellRendererFramework: ActionButtonRendererComponent,
            filter: false,
            cellRendererParams:{
                menuItems: [
                    { name: 'Delete Permanently', action: this.deleteRow.bind(this), icon: "mat_outline:delete", color: 'text-red-500' },
                ]
            },
            hide: false,
            minWidth: 80
        }, */
    ];

    visibleColumns = [
        'checkedField',
        'patientid',
        'invoiceno',
        'svcdate',
        'billtype',
        'confirm',
        'quantity',
        'itemcode',
        'shipstatus',
        'shipdate',
        'description',
        'state',
        'lastdatebilled',
        'cmnexpire',
        'notesexpiredate',
        'authdate',
        'billTo',
    ];

    loading$ = this.store.select(WorkOrderCenterTableSelectors.selectLoading);
    data$ = this.store.select(WorkOrderCenterTableSelectors.selectWorkOrderReps);

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
                    width: 100,
                    pinned: 'left',
                    resizable: true,
                    suppressMovable: true,
                    sortable: true,
                    filter: false,
                    lockPosition: true,
                    headerName: '',
                    suppressHeaderMenuButton: false,
                    headerTooltip: 'Checkboxes indicate selection',
                },
            },
            headerHeight: 30,
            rowHeight: 36,
        },
        defaultColDef: {
            flex: 1,
        },
    };

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    selectedRowIndex: number = -1;
    filterSlug: string;
    selection = new SelectionModel<any>(true, []);
    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private dateTimeFormatePipe: DateTimeFormatPipe,
        private dateFormatePipe: DateFormatPipe,
        @Inject(Actions) private actions$: Actions,
        private dialog: MatDialog,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private auxUtilService: AuxUtilService
    ) {}

    ngOnInit() {
        this.filterSlug = this.route.snapshot.routeConfig.path;
        this.toolbarData = [];
        combineLatest([this.route.queryParamMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([queryParamMap, refresh]) => {
                const criteria: SearchCriteria = {
                    nextBill: queryParamMap.get('nextBill') || '',
                    itemCode: queryParamMap.get('itemCode') || '',
                    description: queryParamMap.get('description') || '',
                    state: queryParamMap.get('state') || '',
                    payor: queryParamMap.get('payor') || '',
                };
                const hasValidCriteria = Object.values(criteria).some(value => value !== '');

                if (hasValidCriteria && (this.filterSlug === 'eposent' || this.filterSlug === 'monthlymarker')) {
                    // Validate nextBill as a date if present
                    if (criteria.nextBill) {
                        const isValidDate = !isNaN(new Date(criteria.nextBill).getTime());
                        if (!isValidDate) {
                            criteria.nextBill = ''; // Reset invalid date
                        }
                    }
                    this.store.dispatch(WorkOrderCenterTableActions.SetWorkOrderSearch({ criteria }));
                    if (this.filterSlug === 'eposent') {
                        this.store.dispatch(WorkOrderCenterTableActions.SearchWorkOrderEpoSent({ criteria }));
                    } else if (this.filterSlug === 'monthlymarker') {
                        this.store.dispatch(WorkOrderCenterTableActions.SearchWorkOrderMonthlyMarker({ criteria }));
                    }
                } else {
                    this.store.dispatch(WorkOrderCenterTableActions.SetWorkOrderSearch({ criteria: null }));
                    switch (this.filterSlug) {
                        case 'epo':
                            this.store.dispatch(WorkOrderCenterTableActions.LoadWorkReps({ filter: 'epo' }));
                            break;
                        case 'eposent':
                            this.store.dispatch(WorkOrderCenterTableActions.LoadWorkReps({ filter: 'eposent' }));
                            break;
                        case 'mblines':
                            this.store.dispatch(WorkOrderCenterTableActions.LoadWorkReps({ filter: 'mblines' }));
                            break;
                        case 'pblines':
                            this.store.dispatch(WorkOrderCenterTableActions.LoadWorkReps({ filter: 'pblines' }));
                            break;
                        case 'pylines':
                            this.store.dispatch(WorkOrderCenterTableActions.LoadWorkReps({ filter: 'pylines' }));
                            break;
                        case 'pypast':
                            this.store.dispatch(WorkOrderCenterTableActions.LoadWorkReps({ filter: 'pypast' }));
                            break;
                        case 'monthlymarker':
                            this.store.dispatch(WorkOrderCenterTableActions.LoadWorkReps({ filter: 'monthlymarker' }));
                            break;
                        case 'datevariants':
                            this.store.dispatch(WorkOrderCenterTableActions.LoadWorkReps({ filter: 'datevariants' }));
                            break;
                        case 'authexpiring':
                            this.store.dispatch(WorkOrderCenterTableActions.LoadWorkReps({ filter: 'authexpiring' }));
                            break;
                    }
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(workOrderCenterReps => {
            this.rowData = workOrderCenterReps;
        });

        this.actions$
            .pipe(ofType(WorkOrderCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    openSearchPopup() {
        this.dialog
            .open(WorkOrderSearchPopupComponent, {
                width: '600px',
                data: {
                    title: 'Search Work Orders',
                    filter: this.filterSlug,
                },
            })
            .afterClosed()
            .subscribe((criteria: SearchCriteria) => {
                if (criteria) {
                    // Update URL query parameters
                    this.router.navigate([], {
                        relativeTo: this.route,
                        queryParams: {
                            nextBill: criteria.nextBill || null,
                            itemCode: criteria.itemCode || null,
                            description: criteria.description || null,
                            state: criteria.state || null,
                            payor: criteria.payor || null,
                        },
                        queryParamsHandling: 'merge',
                    });
                }
            });
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: WorkOrderDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Work order Rep',
            message: 'Are you sure you want to delete this work order rep? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                    // Delete the contact
                    this.store.dispatch(WorkOrderCenterTableActions.DeleteWorkRep({ dto }));
                }
            });
    }

    onRowClick(params) {
        if (params.column.colId != 'actions') {
            this.router.navigate([`centers/work-order-center/edit`, params.api.getSelectedRows()[0].id]);
        }
    }

    isDisabled() {
        return this.selection.isEmpty();
    }

    groupEdit() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Group Edit',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: WorkOrderGroupEditComponent,
            dynamicComponentData: this.selectedRow.map(row => row.id),
            submitFunction: 'submit',
            enterKeyEnabled: true,
        };
        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '900px',
            height: 'auto',
            data: popupData,
        });
    }

    redirectToEdit(params) {
        if (params.column.colId != 'actions' && params.column.colId !== 'patientid') {
            this.router.navigate([`centers/work-order-center/edit`, params.data.id]);
        }
    }

    openWorkOrderDetails(params) {
        const isOptionAvailable = this.toolbarData.findIndex(item => item.title === 'Edit');
        if (isOptionAvailable === -1) {
            this.toolbarData = [
                ...this.toolbarData,
                {
                    title: 'Edit',
                    type: 'basic',
                    icon: 'mat_outline:edit',
                    function: () => {
                        this.redirectToEdit(params);
                    },
                },
            ];
            this.cdr.detectChanges();
        }
    }

    onSelectionChanged(event: any) {
        this.selectedRow = event.api.getSelectedRows();
        this.selection.setSelection(...event.api.getSelectedRows());
        if (!this.selection.isEmpty()) {
            this.toolbarData = [
                {
                    title: 'Group Edit',
                    type: 'basic',
                    icon: 'mat_outline:edit_note',
                    function: item => {
                        this.groupEdit();
                    },
                },
            ];
        }
        // else if (this.filterSlug === 'eposent' || this.filterSlug === 'monthlymarker') {
        //     this.toolbarData = [
        //         // {
        //         //     title: 'Search Work Order',
        //         //     type: 'basic',
        //         //     icon: 'mat_outline:search',
        //         //     function: () => {
        //         //         this.openSearchPopup();
        //         //     },
        //         // },
        //         {
        //             title: 'Group Edit',
        //             type: 'basic',
        //             icon: 'mat_outline:edit_note',
        //             function: item => {
        //                 this.groupEdit();
        //             },
        //         },
        //     ];
        // }
        else {
            this.toolbarData = [];
        }
    }

    handleRedirect(field: string, params) {
        this.auxUtilService.redirectToNewTab(field, params);
    }
}
