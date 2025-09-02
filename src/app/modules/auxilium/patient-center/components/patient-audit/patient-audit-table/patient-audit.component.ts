import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { Subject, combineLatest, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ButtonWithIconsComponents } from '../../../../../../shared/components/button-with-icons/button-with-icons.component';
import { Audit } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-audit.interface';
import { AuditActions } from '../../../actions/patient-audit.action';
import { PatientAuditSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientAuditAddRequestComponent } from '../patient-audit-add-request/patient-audit-add-request.component';
import { PatientAuditNotesComponent } from '../patient-audit-notes/patient-audit-notes.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-audit',
    templateUrl: './patient-audit.component.html',
    styleUrls: ['./patient-audit.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientAuditComponent implements OnInit, AfterViewInit {
    rowData: Audit[] = [];

    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', minWidth: 50 },
        // {
        //     headerName: 'Patient ID',
        //     field: 'patientId',
        //     filter: 'agNumberColumnFilter',
        //     minWidth: 100,
        //     cellRenderer: ButtonWithIconsComponents,
        //     cellRendererParams: { field: 'patientId' },
        //     onCellClicked: params => this.handleRedirect('compliance', { data: { patientid: params.data.patientId } }),
        // },
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
            onCellClicked: params => this.openContactNote(params.data.id, this.patientId),
            hide: false,
        },
        // { headerName: 'Created By', field: 'createdBy', filter: 'agMultiColumnFilter', minWidth: 100 },
        // {
        //     headerName: 'Created Date',
        //     field: 'createdDate',
        //     valueFormatter: params => this.dateFormatePipe.transform(params.data.createdDate),
        //     filter: 'agDateColumnFilter',
        //     minWidth: 125,
        // },
        // { headerName: 'Modified By', field: 'modifiedBy', filter: 'agMultiColumnFilter', minWidth: 100 },
        // {
        //     headerName: 'Modified Date',
        //     field: 'modifiedDate',
        //     valueFormatter: params => this.dateFormatePipe.transform(params.data.modifiedDate),
        //     filter: 'agDateColumnFilter',
        //     minWidth: 150,
        // },
    ];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
        pagination: true,
        paginationPageSize: 20,
    };

    toolbarData: FuseNavigationItem[] = [
        {
            title: 'Add Audit Event',
            type: 'basic',
            icon: 'heroicons_outline:plus-circle',
            function: () => {
                this.addAuditRequest();
            },
        },
    ];
    title: string;
    showSystemNotes: boolean = false;
    data$ = this.store.select(PatientAuditSelectors.selectAudits);
    loading$ = this.store.select(PatientAuditSelectors.selectLoading);
    error$ = this.store.select(PatientAuditSelectors.selectError);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    visibleColumns = [
        'id',
        // 'patientId',
        'dateOfAudit',
        'auditType',
        'subType',
        'subTypeDescription',
        'assignedTo',
        'auditor',
        'resolution',
        'resolutionDate',
        'contactNotes',
        // 'createdBy',
        // 'createdDate',
        // 'modifiedBy',
        // 'modifiedDate',
    ];
    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    searchCtrl = new UntypedFormControl();
    selectedRowIndex: number = -1;
    patientId: number;
    addedBy: string = 'Current User';

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private actions$: Actions,
        private dialog: MatDialog,
        // private datePipe: DateFormatPipe,
        private dateFormatePipe: DateFormatPipe,
        private titleService: TitleService,
        private searchService: AuxSearchService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        //console.log('PatientComplianceComponent initialized');
        this.title = this.router.url.split('/')[4] || 'Audit';
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
                    this.store.dispatch(AuditActions.loadAudit({ patientId: this.patientId }));
                } else {
                    console.error('Invalid patientId:', id);
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(audit => {
            //console.log('Received audits:', audits);
            const filteredArray = audit.filter(obj => this.showSystemNotes || obj.createdBy !== 'SYSTEM');
            this.rowData = filteredArray;
            this.cdr.detectChanges();
        });

        this.searchCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
            //console.log('Search value:', value);
            this.searchService.search.next(value);
        });

        this.error$.pipe(untilDestroyed(this)).subscribe();

        this.actions$.pipe(ofType(AuditActions.refresh), untilDestroyed(this)).subscribe(value => {
            //console.log('AuditActions.refresh triggered:', value);
            this.refresh.next(value);
        });
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {}

    onSelectionChanged(params: CellClickedEvent): void {
        console.log('Cell clicked:', params);
        const excludedColumns = ['actions', 'contactNotes', 'patientId'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.openEditAuditRequest(params.data);
        }
    }

    addAuditRequest(): void {
        //console.log('addAuditRequest called');
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'Add Audit Event',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAuditAddRequestComponent,
            dynamicComponentData: { patientId: this.patientId, addedBy: this.addedBy, audit: null },
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
            .subscribe(result => {});
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

    openEditAuditRequest(audit: Audit): void {
        //console.log('Opening edit popup for compliance:', compliance);
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'EDIT AUDIT REQUEST',
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
            .subscribe(result => {});
    }
}
