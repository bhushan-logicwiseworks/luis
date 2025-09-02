import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Subject, combineLatest, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import {
    FuseHorizontalNavigationComponent,
    FuseNavigationItem,
} from '../../../../../../../@fuse/components/navigation';
import { FuseConfirmationService } from '../../../../../../../@fuse/services/confirmation';
import { AuxSearchService } from '../../../../../../shared/aux-service/aux-search.service';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import {
    AuxPopupComponent,
    PopupData,
} from '../../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from '../../../../../../shared/constants/aux-ag-grid.constants';
import { BillingEventsCenterDisplay } from '../../../../../../shared/interfaces/auxilium/billing-events-center/billing-events-center.interfface';
import { PatientEventsBilling } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-events-billing.interface';
import { DateFormatPipe } from '../../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { FinancialAssistanceProgramAddComponent } from '../../../../billing-events-center/components/financial-assistance-program-add/financial-assistance-program-add.component';
import { PatientEventsBillingActions } from '../../../actions/patient-events-billing.action';
import { PatientEventsBillingSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { BillingEventsNotesComponent } from '../billing-events-notes/billing-events-notes.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-financial-assistance-program-table',
    templateUrl: './patient-financial-assistance-program-table.component.html',
    styleUrls: ['./patient-financial-assistance-program-table.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe, FuseHorizontalNavigationComponent],
})
export class PatientFinancialAssistanceProgramTableComponent implements OnInit, OnDestroy {
    patientId: number;
    title: string;
    searchCtrl = new UntypedFormControl();
    data$ = this.store.select(PatientEventsBillingSelectors.selectBillingEvents);
    loading$ = this.store.select(PatientEventsBillingSelectors.selectLoading);

    visibleColumns: string[] = ['todaysDate', 'owner', 'programType', 'outcome', 'reEvaluationDate'];
    paginationOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    rowData: PatientEventsBilling[] = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        {
            headerName: 'ID',
            field: 'id',
            filter: 'agMultiColumnFilter',
            minWidth: 60,
        },
        {
            headerName: "TODAY'S DATE",
            field: 'todaysDate',
            valueFormatter: params => this.datePipe.transform(params.data.todaysDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 150,
        },
        {
            headerName: 'OWNEER',
            field: 'owner',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
        },
        {
            headerName: 'PROGRAM TYPE',
            field: 'programType',
            filter: 'agMultiColumnFilter',
            minWidth: 160,
        },
        {
            headerName: 'OUTCOME',
            field: 'outcome',
            filter: 'agMultiColumnFilter',
            minWidth: 140,
        },
        {
            headerName: 'RE-EVALUATION DATE',
            field: 'reEvaluationDate',
            valueFormatter: params => this.datePipe.transform(params.data.reEvaluationDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 180,
        },
    ];

    toolbarData: FuseNavigationItem[] = [
        {
            title: 'Add Event',
            type: 'basic',
            icon: 'heroicons_outline:plus-circle',
            function: () => {
                this.openCreate();
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
        this.title = this.router.url.split('/')[4] || 'Patient Events Billing';
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
                        PatientEventsBillingActions.LoadPatientBillingEvents({
                            patientId: this.patientId,
                            eventType: 'financialassistance',
                        })
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

        this.actions$.pipe(ofType(PatientEventsBillingActions.Refresh), untilDestroyed(this)).subscribe(value => {
            //console.log('ComplianceActions.refresh triggered:', value);
            this.refresh.next(value);
        });
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {}

    onSelectionChanged(params: CellClickedEvent): void {
        console.log('Cell clicked:', params);
        const excludedColumns = ['comments'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.saveFinancial(params.data);
        }
    }

    saveFinancial(billingevents?: BillingEventsCenterDisplay): void {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: billingevents ? 'EDIT EVENT' : 'ADD EVENT',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: FinancialAssistanceProgramAddComponent,
            dynamicComponentData: billingevents
                ? { billingevents, patientId: this.patientId }
                : { patientId: this.patientId },

            submitFunction: 'saveFinancial',
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

    openCreate(): void {
        this.saveFinancial();
    }

    openContactNote(refId: number, patientId: number): void {
        // Dispatch action to load contact notes
        this.store.dispatch(PatientEventsBillingActions.LoadContactNotes({ patientId, refId }));

        const popupData: PopupData = {
            icon: 'mat_outline:chat',
            iconColor: 'primary',
            title: 'CONTACT NOTES',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: BillingEventsNotesComponent,
            dynamicComponentData: {
                patientId: patientId,
                refId: refId,
                moduleName: 'BillingEvents',
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
                        PatientEventsBillingActions.LoadContactNotes({
                            patientId: this.patientId,
                            refId: refId,
                        })
                    );
                }
            });
    }
}
