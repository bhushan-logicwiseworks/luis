import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { WorkOrderCenterIndividualActions } from '../../actions/work-order-center-individual.actions';
import { WorkOrderCenterIndividualSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-batch-eligibility',
    templateUrl: './batch-eligibility.component.html',
    styleUrls: ['./batch-eligibility.component.scss'],
    providers: [DateFormatPipe],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class BatchEligibilityComponent implements OnInit {
    data$ = this.store.select(WorkOrderCenterIndividualSelectors.selectBatchEligibility);
    loading$ = this.store.select(WorkOrderCenterIndividualSelectors.selectLoading);
    rowData = [];

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    selectedRow;
    options = {
        gridOptions: {
            rowSelection: {
                mode: 'multiRow',
                checkboxes: true,
                headerCheckbox: true,
                selectAll: 'filtered',
                checkboxColumn: {
                    width: 100,
                    pinned: 'left',
                    resizable: true,
                    suppressMovable: true,
                    sortable: true,
                    filter: false,
                    lockPosition: true,
                    headerName: '',
                    suppressHeaderMenuButton: false,
                    headerTooltip: 'Checkboxes indicate selection',
                },
            },
            headerHeight: 30,
            rowHeight: 36,
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    selectAll: boolean = false;

    toolbarData: FuseNavigationItem[] = [
        {
            title: 'Check Eligibility',
            type: 'basic',
            icon: 'mat_outline:check_circle',
            function: () => {
                this.checkEligibility();
            },
        },
    ];

    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 80, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'First Name',
            minWidth: 120,
            field: 'firstName',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Last Name',
            minWidth: 120,
            field: 'lastName',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'DOB',
            minWidth: 100,
            field: 'dob',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatPipe.transform(params.data.dob),
            filterParams: filterParams,
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Patient ID',
            minWidth: 100,
            field: 'patientId',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Payor ID',
            minWidth: 100,
            field: 'payorId',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Bill To',
            minWidth: 150,
            field: 'billTo',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Policy',
            minWidth: 120,
            field: 'policy',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Is Eligible',
            minWidth: 120,
            field: 'isEligible',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: {
                field: 'isEligible',
                icons: {
                    true: { icon: 'check_circle', color: 'text-green-500' },
                    false: { icon: 'cancel', color: 'text-red-500' },
                },
            },
            sortIndex: 9,
            hide: false,
        },
    ];

    visibleColumns = [
        'checkedField',
        'id',
        'firstName',
        'lastName',
        'dob',
        'patientId',
        'payorId',
        'billTo',
        'policy',
        'isEligible',
    ];

    selection = new SelectionModel<any>(true, []);

    constructor(
        private store: Store,
        private dateFormatPipe: DateFormatPipe,
        private actions$: Actions,
        private route: ActivatedRoute,
        private auxSearchService: AuxSearchService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.queryParamMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([queryParamMap]) => {
                const startDate = queryParamMap.get('startDate');
                const endDate = queryParamMap.get('endDate');
                if (startDate && endDate) {
                    this.store.dispatch(
                        WorkOrderCenterIndividualActions.GetBatchEligibility({
                            startDate: new Date(startDate),
                            endDate: new Date(endDate),
                        })
                    );
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(eligibility => {
            if (eligibility) {
                this.rowData = [...eligibility]; // Create a new array reference
            }
        });

        this.actions$
            .pipe(ofType(WorkOrderCenterIndividualActions.ProcessBatchEligibilitySuccess), untilDestroyed(this))
            .subscribe(({ eligibility }) => {
                this.selection.clear();

                // Create a map of patientId to isEligible status from API response
                const eligibilityMap = eligibility.reduce((map, item) => {
                    map[item.patientId] = item.isEligible;
                    return map;
                }, {});

                // Update grid data with exact matching of patientIds
                this.rowData = this.rowData.map(row => {
                    if (row.patientId in eligibilityMap) {
                        return {
                            ...row,
                            isEligible: eligibilityMap[row.patientId],
                        };
                    }
                    return row;
                });

                // Force grid refresh
                // this.refresh.next(null);
            });
    }

    onChangeSelection($event) {
        this.selectAll = false;
        this.selection.setSelection(...$event.api.getSelectedRows());
    }

    checkEligibility() {
        if (this.selection.isEmpty()) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please select at least one record',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        const confirmation = this._fuseConfirmationService.open({
            title: 'Check Eligibility',
            message: 'Are you sure you want to process eligibility for the selected records?',
            actions: {
                confirm: { label: 'YES' },
                cancel: { label: 'NO' },
            },
        });

        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result === 'confirmed') {
                    const patientIds = this.selection.selected.map(row => row.patientId);
                    if (patientIds.length && patientIds[0] !== 0) {
                        this.store.dispatch(WorkOrderCenterIndividualActions.ProcessBatchEligibility({ patientIds }));
                    }
                }
            });
    }

    ngOnDestroy() {
        this.auxSearchService.resetFilter.next({ resetGrid: true });
    }
}
