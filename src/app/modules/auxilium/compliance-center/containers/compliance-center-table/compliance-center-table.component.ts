import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { ComplianceActions } from 'app/modules/auxilium/patient-center/actions/patient-compliance.action';
import { PatientComplianceAddRequestComponent } from 'app/modules/auxilium/patient-center/components/patient-compliance/patient-compliance-add-request/patient-compliance-add-request.component';
import { PatientComplianceNotesComponent } from 'app/modules/auxilium/patient-center/components/patient-compliance/patient-compliance-notes/patient-compliance-notes.component';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { Compliance } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { combineLatest, startWith, Subject, switchMap } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ComplianceCenterTableActions } from '../../actions/compliance-center-table.actions';
import { ComplianceCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-compliance-center-table',
    templateUrl: './compliance-center-table.component.html',
    styleUrl: './compliance-center-table.component.scss',
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ComplianceCenterTableComponent implements OnInit, OnDestroy {
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
            onCellClicked: params => this.handleRedirect('compliance', { data: { patientid: params.data.patientId } }),
        },
        {
            headerName: 'Date Occurrence',
            field: 'dateOfOccurrence',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.dateOfOccurrence),
            filter: 'agDateColumnFilter',
            minWidth: 125,
        },
        { headerName: 'Issue Type', field: 'issueType', filter: 'agMultiColumnFilter', minWidth: 100 },
        { headerName: 'Sub Type', field: 'subType', filter: 'agMultiColumnFilter', minWidth: 90 },
        {
            headerName: 'Sub Type Description',
            field: 'subTypeDescription',
            filter: 'agMultiColumnFilter',
            minWidth: 200,
        },
        { headerName: 'Resolution', field: 'resolution', filter: 'agMultiColumnFilter', minWidth: 125 },
        {
            headerName: 'Resolution Date',
            field: 'resolutionDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.resolutionDate),
            filter: 'agDateColumnFilter',
            minWidth: 125,
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
        {
            headerName: 'Notes',
            field: 'contactNotes',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'contactNotes' },
            minWidth: 65,
            onCellClicked: params => this.openContactNote(params.data.id, params.data.patientId),
            hide: false,
        },
    ];

    visibleColumns = [
        'id',
        'patientId',
        'dateOfOccurrence',
        'issueType',
        'subType',
        'subTypeDescription',
        'resolution',
        'resolutionDate',
        'createdBy',
        'createdDate',
        'contactNotes',
    ];

    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(ComplianceCenterTableSelectors.selectCompliances))
    );

    loading$ = this.store.select(ComplianceCenterTableSelectors.selectLoading);
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
                        this.store.dispatch(ComplianceCenterTableActions.LoadCompliance({ filter: 'ALL' }));
                        break;
                }
            });

        this.data$.subscribe(compliancesList => {
            this.rowData = compliancesList;
        });
    }
    onSelectionChanged(params: CellClickedEvent): void {
        console.log('Cell clicked:', params);
        // console.log('Cell clicked:', params);
        const excludedColumns = ['actions', 'patientId', 'contactNotes'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.openEditComplianceRequest(params.data);
        }
    }

    openEditComplianceRequest(compliance: Compliance): void {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'EDIT REQUEST',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientComplianceAddRequestComponent,
            dynamicComponentData: { patientId: this.patientId, addedBy: this.addedBy, compliance },
            submitFunction: 'saveCompliance',
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
        this.store.dispatch(ComplianceCenterTableActions.resetState());
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
        this.store.dispatch(ComplianceActions.LoadContactNotes({ patientId, refId }));

        const popupData: PopupData = {
            icon: 'mat_outline:chat',
            iconColor: 'primary',
            title: 'CONTACT NOTES',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientComplianceNotesComponent,
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
                        ComplianceActions.LoadContactNotes({
                            patientId: this.patientId,
                            refId: refId,
                        })
                    );
                }
            });
    }
}
