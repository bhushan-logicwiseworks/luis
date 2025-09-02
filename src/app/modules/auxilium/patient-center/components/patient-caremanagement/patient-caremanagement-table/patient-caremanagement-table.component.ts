import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { PatientCareManagement } from 'app/shared/interfaces/auxilium/patient-center/patient-caremanagement.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { Subject, combineLatest, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientCareManagementActions } from '../../../actions/patient-caremanagement.action';
import { PatientCareManagementSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientCaremanagementAddRequestComponent } from '../patient-caremanagement-add-request/patient-caremanagement-add-request.component';
import { PatientCaremanagementNotesComponent } from '../patient-caremanagement-notes/patient-caremanagement-notes.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-caremanagement-table',
    templateUrl: './patient-caremanagement-table.component.html',
    styleUrls: ['./patient-caremanagement-table.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientCareManagementTableComponent implements OnInit {
    patientId: number;
    private gridApi: GridApi;
    title: string;
    searchCtrl = new UntypedFormControl();
    data$ = this.store.select(PatientCareManagementSelectors.selectRecords);
    loading$ = this.store.select(PatientCareManagementSelectors.selectLoading);

    visibleColumns: string[] = [
        'id',
        'dateAssigned',
        'dueDate',
        'servicedBy',
        'insuranceId',
        'insuranceUpdated',
        'billingCode',
        'billingDetails',
        'nobleId',
        'contactNotes',
        'updatedByUser',
        'sentForShipment',
        'shipmentDate' /* ,
        'actions', */,
        ,
    ];
    paginationOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    rowData: PatientCareManagement[] = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', minWidth: 50, sort: 'desc', sortIndex: 1 },
        {
            headerName: 'Date Assigned',
            field: 'dateAssigned',
            valueFormatter: params => this.datePipe.transform(params.data.dateAssigned),
            filter: 'agDateColumnFilter',
            minWidth: 110,
        },
        {
            headerName: 'Due Date',
            field: 'dueDate',
            valueFormatter: params => this.datePipe.transform(params.data.dueDate),
            filter: 'agDateColumnFilter',
            minWidth: 110,
        },
        { headerName: 'Label', field: 'label', filter: 'agMultiColumnFilter', minWidth: 90 },
        { headerName: 'Assigned To', field: 'assignedTo', filter: 'agMultiColumnFilter', minWidth: 125 },
        { headerName: 'Serviced By', field: 'servicedBy', filter: 'agMultiColumnFilter', minWidth: 125 },
        { headerName: 'Insurance ID', field: 'insuranceId', filter: 'agMultiColumnFilter', minWidth: 125 },
        {
            headerName: 'Ins Updated',
            field: 'insuranceUpdated',
            filter: 'agMultiColumnFilter',
            filterValueGetter: params => (params.data.insuranceUpdated ? 'YES' : 'NO'),
            valueFormatter: params => (params.value ? 'YES' : 'NO'),
            cellDataType: 'text',
            minWidth: 100,
        },
        { headerName: 'Billing Code', field: 'billingCode', filter: 'agMultiColumnFilter', minWidth: 125 },
        { headerName: 'Billing Details', field: 'billingDetails', filter: 'agMultiColumnFilter', minWidth: 250 },
        { headerName: 'Updated By', field: 'updatedByUser', filter: 'agMultiColumnFilter', minWidth: 125 },
        { headerName: 'Noble ID', field: 'nobleId', filter: 'agMultiColumnFilter', minWidth: 100 },
        { headerName: 'Sent Ship', field: 'sentForShipment', filter: 'agMultiColumnFilter', minWidth: 100 },
        {
            headerName: 'Ship Date',
            field: 'shipmentDate',
            valueFormatter: params => this.datePipe.transform(params.data.shipmentDate),
            filter: 'agDateColumnFilter',
            minWidth: 110,
        },
        {
            headerName: 'Notes',
            field: 'contactNotes',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'contactNotes' },
            minWidth: 75,
            onCellClicked: params => this.openContactNote(params.data.id, this.patientId),
        },
        /* {
            headerName: 'Actions',
            minWidth: 80,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Remove Record',
                        action: this.delete.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            sortIndex: 9,
            hide: false,
        }, */
    ];

    toolbarData: FuseNavigationItem[] = [
        {
            title: 'Add Care Management Record',
            type: 'basic',
            icon: 'heroicons_outline:plus-circle',
            function: () => {
                this.addRecord();
            },
        },
    ];

    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private store: Store,
        private actions$: Actions,
        private dialog: MatDialog,
        private titleService: TitleService,
        private datePipe: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private searchService: AuxSearchService
    ) {}

    ngOnInit(): void {
        // Set title
        this.title = this.router.url.split('/')[4] || 'Care Management';
        this.titleService.setValue(this.title);

        combineLatest([
            this.route.parent.paramMap,
            this.refresh$.pipe(startWith(null), debounceTime(100), distinctUntilChanged()),
        ])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const id = paramMap.get('id');
                this.patientId = id && !isNaN(+id) ? +id : 0;

                if (this.patientId > 0) {
                    this.store.dispatch(
                        PatientCareManagementActions.LoadPatientCareManagement({ patientId: this.patientId })
                    );
                } else {
                    console.error('Invalid patientId:', id);
                }
            });

        // Subscribe to data stream and update table rows
        this.data$.pipe(untilDestroyed(this)).subscribe(records => {
            this.rowData = records;
            this.cdr.detectChanges();
        });

        this.searchCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
            //console.log('Search value:', value);
            this.searchService.search.next(value);
        });

        this.actions$.pipe(ofType(PatientCareManagementActions.Refresh), untilDestroyed(this)).subscribe(value => {
            //console.log('ComplianceActions.refresh triggered:', value);
            this.refresh.next(value);
        });
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {}

    onSelectionChanged(params: CellClickedEvent): void {
        console.log('Cell clicked:', params);
        const excludedColumns = ['actions', 'contactNotes'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.openEditRecordRequest(params.data);
        }
    }

    addRecord() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: `Add Care Management Record`,
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Add Record',
            dynamicComponent: PatientCaremanagementAddRequestComponent,
            dynamicComponentData: { patientId: this.patientId },
            submitFunction: 'saveCareManagement',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: '0px',
                    right: '0px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }

    openEditRecordRequest(patientCareManagement: PatientCareManagement): void {
        //console.log('Opening edit popup for compliance:', compliance);
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Edit Care Management Record',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientCaremanagementAddRequestComponent,
            dynamicComponentData: { patientId: this.patientId, patientCareManagement },
            submitFunction: 'saveCareManagement',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: '0px',
                    right: '0px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }

    openContactNote(refId: number, patientId: number): void {
        // Dispatch action to load contact notes
        this.store.dispatch(PatientCareManagementActions.LoadContactNotes({ patientId, refId }));

        const popupData: PopupData = {
            icon: 'mat_outline:chat',
            iconColor: 'primary',
            title: 'CONTACT NOTES',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientCaremanagementNotesComponent,
            dynamicComponentData: {
                patientId: patientId,
                refId: refId,
                moduleName: 'CAREMANAGEMENT',
            },
            submitFunction: 'saveContactNote',
            enterKeyEnabled: true,
        };

        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: '0px',
                    right: '0px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result?.success) {
                    this.store.dispatch(
                        PatientCareManagementActions.LoadContactNotes({
                            patientId: this.patientId,
                            refId: refId,
                        })
                    );
                }
            });
    }

    delete(delData: any) {
        this.deleteRecord(delData.data);
    }

    deleteRecord(dto: PatientCareManagement): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Remove Record',
            message: 'Are you sure you want to remove this record? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result === 'confirmed') {
                    this.store.dispatch(PatientCareManagementActions.DeletePatientCareManagement({ record: dto }));
                }
            });
    }

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        this.cdr.detectChanges();
    }
}
