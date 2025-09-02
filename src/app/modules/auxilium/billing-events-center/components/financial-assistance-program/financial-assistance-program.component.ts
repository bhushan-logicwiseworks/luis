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
import { BillingEventsCenterTableActions } from '../../actions/billing-events-center-table.action';
import { BillingEventsCenterTableSelectors } from '../../reducers';
import { FinancialAssistanceProgramAddComponent } from '../financial-assistance-program-add/financial-assistance-program-add.component';
@UntilDestroy()
@Component({
    selector: 'app-financial-assistance-program',
    templateUrl: './financial-assistance-program.component.html',
    styleUrls: ['./financial-assistance-program.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class FinancialAssistanceProgramComponent implements OnInit, OnDestroy {
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
                this.handleRedirect('financialassistance', { data: { patientid: params.data.patientId } }),
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
            valueFormatter: params => this.dateFormatePipe.transform(params.data.reEvaluationDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 180,
        },
    ];

    visibleColumns = ['id', 'patientId', 'todaysDate', 'owner', 'programType', 'outcome', 'reEvaluationDate'];

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
            this.store.dispatch(BillingEventsCenterTableActions.LoadBillingEvents({ filter: 'financialassistance' }));
        });

        this.data$.pipe(untilDestroyed(this)).subscribe(billingevent => {
            this.rowData = billingevent;
        });
    }

    onSelectionChanged(params: CellClickedEvent): void {
        // console.log('Cell clicked:', params);
        const excludedColumns = ['comments', 'patientId'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.financialAddEdit(params.data);
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

    financialAddEdit(billingevents?: BillingEventsCenterDisplay): void {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: billingevents ? 'EDIT EVENT' : 'ADD EVENT',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: FinancialAssistanceProgramAddComponent,
            dynamicComponentData: billingevents ? { billingevents } : null,
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
        this.financialAddEdit();
    }
}
