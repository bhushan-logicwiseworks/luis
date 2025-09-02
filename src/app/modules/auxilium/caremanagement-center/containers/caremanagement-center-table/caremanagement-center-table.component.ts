import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { PatientCaremanagementAddRequestComponent } from 'app/modules/auxilium/patient-center/components/patient-caremanagement/patient-caremanagement-add-request/patient-caremanagement-add-request.component';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { PatientCareManagement } from 'app/shared/interfaces/auxilium/patient-center/patient-caremanagement.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, startWith, Subject, switchMap } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientCareManagementActions } from '../../../patient-center/actions/patient-caremanagement.action';
import { PatientCaremanagementNotesComponent } from '../../../patient-center/components/patient-caremanagement/patient-caremanagement-notes/patient-caremanagement-notes.component';
import { CareManagementCenterTableActions } from '../../actions/caremanagement-center-table.actions';
import { CareManagementTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-caremanagement-center-table',
    templateUrl: './caremanagement-center-table.component.html',
    styleUrls: ['./caremanagement-center-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateTimeFormatPipe, DateFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class CareManagementCenterTableComponent implements OnInit, OnDestroy {
    rowData = [];
    options = {
        gridOptions: {
            rowDragManaged: false,
            rowDragEntireRow: true,
            rowDragMultiRow: true,
            rowSelection: 'multiple',
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', minWidth: 70, sort: 'desc', sortIndex: 1 },
        {
            headerName: 'Patient ID',
            field: 'patientId',
            filter: 'agNumberColumnFilter',
            minWidth: 90,
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'patientId' },
            onCellClicked: params =>
                this.handleRedirect('caremanagement', { data: { patientid: params.data.patientId } }),
        },
        { headerName: 'State', field: 'state', filter: 'agMultiColumnFilter', minWidth: 70 },
        {
            headerName: 'Date Assigned',
            field: 'dateAssigned',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.dateAssigned),
            filter: 'agDateColumnFilter',
            minWidth: 110,
        },
        {
            headerName: 'Due Date',
            field: 'dueDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.dueDate),
            filter: 'agDateColumnFilter',
            minWidth: 110,
        },
        { headerName: 'Label', field: 'label', filter: 'agMultiColumnFilter', minWidth: 90 },
        { headerName: 'Assigned To', field: 'assignedTo', filter: 'agMultiColumnFilter', minWidth: 115 },
        { headerName: 'Serviced By', field: 'servicedBy', filter: 'agMultiColumnFilter', minWidth: 115 },
        { headerName: 'Ins ID', field: 'insuranceId', filter: 'agMultiColumnFilter', minWidth: 100 },
        {
            headerName: 'Updated',
            field: 'insuranceUpdated',
            filter: 'agMultiColumnFilter',
            cellDataType: 'text',
            filterValueGetter: params => (params.data.insuranceUpdated ? 'YES' : 'NO'),
            valueFormatter: params => (params.value ? 'YES' : 'NO'),
            minWidth: 90,
        },
        { headerName: 'Billing Code', field: 'billingCode', filter: 'agMultiColumnFilter', minWidth: 105 },
        { headerName: 'Billing Details', field: 'billingDetails', filter: 'agMultiColumnFilter', minWidth: 175 },
        { headerName: 'Updated By', field: 'updatedByUser', filter: 'agMultiColumnFilter', minWidth: 115 },
        { headerName: 'Noble ID', field: 'nobleId', filter: 'agMultiColumnFilter', minWidth: 100 },
        { headerName: 'Sent Ship', field: 'sentForShipment', filter: 'agMultiColumnFilter', minWidth: 100 },
        {
            headerName: 'Ship Date',
            field: 'shipmentDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.shipmentDate),
            filter: 'agDateColumnFilter',
            minWidth: 110,
        },
        {
            headerName: 'Notes',
            field: 'contactNotes',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'contactNotes' },
            minWidth: 75,
            onCellClicked: params => this.openContactNote(params.data.id, params.data.patientId),
        },
    ];

    visibleColumns = [
        'id',
        'patientId',
        'state',
        'dateAssigned',
        'dueDate',
        'assignedTo',
        'servicedBy',
        'insuranceId',
        'insuranceUpdated',
        'billingCode',
        'billingDetails',
        'updatedByUser',
        'nobleId',
        'sentForShipment',
        'shipmentDate',
        'contactNotes',
    ];

    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(CareManagementTableSelectors.selectCareManagements))
    );
    loading$ = this.store.select(CareManagementTableSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    patientId: number;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private dateFormatePipe: DateFormatPipe,
        private searchService: AuxSearchService,
        private auxUtilService: AuxUtilService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'all':
                        this.store.dispatch(CareManagementCenterTableActions.LoadCareManagement({ filter: 'ALL' }));
                        break;
                }
            });

        this.data$.subscribe(compliancesList => {
            this.rowData = compliancesList;
        });
    }

    onSelectionChanged(params: CellClickedEvent): void {
        console.log('Cell clicked:', params);
        const excludedColumns = ['actions', 'patientId', 'contactNotes'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.openEditRecordRequest(params.data);
        }
    }

    openEditRecordRequest(patientCareManagement: PatientCareManagement): void {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'EDIT REQUEST',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientCaremanagementAddRequestComponent,
            dynamicComponentData: { patientId: patientCareManagement.patientId, patientCareManagement },
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
            .subscribe(result => {
                this.refresh.next(result);
            });
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

    ngOnDestroy() {
        this.store.dispatch(CareManagementCenterTableActions.resetState());
    }

    getIcon(language: string) {
        if (language == 'ENGLISH') {
            return 'US';
        } else if (language == 'SPANISH') {
            return 'ES';
        } else {
            return '';
        }
    }

    handleRedirect(field: string, params) {
        this.auxUtilService.redirectToNewTab(field, params);
    }
}
