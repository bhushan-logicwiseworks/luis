import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ShortcuteListComponentComponent } from 'app/modules/auxilium/shortcut-center/components/shortcute-list-component/shortcute-list-component.component';
import { WorkOrderCenterTableActions } from 'app/modules/auxilium/work-order-center/actions/work-order-center-table.actions';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientWorkOrderActions } from '../../actions/patient-work-order.action';
import { PatientWorkOrderSelectors } from '../../reducers';
import { SelectedWorkOrderFilter } from '../../reducers/patient-work-order.reducer';
import { TitleService } from '../../services/title.service';
import { PatientContactNotesDrawerComponent } from '../patient-contact-notes/patient-contact-notes-drawer/patient-contact-notes-drawer.component';
import { PatientGroupEditWorkOrderComponent } from '../patient-group-edit-work-order/patient-group-edit-work-order.component';
import { PatientPayorsListDrawerComponent } from '../patient-payors/patient-payors-list-drawer/patient-payors-list-drawer.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-work-order',
    templateUrl: './patient-work-order.component.html',
    styleUrls: ['./patient-work-order.component.scss'],
    providers: [DateTimeFormatPipe, DateFormatPipe, DecimalPipe],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FuseHorizontalNavigationComponent,
        FuseAlertComponent,
        AuxAgGridComponent,
        MatFormField,
        MatLabel,
        MatInput,
        MatPrefix,
        ReactiveFormsModule,
        NgClass,
        FormsModule,
        AsyncPipe,
    ],
})
export class PatientWorkOrderComponent implements OnInit, AfterViewInit {
    @ViewChild(PatientGroupEditWorkOrderComponent) moduleItems: PatientGroupEditWorkOrderComponent;

    columnDefs: ColDef[] = [
        {
            headerName: 'Id',
            field: 'id',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 50,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Inv#',
            sort: 'desc',
            field: 'invoiceno',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 90,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Svc Date',
            field: 'svcdate',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.svcdate),
            minWidth: 100,
            filterParams: filterParams,
            onCellClicked: params => this.openWorkOrderDetails(params),
            sortable: true,
            cellClass: (params: any) => (params.data.svcdate !== params.data.todate ? 'bg-red-400' : ''),
        },
        {
            headerName: 'Item id',
            field: 'itemid',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 75,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Item Code',
            field: 'itemcode',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 110,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'T',
            filter: false,
            field: 'billType',
            hide: false,
            minWidth: 45,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'C',
            filter: false,
            field: 'confirm',
            hide: false,
            minWidth: 45,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Qty',
            field: 'quantity',
            hide: false,
            minWidth: 60,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Ship S',
            filter: false,
            field: 'shipstatus',
            hide: false,
            minWidth: 75,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Shipped On',
            field: 'shipdate',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.shipdate),
            minWidth: 100,
            filterParams: filterParams,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Description',
            field: 'description',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 170,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Next Bill',
            field: 'lastdatebilled',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.lastdatebilled),
            minWidth: 100,
            filterParams: filterParams,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'CMN Expire',
            field: 'cmnexpire',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.cmnexpire),
            minWidth: 100,
            filterParams: filterParams,
            onCellClicked: params => this.openWorkOrderDetails(params),
            cellClass: params => {
                if (params.data.cmnexpire === '1900-01-01T00:00:00') {
                    return 'bg-red-400';
                } else if (params.data.cmnexpire === '') {
                    return 'bg-red-400';
                } else {
                    return params.data.cmnexpire < params.data.lastdatebilled ? 'bg-red-400' : '';
                }
            },
        },
        {
            headerName: 'Notes Expire',
            field: 'notesexpiredate',
            hide: false,
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.notesexpiredate),
            minWidth: 110,
            filterParams: filterParams,
            onCellClicked: params => this.openWorkOrderDetails(params),
            cellClass: params => {
                if (params.data.notesexpiredate === '1900-01-01T00:00:00') {
                    return 'bg-red-400';
                } else if (params.data.notesexpiredate === '') {
                    return 'bg-red-400';
                } else {
                    return params.data.notesexpiredate < params.data.lastdatebilled ? 'bg-red-400' : '';
                }
            },
        },
        {
            headerName: 'Auth Date',
            field: 'authDate',
            hide: false,
            filter: 'agDateColumnFilter',
            cellClass: params => {
                if (params.data.authDate === '1900-01-01T00:00:00') {
                    return 'bg-red-400';
                } else if (params.data.authDate === '') {
                    return 'bg-red-400';
                }
            },
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.authDate),
            minWidth: 100,
            filterParams: filterParams,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Payer',
            field: 'primarypayer',
            hide: false,
            filter: 'agMultiColumnFilter',
            minWidth: 150,
            onCellClicked: params => this.openWorkOrderDetails(params),
        },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            filter: false,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Delete Permanently',
                        action: this.deleteRow.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            hide: false,
            minWidth: 80,
        },
    ];

    rowData = [];
    options = {
        gridOptions: {
            rowSelection: {
                mode: 'multiRow',
                checkboxes: true,
                headerCheckbox: true,
                selectAll: 'filtered',
                checkboxColumn: {
                    field: 'checkedField',
                    width: 35,
                    maxWidth: 35,
                    pinned: 'left',
                    resizable: false,
                    suppressMovable: true,
                    sortable: false,
                    filter: false,
                    lockPosition: 'left',
                    headerName: '',
                },
            },
            rowMultiSelectWithClick: true,
            headerHeight: 30,
            rowHeight: 36,
        },
        defaultColDef: {
            flex: 1,
        },
    };

    visibleColumns = [
        'checkedField',
        'invoiceno',
        'svcdate',
        'billType',
        'confirm',
        'quantity',
        'itemcode',
        'shipstatus',
        'shipdate',
        'description',
        'lastdatebilled',
        'cmnexpire',
        'notesexpiredate',
        'authDate',
        'primarypayer',
    ];

    columnParams: any;
    toolbarData: FuseNavigationItem[];
    title: string;
    data$ = this.store.select(PatientWorkOrderSelectors.selectworkorderByFilter);
    selectedFilter$ = this.store.select(PatientWorkOrderSelectors.selectworkorderFilter);
    loading$ = this.store.select(PatientWorkOrderSelectors.selectLoading);
    workOrderFilterTypes = SelectedWorkOrderFilter.billedItems;
    shipWorkOrder$ = this.store.select(PatientWorkOrderSelectors.selectShipWorkOrder);
    patientId;
    alert: any;
    showAlert: boolean = false;

    workOrderTotalObj = {
        dueprimary: 0,
        duesecondary: 0,
        total: 0,
    };

    invoiceTotalObj = {
        invoice_number: null,
        profit: 0,
        margin: 0,
    };
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    selection = new SelectionModel<any>(true, []);

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private dateTimeFormatePipe: DateTimeFormatPipe,
        private dateFormatePipe: DateFormatPipe,
        private actions$: Actions,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private titleService: TitleService,
        private decimalPipe: DecimalPipe
    ) {
        this.toolbarData = [
            {
                title: 'Shortcuts',
                type: 'basic',
                icon: 'heroicons_outline:bookmark',
                function: () => {
                    this.shortcutAction();
                },
            },
            {
                title: 'Monthly Marker',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                function: () => {
                    this.toolbarAction();
                },
            },
            {
                title: 'View Contact Notes',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                function: () => {
                    this.viewPatientNotes();
                },
            },
            {
                title: 'View Payors',
                type: 'basic',
                icon: 'mat_outline:money',
                function: () => {
                    this.viewPayors();
                },
            },
        ];
    }

    ngOnInit(): void {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        this.route.parent.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
            this.patientId = paramMap.get('id');
            this.store.dispatch(PatientWorkOrderActions.LoadWorkOrder({ patientId: +paramMap.get('id') }));
        });

        combineLatest([this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.store.dispatch(PatientWorkOrderActions.LoadWorkOrder({ patientId: this.patientId }));
            });

        this.actions$
            .pipe(ofType(WorkOrderCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        this.selectedFilter$.pipe(untilDestroyed(this)).subscribe(filter => {
            this.toolbarData[1].title = filter === this.workOrderFilterTypes ? 'Monthly Marker' : 'Billed Items';
        });

        this.data$.pipe(untilDestroyed(this)).subscribe(orders => {
            this.rowData = orders;
            if (this.rowData.length) {
                this.getCalculation();
            }
        });

        this.shipWorkOrder$.pipe(untilDestroyed(this)).subscribe(orders => {
            if (orders.flag === 'ELIGIBLE') {
                this.store.dispatch(PatientWorkOrderActions.LoadWorkOrder({ patientId: this.patientId }));
            } else {
                if (this.showAlert) {
                    this.store.dispatch(PatientWorkOrderActions.LoadWorkOrder({ patientId: this.patientId }));
                }

                this.alert = {
                    type: 'error',
                    message: orders.response,
                };
                setTimeout(() => {
                    this.alert = null;
                    this.showAlert = false;
                    this.cdr.markForCheck();
                }, 7000);
            }
        });
    }

    getCalculation() {
        this.resetCount();
        for (const obj of this.rowData) {
            Object.keys(this.workOrderTotalObj).map(result => {
                this.workOrderTotalObj[result] += obj[result] || 0;
            });
        }
        this.workOrderTotalObj['total'] = this.workOrderTotalObj['dueprimary'] + this.workOrderTotalObj['duesecondary'];
        this.workOrderTotalObj = this.transformObjectToDecimal(this.workOrderTotalObj);
    }

    transformObjectToDecimal(obj, decimalPattern: string = '1.2-2'): any {
        const transformedObj = {};

        for (const key in obj) {
            if (typeof obj[key] === 'number') {
                transformedObj[key] = this.decimalPipe.transform(obj[key], decimalPattern);
            } else {
                transformedObj[key] = obj[key];
            }
        }

        return transformedObj;
    }

    resetCount() {
        this.workOrderTotalObj = {
            dueprimary: 0,
            duesecondary: 0,
            total: 0,
        };
    }

    openWorkOrderDetails(params) {
        this.columnParams = params;
        const isEditOption = this.toolbarData.findIndex(item => item.title === 'Edit');
        if (isEditOption !== -1) this.updateToolBarData(isEditOption);
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
        this.calculateInvoiceTotal(params.data);
        this.cdr.detectChanges();
    }

    calculateInvoiceTotal(invoiceData) {
        this.invoiceTotalObj.invoice_number = invoiceData.invoiceno ? invoiceData.invoiceno : '';
        let filterData = this.rowData.filter(item => item.invoiceno === invoiceData.invoiceno);

        let totalAllowed = 0;
        let totalContractedPrice = 0;

        for (const item of filterData) {
            totalAllowed += item.allowed;
            totalContractedPrice += item.contractprice * item.shippingquantity;
        }

        const profit = totalAllowed - totalContractedPrice;
        const margin = ((totalAllowed - totalContractedPrice) / totalAllowed) * 100;

        this.invoiceTotalObj = {
            invoice_number: invoiceData.invoiceno ? invoiceData.invoiceno : '',
            profit: profit,
            margin: profit !== 0 ? margin : 0.0,
        };

        this.invoiceTotalObj = this.transformObjectToDecimal(this.invoiceTotalObj);
    }

    redirectToEdit(params) {
        this.router.navigate([`/centers/patient-center/${this.patientId}/work-order/add`, params.data.id]);
    }

    onSelectionChanged(params) {
        this.columnParams = params;
        this.selection.setSelection(...params.api.getSelectedRows());

        // Remove all dynamic toolbar buttons before adding new ones
        this.toolbarData = this.toolbarData.filter(
            item =>
                item.title !== 'Group Edit' &&
                item.title !== 'Ship' &&
                !item.title.endsWith('items selected') &&
                item.title !== 'Edit'
        );

        if (params.api.getSelectedRows().length > 0) {
            // Add Group Edit, Ship, and Delete options
            this.toolbarData = [
                ...this.toolbarData,
                {
                    title: 'Group Edit',
                    type: 'basic',
                    icon: 'mat_outline:edit_note',
                    function: () => {
                        this.openGroupEdit(params);
                    },
                },
                {
                    title: 'Ship',
                    type: 'basic',
                    icon: 'mat_outline:local_shipping',
                    function: () => {
                        this.shipWorkOrder(params);
                    },
                },
                {
                    title: this.selection.selected.length + ' items selected',
                    type: 'basic',
                    icon: 'mat_outline:delete',
                    function: () => {
                        this.deleteWordOrderInBulk(params);
                    },
                },
            ];
        } else {
            this.selection.clear();
        }
    }

    ngAfterViewInit(): void {}

    toolbarAction() {
        this.store.dispatch(PatientWorkOrderActions.ToggleWorkOrderFilter());
        if (this.columnParams) {
            this.columnParams.api.clearFocusedCell();
            this.columnParams.api.deselectAll();
            const isOptionAvailable = this.toolbarData.findIndex(item => item.title === 'Edit');
            if (isOptionAvailable !== -1) {
                this.updateToolBarData(isOptionAvailable);
            }
        }
    }

    shortcutAction() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Shortcut',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: ShortcuteListComponentComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'saveSelectedShortcut',
            enterKeyEnabled: true,
        };
        const dialogRef = this.dialog.open(AuxPopupComponent, {
            width: '70%',
            minHeight: 'auto',
            data: popupData,
        });

        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result.id != undefined) {
                    this.store.dispatch(
                        PatientWorkOrderActions.SaveSelectedProcessShortcut({
                            id: result.id,
                            patientId: this.patientId,
                        })
                    );
                }
            });
    }

    deleteRow(params: any) {
        this.deleteRecord(params.data);
    }

    /**
     * Delete Work Order Record
     */
    deleteRecord(dto): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Record',
            message: 'Are you sure you want to delete this Record? This action cannot be undone!',
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

    updateToolBarData(isOptionAvailable) {
        this.toolbarData = [
            ...this.toolbarData.slice(0, isOptionAvailable),
            ...this.toolbarData.slice(isOptionAvailable + 1),
        ];
    }

    deleteWordOrderInBulk(data) {
        const ids = data.api.getSelectedRows().map(item => item.id);
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Work Orders',
            message: 'Are you sure you want to delete these work orders? This action cannot be undone!',
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
                    this.store.dispatch(WorkOrderCenterTableActions.DeleteMultipleWorkRep({ ids }));
                    data.api.deselectAll();
                }
            });
    }

    openGroupEdit(data) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Work Order Group Edit',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientGroupEditWorkOrderComponent, // Component you want to load dynamically
            dynamicComponentData: this.columnParams.api.getSelectedRows().map(res => res.id),
            submitFunction: 'submit',
            enterKeyEnabled: true,
        };
        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '800px',
            height: 'auto',
            data: popupData,
        });

        modalRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                data.api.clearFocusedCell();
                data.api.deselectAll();
                const isOptionAvailable = this.toolbarData.findIndex(item => item.title === 'Edit');
                if (isOptionAvailable !== -1) {
                    this.updateToolBarData(isOptionAvailable);
                }
            });
    }

    shipWorkOrder(data) {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Ship Work Order',
            message: 'Are you sure you want to SHIP this work order? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Ship',
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
                    this.showAlert = true;
                    const patientData = {
                        patientid: parseInt(this.patientId, 10),
                        flag: '',
                        response: '',
                    };
                    this.alert = '';
                    this.store.dispatch(PatientWorkOrderActions.ShipWorkOrder({ patientData }));
                    data.api.clearFocusedCell();
                    data.api.deselectAll();
                    const isOptionAvailable = this.toolbarData.findIndex(item => item.title === 'Edit');
                    if (isOptionAvailable !== -1) {
                        this.updateToolBarData(isOptionAvailable);
                    }
                }
            });
    }

    openWorkOrder() {
        this.router.navigateByUrl(`/centers/patient-center/${this.patientId}/work-order/add`);
    }

    deliveryTicket() {}

    narrative() {}

    recurringOrder() {}

    collectionNotes() {}

    ngOnDestroy() {
        if (this.toolbarData[0].title === 'Monthly Marker') {
            this.toolbarAction();
        }
        this.columnParams = null;
    }

    viewPatientNotes() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'CONTACT NOTES',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientContactNotesDrawerComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '650px',
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
            .subscribe(result => {});
    }

    viewPayors() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'Payors',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: PatientPayorsListDrawerComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '650px',
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
            .subscribe(result => {});
    }
}
