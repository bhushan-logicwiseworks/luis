import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { SourceChipComponent } from 'app/shared/components/auxilium/aux-source-chip/aux-source-chip.component';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { ReferralDisplay } from 'app/shared/interfaces/auxilium/referral-center/referral.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ReferralCenterTableActions } from '../../actions/referral-center-table.actions';
import { ReferralCenterTableSelectors } from '../../reducers';

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'ac-referral-center-table',
    templateUrl: './referral-center-table.component.html',
    styleUrls: ['./referral-center-table.component.scss'],
    providers: [PhoneNumberPipe, DateTimeFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ReferralCenterTableComponent implements OnInit, OnDestroy {
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', minWidth: 65, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Company', minWidth: 250, field: 'company', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Last Name', minWidth: 101, field: 'lastName', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'First Name', minWidth: 101, field: 'firstName', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Address', minWidth: 101, field: 'address', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Address 2', minWidth: 101, field: 'address2', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'City', minWidth: 101, field: 'city', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'State', minWidth: 70, field: 'state', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Zip', minWidth: 70, field: 'zip', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            filter: 'agMultiColumnFilter',
            hide: false,
            valueFormatter: params => this.phoneNumber.transform(params.data.phone),
        },
        {
            headerName: 'Fax',
            minWidth: 150,
            field: 'fax',
            filter: 'agMultiColumnFilter',
            hide: false,
            valueFormatter: params => this.phoneNumber.transform(params.data.fax),
        },
        {
            headerName: 'Cell',
            minWidth: 110,
            field: 'cell',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'cell' },
            filter: 'agMultiColumnFilter',
            hide: false,
            valueFormatter: params => this.phoneNumber.transform(params.data.cell),
        },
        { headerName: 'Email', minWidth: 150, field: 'email', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'SalesID', minWidth: 80, field: 'salesId', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Rep First Name',
            minWidth: 101,
            field: 'salesRepFirstName',
            filter: 'agMultiColumnFilter',
            hide: false,
        },
        {
            headerName: 'Rep Last Name',
            minWidth: 125,
            field: 'salesRepLastName',
            filter: 'agMultiColumnFilter',
            hide: false,
        },
        { headerName: 'Status', minWidth: 75, field: 'status', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Category',
            minWidth: 120,
            field: 'territory',
            cellRenderer: SourceChipComponent,
            cellRendererParams: params => {
                return {
                    category: params.data.territory,
                };
            },
            sortIndex: 14,
            filter: 'agMultiColumnFilter',
            filterParams: {
                filters: [
                    {
                        filter: 'agTextColumnFilter',
                    },
                    {
                        filter: 'agSetColumnFilter',
                        filterParams: {
                            cellRenderer: SourceChipComponent,
                        },
                    },
                ],
            },
            hide: false,
        },
        { headerName: 'NPI', minWidth: 101, field: 'npi', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Link ID', minWidth: 101, field: 'taxId', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Added Date',
            minWidth: 101,
            field: 'addDate',
            filter: 'agDateColumnFilter',
            hide: false,
            valueFormatter: params => this.dateTimeFormate.transform(params.data.addDate),
        },
    ];

    rowData$ = new BehaviorSubject<any>([]);

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    visibleColumns = [
        'id',
        'company',
        'lastName',
        'firstName',
        'state',
        'zip',
        'salesId',
        'salesRepLastName',
        'territory',
        'status',
        'phone',
        'npi',
    ];

    loading$ = this.store.select(ReferralCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(switchMap(paramMap => this.store.select(ReferralCenterTableSelectors.selectAll)));

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private phoneNumber: PhoneNumberPipe,
        private dateTimeFormate: DateTimeFormatPipe,
        private actions$: Actions,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'all':
                        this.store.dispatch(ReferralCenterTableActions.LoadReferrals({ filter: 'ALL' }));
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(referrals => {
            this.rowData$.next(referrals);
        });

        this.actions$
            .pipe(ofType(ReferralCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }

    ngOnDestroy() {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(ReferralCenterTableActions.ResetState());
    }

    openItem(item) {
        this.router.navigateByUrl(`/centers/referral-center/${item.api.getSelectedRows()[0].id}/demographics`);
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: ReferralDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Referral',
            message: 'Are you sure you want to delete this referral? This action cannot be undone!',
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
                    this.store.dispatch(ReferralCenterTableActions.DeleteReferral({ dto }));
                }
            });
    }
    selectionChange(params) {
        const excludedColumns = ['actions', 'phone'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.openItem(params);
        }
    }
}
