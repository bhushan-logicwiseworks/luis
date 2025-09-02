import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { SalesCenterTableActions } from '../../actions/sales-center-table.actions';
import { SalesCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-sales-center-table',
    templateUrl: './sales-center-table.component.html',
    styleUrls: ['./sales-center-table.component.scss'],
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class SalesCenterTableComponent implements OnInit, AfterViewInit {
    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 65, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Sales Code',
            minWidth: 120,
            field: 'salescode',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Last Name',
            minWidth: 170,
            field: 'lastname',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'First Name',
            minWidth: 170,
            field: 'firstname',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Address 2',
            minWidth: 200,
            field: 'address2',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        { headerName: 'City', minWidth: 150, field: 'city', filter: 'agMultiColumnFilter', sortIndex: 6, hide: false },
        { headerName: 'State', minWidth: 70, field: 'state', filter: 'agMultiColumnFilter', sortIndex: 7, hide: false },
        { headerName: 'Zip', minWidth: 75, field: 'zip', filter: 'agMultiColumnFilter', sortIndex: 8, hide: false },
        {
            headerName: 'Cell',
            minWidth: 150,
            field: 'cell',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'cell' },
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
            valueFormatter: params => this.phonenumber.transform(params.data.cell),
        },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
            valueFormatter: params => this.phonenumber.transform(params.data.phone),
        },
        {
            headerName: 'Fax',
            minWidth: 150,
            field: 'fax',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
            valueFormatter: params => this.phonenumber.transform(params.data.fax),
        },
        {
            headerName: 'Email',
            minWidth: 325,
            field: 'email',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Branch ID',
            minWidth: 200,
            field: 'branchid',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'Branch Name',
            minWidth: 200,
            field: 'branchName',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'Territory',
            minWidth: 130,
            field: 'territory',
            filter: 'agMultiColumnFilter',
            sortIndex: 14,
            hide: false,
        },
        {
            headerName: 'Added Date',
            minWidth: 200,
            field: 'adddate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.adddate),
            filterParams: filterParams,
            sortIndex: 15,
            hide: false,
        },
        {
            headerName: 'Added By',
            minWidth: 125,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            sortIndex: 16,
            hide: false,
        },
    ];

    rowData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    visibleColumns = ['id', 'lastname', 'firstname', 'city', 'state', 'cell', 'email', 'adduserid'];

    loading$ = this.store.select(SalesCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(SalesCenterTableSelectors.selectSalesReps))
    );

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private router: Router,
        private dateTime: DateTimeFormatPipe,
        private phonenumber: PhoneNumberPipe,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}
    selection = new SelectionModel<SalesRepDisplay>(true, []);

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                // this.store.dispatch(SalesCenterIndividualActions.LoadBranchDropDown());
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'active':
                        this.store.dispatch(SalesCenterTableActions.LoadSalesReps({ filter: 'ACTIVE' }));
                        break;

                    case 'inactive':
                        this.store.dispatch(SalesCenterTableActions.LoadSalesReps({ filter: 'INACTIVE' }));
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(salesRep => {
            this.rowData = salesRep;
        });

        this.actions$
            .pipe(ofType(SalesCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}

    openItem(item) {
        this.router.navigateByUrl(`/centers/sales-center/${item.api.getSelectedRows()[0].id}/demographics`);
    }

    deleteData(data) {
        this.deleteContact(data.data);
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: SalesRepDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Sales Rep',
            message: 'Are you sure you want to delete this sales rep? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                    // Delete the contact
                    this.store.dispatch(SalesCenterTableActions.DeleteSalesRep({ dto }));
                }
            });
    }
    onSelectionChanged(params) {
        const excludedColumns = ['actions', 'cell'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.openItem(params);
        }
    }
}
