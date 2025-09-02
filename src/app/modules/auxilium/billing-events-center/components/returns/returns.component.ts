import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Subject, startWith, switchMap } from 'rxjs';
import { AuxSearchService } from '../../../../../shared/aux-service/aux-search.service';
import { AuxUtilService } from '../../../../../shared/aux-service/aux-utils.service';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AuxPopupComponent, PopupData } from '../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from '../../../../../shared/components/button-with-icons/button-with-icons.component';
import { filterParams } from '../../../../../shared/constants/aux-ag-grid.constants';
import { BillingEventsCenterDisplay } from '../../../../../shared/interfaces/auxilium/billing-events-center/billing-events-center.interfface';
import { DateFormatPipe } from '../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { PatientEventsBillingActions } from '../../../patient-center/actions/patient-events-billing.action';
import { BillingEventsNotesComponent } from '../../../patient-center/components/patient-events-billing/billing-events-notes/billing-events-notes.component';
import { BillingEventsCenterTableActions } from '../../actions/billing-events-center-table.action';
import { BillingEventsCenterTableSelectors } from '../../reducers';
import { ReturnsAddComponent } from '../returns-add/returns-add.component';

@UntilDestroy()
@Component({
    selector: 'app-returns',
    templateUrl: './returns.component.html',
    styleUrls: ['./returns.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ReturnsComponent implements OnInit, OnDestroy {
    rowData = [];
    patientId: number;

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
            headerName: 'Patient ID',
            field: 'patientId',
            filter: 'agMultiColumnFilter',
            minWidth: 100,
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'patientId' },
            onCellClicked: params => this.handleRedirect('returns', { data: { patientid: params.data.patientId } }),
        },
        {
            headerName: "TODAY'S DATE",
            field: 'todaysDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.todaysDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 150,
        },
        {
            headerName: 'CLAIM DATE OF SERVICE',
            field: 'claimDateOfService',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.claimDateOfService),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 150,
        },
        {
            headerName: 'OWNER',
            field: 'owner',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
        },
        {
            headerName: 'INSURANCE ID',
            field: 'insuranceId',
            filter: 'agMultiColumnFilter',
            minWidth: 160,
        },
        {
            headerName: 'RETURN ACTION',
            field: 'returnAction',
            filter: 'agMultiColumnFilter',
            minWidth: 225,
        },
        {
            headerName: 'DATE FULLY RESOLVED',
            field: 'dateFullyResolved',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.dateFullyResolved),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 180,
        },
        {
            headerName: '',
            field: 'comments',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'contactNotes' },
            minWidth: 75,
            onCellClicked: params => this.openContactNote(params.data.id, params.data.patientId),
        },
    ];

    visibleColumns = [
        'id',
        'patientId',
        'todaysDate',
        'claimDateOfService',
        'owner',
        'insuranceId',
        'returnAction',
        'dateFullyResolved',
        'comments',
    ];

    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(BillingEventsCenterTableSelectors.selectBillingEvents))
    );
    loading$ = this.store.select(BillingEventsCenterTableSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private dateFormatePipe: DateFormatPipe,
        private searchService: AuxSearchService,
        private auxUtilService: AuxUtilService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.refresh$.pipe(startWith(null), untilDestroyed(this)).subscribe(() => {
            this.store.dispatch(BillingEventsCenterTableActions.LoadBillingEvents({ filter: 'returns' }));
        });

        this.data$.pipe(untilDestroyed(this)).subscribe(billingevent => {
            this.rowData = billingevent;
        });
    }

    onSelectionChanged(params: CellClickedEvent): void {
        // console.log('Cell clicked:', params);
        const excludedColumns = ['comments', 'patientId'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.returnsAddEdit(params.data);
        }
    }

    ngOnDestroy() {
        this.store.dispatch(BillingEventsCenterTableActions.resetState());
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

    returnsAddEdit(billingevents?: BillingEventsCenterDisplay): void {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: billingevents ? 'EDIT EVENT' : 'ADD EVENT',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: ReturnsAddComponent,
            dynamicComponentData: billingevents ? { billingevents } : null,
            submitFunction: 'saveReturns',
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
        this.returnsAddEdit();
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
