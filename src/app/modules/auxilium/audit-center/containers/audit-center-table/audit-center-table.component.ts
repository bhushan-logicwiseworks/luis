import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { combineLatest, startWith, Subject, switchMap } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { Audit } from '../../../../../shared/interfaces/auxilium/patient-center/patient-audit.interface';
import { AuditActions } from '../../../patient-center/actions/patient-audit.action';
import { PatientAuditAddRequestComponent } from '../../../patient-center/components/patient-audit/patient-audit-add-request/patient-audit-add-request.component';
import { PatientAuditNotesComponent } from '../../../patient-center/components/patient-audit/patient-audit-notes/patient-audit-notes.component';
import { AuditCenterTableActions } from '../../actions/audit-center-table.actions';
import { AuditCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-audit-center-table',
    templateUrl: './audit-center-table.component.html',
    styleUrl: './audit-center-table.component.scss',
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class AuditCenterTableComponent implements OnInit, OnDestroy {
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
        { headerName: 'ID', field: 'id', minWidth: 50 },
        {
            headerName: 'Patient ID',
            field: 'patientId',
            filter: 'agNumberColumnFilter',
            minWidth: 100,
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'patientId' },
            onCellClicked: params => this.handleRedirect('audit', { data: { patientid: params.data.patientId } }),
        },
        {
            headerName: 'Date Of Audit',
            field: 'dateOfAudit',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.dateOfAudit),
            filter: 'agDateColumnFilter',
            minWidth: 125,
        },
        { headerName: 'Audit Type', field: 'auditType', filter: 'agMultiColumnFilter', minWidth: 100 },
        { headerName: 'Sub Type', field: 'subType', filter: 'agMultiColumnFilter', minWidth: 90 },
        {
            headerName: 'Sub Type Description',
            field: 'subTypeDescription',
            filter: 'agMultiColumnFilter',
            minWidth: 200,
        },
        { headerName: 'Assigned To', field: 'assignedTo', filter: 'agMultiColumnFilter', minWidth: 125 },
        { headerName: 'Auditor', field: 'auditor', filter: 'agMultiColumnFilter', minWidth: 125 },
        { headerName: 'Resolution', field: 'resolution', filter: 'agMultiColumnFilter', minWidth: 125 },
        {
            headerName: 'Resolution Date',
            field: 'resolutionDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.resolutionDate),
            filter: 'agDateColumnFilter',
            minWidth: 125,
        },
        {
            headerName: 'Notes',
            field: 'contactNotes',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'contactNotes' },
            minWidth: 65,
            onCellClicked: params => this.openContactNote(params.data.id, params.data.patientId),
            hide: false,
        },
        { headerName: 'Created By', field: 'createdBy', filter: 'agMultiColumnFilter', minWidth: 100 },
        {
            headerName: 'Created Date',
            field: 'createdDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.createdDate),
            filter: 'agDateColumnFilter',
            minWidth: 125,
        },
        { headerName: 'Modified By', field: 'modifiedBy', filter: 'agMultiColumnFilter', minWidth: 100 },
        {
            headerName: 'Modified Date',
            field: 'modifiedDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.modifiedDate),
            filter: 'agDateColumnFilter',
            minWidth: 150,
        },
    ];

    visibleColumns = [
        'id',
        'patientId',
        'dateOfAudit',
        'auditType',
        'subType',
        'subTypeDescription',
        'assignedTo',
        'auditor',
        'resolution',
        'resolutionDate',
        'contactNotes',
    ];

    data$ = this.route.paramMap.pipe(switchMap(paramMap => this.store.select(AuditCenterTableSelectors.selectAudits)));

    loading$ = this.store.select(AuditCenterTableSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    patientId: number;
    addedBy: string = 'Current User';

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
                        this.store.dispatch(AuditCenterTableActions.LoadAudit({ filter: 'ALL' }));
                        break;
                }
            });

        this.data$.subscribe(auditsList => {
            this.rowData = auditsList;
        });
    }
    onSelectionChanged(params: CellClickedEvent): void {
        console.log('Cell clicked:', params);
        // console.log('Cell clicked:', params);
        const excludedColumns = ['actions', 'patientId', 'contactNotes'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.openEditAuditRequest(params.data);
        }
    }

    openEditAuditRequest(audit: Audit): void {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'EDIT REQUEST',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAuditAddRequestComponent,
            dynamicComponentData: { patientId: this.patientId, addedBy: this.addedBy, audit },
            submitFunction: 'saveAudit',
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

    ngOnDestroy() {
        this.store.dispatch(AuditCenterTableActions.resetState());
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

    openContactNote(refId: number, patientId: number): void {
        // Dispatch action to load contact notes
        this.store.dispatch(AuditActions.LoadContactNotes({ patientId, refId }));

        const popupData: PopupData = {
            icon: 'mat_outline:chat',
            iconColor: 'primary',
            title: 'CONTACT NOTES',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAuditNotesComponent,
            dynamicComponentData: {
                patientId: patientId,
                refId: refId,
                moduleName: 'COMPLIANCE',
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
                        AuditActions.LoadContactNotes({
                            patientId: this.patientId,
                            refId: refId,
                        })
                    );
                }
            });
    }
}
