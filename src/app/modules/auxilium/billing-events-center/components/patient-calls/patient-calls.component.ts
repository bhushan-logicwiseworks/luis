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
import { PatientCallsAddComponent } from '../patient-calls-add/patient-calls-add.component';
@UntilDestroy()
@Component({
    selector: 'app-patient-calls',
    templateUrl: './patient-calls.component.html',
    styleUrls: ['./patient-calls.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class PatientCallsComponent implements OnInit, OnDestroy {
    patientId: number;
    rowData = [];

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
            onCellClicked: params =>
                this.handleRedirect('patientcalls', { data: { patientid: params.data.patientId } }),
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
            headerName: 'USERNAME',
            field: 'owner',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
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

    visibleColumns = ['id', 'patientId', 'todaysDate', 'claimDateOfService', 'owner', 'comments'];

    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(BillingEventsCenterTableSelectors.selectBillingEvents))
    );
    loading$ = this.store.select(BillingEventsCenterTableSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private dateFormatePipe: DateFormatPipe,
        private searchService: AuxSearchService,
        private auxUtilService: AuxUtilService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.refresh$.pipe(startWith(null), untilDestroyed(this)).subscribe(() => {
            this.store.dispatch(BillingEventsCenterTableActions.LoadBillingEvents({ filter: 'patientcalls' }));
        });

        this.data$.pipe(untilDestroyed(this)).subscribe(billingevent => {
            this.rowData = billingevent;
        });
    }

    onSelectionChanged(params: CellClickedEvent): void {
        // console.log('Cell clicked:', params);
        const excludedColumns = ['comments', 'patientId'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.patientCallsAddEdit(params.data);
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

    patientCallsAddEdit(billingevents?: BillingEventsCenterDisplay): void {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: billingevents ? 'EDIT EVENT' : 'ADD EVENT',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientCallsAddComponent,
            dynamicComponentData: billingevents ? { billingevents } : null,
            submitFunction: 'saveCalls',
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
        this.patientCallsAddEdit();
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
