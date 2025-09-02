import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { LicenseInfo } from 'app/shared/interfaces/auxilium/license-center/license-info-interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LicenseCenterTableActions } from '../../actions/license-center-table.actions';
import { LicenseCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-license-center-table',
    templateUrl: './license-center-table.component.html',
    styleUrls: ['./license-center-table.component.scss'],
    providers: [PhoneNumberPipe, DateTimeFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class LicenseCenterTableComponent implements OnInit, OnDestroy {
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', minWidth: 75, filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'State', sort: 'asc', minWidth: 101, field: 'state', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'Category', minWidth: 300, field: 'category', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'License',
            minWidth: 100,
            field: 'isLicenseRequired',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'isLicenseRequired' },
            hide: false,
        },
        { headerName: 'Branch Id', minWidth: 101, field: 'branchId', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'License Number',
            minWidth: 101,
            field: 'licenseNumber',
            filter: 'agMultiColumnFilter',
            hide: false,
        },
        {
            headerName: 'Start Date',
            minWidth: 101,
            field: 'statrtDate',
            filter: 'agMultiColumnFilter',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.statrtDate),
            hide: false,
        },
        {
            headerName: 'Expiration Date',
            minWidth: 101,
            field: 'expirationDate',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.expirationDate),
            filter: 'agMultiColumnFilter',
            hide: false,
        },
        { headerName: 'Added By', minWidth: 85, field: 'addedBy', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'Added Date',
            minWidth: 150,
            field: 'addedDate',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.addedDate),
            filter: 'agMultiColumnFilter',
            hide: false,
        },
        {
            headerName: 'Modified By',
            minWidth: 70,
            field: 'modifiedBy',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.modifiedBy),
            filter: 'agMultiColumnFilter',
            hide: false,
        },
        {
            headerName: 'Modified Date',
            minWidth: 101,
            field: 'modifiedDate',
            valueFormatter: params => this.dateTimeFormate.transform(params.data.modifiedDate),
            filter: 'agMultiColumnFilter',
            hide: false,
        },
        {
            headerName: 'Actions',
            minWidth: 101,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Delete Permanently',
                        action: this.deleteRow.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            filter: false,
            sortIndex: 13,
            hide: false,
            sortable: false,
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
        'state',
        'category',
        'isLicenseRequired',
        'branchId',
        'licenseNumber',
        'statrtDate',
        'expirationDate',
        'addedBy',
        'addedDate',
        'actions',
    ];

    loading$ = this.store.select(LicenseCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(switchMap(paramMap => this.store.select(LicenseCenterTableSelectors.selectAll)));

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private actions$: Actions,
        private dateTimeFormate: DateTimeFormatPipe,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'all':
                        this.store.dispatch(LicenseCenterTableActions.LoadBranchDropDown());
                        this.store.dispatch(LicenseCenterTableActions.LoadLicenses({ filter: 'getall' }));
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(referrals => {
            this.rowData$.next(referrals);
        });

        this.actions$
            .pipe(ofType(LicenseCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }

    ngOnDestroy() {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(LicenseCenterTableActions.ResetState());
    }

    openItem(item) {
        this.router.navigateByUrl(`/company/license-center/${item.api.getSelectedRows()[0].id}/license-details`);
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: LicenseInfo): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete License',
            message: 'Are you sure you want to delete this license? This action cannot be undone!',
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
                if (result === 'confirmed') {
                    this.store.dispatch(LicenseCenterTableActions.DeleteLicense({ dto }));
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
