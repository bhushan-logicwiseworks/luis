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
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { Compliance } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { Subject, combineLatest, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ComplianceActions } from '../../../actions/patient-compliance.action';
import { PatientComplianceSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientComplianceAddRequestComponent } from '../patient-compliance-add-request/patient-compliance-add-request.component';
import { PatientComplianceNotesComponent } from '../patient-compliance-notes/patient-compliance-notes.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-compliance',
    templateUrl: './patient-compliance.component.html',
    styleUrls: ['./patient-compliance.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientComplianceComponent implements OnInit, AfterViewInit {
    rowData: Compliance[] = [];

    columnDefs: ColDef[] = [
        { headerName: 'Id', minWidth: 50, field: 'id', hide: false },
        {
            headerName: 'Date Occurrence',
            minWidth: 130,
            field: 'dateOfOccurrence',
            valueFormatter: (params: any) => this.datePipe.transform(params.data?.dateOfOccurrence) || '',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            hide: false,
        },
        { headerName: 'Issue Type', minWidth: 130, field: 'issueType', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Subtype', minWidth: 90, field: 'subType', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'SubType Description',
            minWidth: 270,
            field: 'subTypeDescription',
            filter: 'agMultiColumnFilter',
            hide: false,
        },
        { headerName: 'Resolution', minWidth: 125, field: 'resolution', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Resolution Date',
            minWidth: 130,
            field: 'resolutionDate',
            valueFormatter: (params: any) => {
                const date = params.data?.resolutionDate;
                return date && date !== '1900-01-01' ? this.datePipe.transform(date) : '';
            },
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            hide: false,
        },
        { headerName: 'Added By', minWidth: 100, field: 'createdBy', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Notes',
            field: 'contactNotes',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'contactNotes' },
            minWidth: 65,
            onCellClicked: params => this.openContactNote(params.data.id, this.patientId),
            hide: false,
        },
        {
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
        },
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
            title: 'Add Compliance Event',
            type: 'basic',
            icon: 'heroicons_outline:plus-circle',
            function: () => {
                this.addComplianceRequest();
            },
        },
    ];
    title: string;
    showSystemNotes: boolean = false;
    data$ = this.store.select(PatientComplianceSelectors.selectCompliances);
    loading$ = this.store.select(PatientComplianceSelectors.selectLoading);
    error$ = this.store.select(PatientComplianceSelectors.selectError);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    visibleColumns = [
        'id',
        'dateOfOccurrence',
        'issueType',
        'subType',
        'subTypeDescription',
        'resolution',
        'resolutionDate',
        'createdBy',
        'contactNotes',
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
        private datePipe: DateFormatPipe,
        private titleService: TitleService,
        private searchService: AuxSearchService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        //console.log('PatientComplianceComponent initialized');
        this.title = this.router.url.split('/')[4] || 'Compliance';
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
                    this.store.dispatch(ComplianceActions.loadCompliance({ patientId: this.patientId }));
                } else {
                    console.error('Invalid patientId:', id);
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(compliances => {
            //console.log('Received compliances:', compliances);
            const filteredArray = compliances.filter(obj => this.showSystemNotes || obj.createdBy !== 'SYSTEM');
            this.rowData = filteredArray;
            this.cdr.detectChanges();
        });

        this.searchCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
            //console.log('Search value:', value);
            this.searchService.search.next(value);
        });

        this.error$.pipe(untilDestroyed(this)).subscribe();

        this.actions$.pipe(ofType(ComplianceActions.refresh), untilDestroyed(this)).subscribe(value => {
            //console.log('ComplianceActions.refresh triggered:', value);
            this.refresh.next(value);
        });
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {}

    onSelectionChanged(params: CellClickedEvent): void {
        console.log('Cell clicked:', params);
        const excludedColumns = ['actions', 'contactNotes', 'patientId'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.openEditComplianceRequest(params.data);
        }
    }

    addComplianceRequest(): void {
        //console.log('addComplianceRequest called');
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'Add Compliance Event',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientComplianceAddRequestComponent,
            dynamicComponentData: { patientId: this.patientId, addedBy: this.addedBy, compliance: null },
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
            .subscribe(result => {});
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

    openEditComplianceRequest(compliance: Compliance): void {
        //console.log('Opening edit popup for compliance:', compliance);
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'EDIT COMPLIANCE REQUEST',
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
            .subscribe(result => {});
    }
    delete(delData: any) {
        this.deleteRecord(delData.data);
    }

    deleteRecord(dto: Compliance): void {
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
                    this.store.dispatch(ComplianceActions.DeleteCompliance({ compliance: dto }));
                }
            });
    }
}
