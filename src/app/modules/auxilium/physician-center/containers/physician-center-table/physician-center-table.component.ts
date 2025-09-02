import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { PhysicianDisplay } from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PhysicianCenterIndividualActions } from '../../actions/physician-center-individual.actions';
import { PhysicianCenterTableActions } from '../../actions/physician-center-table.actions';
import { PhysicianCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-physician-center-table',
    templateUrl: './physician-center-table.component.html',
    styleUrls: ['./physician-center-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class PhysicianCenterTableComponent implements OnInit, AfterViewInit, OnDestroy {
    rowData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 75, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'PHYKEY',
            minWidth: 123,
            field: 'phykey',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        { headerName: 'NPI', minWidth: 123, field: 'npi', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Last Name',
            minWidth: 150,
            field: 'lastName',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'First Name',
            minWidth: 150,
            field: 'firstName',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Address 1',
            minWidth: 123,
            field: 'address1',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Address 2',
            minWidth: 123,
            field: 'address2',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        { headerName: 'City', minWidth: 123, field: 'city', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'State',
            minWidth: 123,
            field: 'state',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        { headerName: 'Zip', minWidth: 123, field: 'zip', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Active',
            minWidth: 123,
            field: 'isActive',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            cellRenderer: null,
            valueFormatter: params => `${params.value}`,
        },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.phone),
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Fax',
            minWidth: 150,
            field: 'fax',
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.fax),
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Email',
            minWidth: 123,
            field: 'email',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Taxonomy',
            minWidth: 123,
            field: 'taxonomy',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'State ID',
            minWidth: 135,
            field: 'stateid',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Branch ID',
            minWidth: 123,
            field: 'branchid',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Branch Name',
            minWidth: 123,
            field: 'branchName',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Added Date',
            minWidth: 170,
            field: 'addDate',
            valueFormatter: (params: any) => this.dateTimeFormatPipe.transform(params.data.addDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Added By',
            minWidth: 123,
            field: 'addUserId',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Actions',
            minWidth: 75,
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

    visibleColumns = [
        'id',
        'phykey',
        'npi',
        'lastName',
        'firstName',
        'phone',
        'fax',
        'state',
        'taxonomy',
        'stateid',
        'addDate',
        'actions',
    ];

    loading$ = this.store.select(PhysicianCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(PhysicianCenterTableSelectors.selectPhysicians))
    );

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private dialog: MatDialog,
        private dateTimeFormatPipe: DateTimeFormatPipe,
        private phoneNumberPipe: PhoneNumberPipe,
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router
    ) {}
    selection = new SelectionModel<PhysicianDisplay>(true, []);

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'active':
                        this.store.dispatch(PhysicianCenterTableActions.LoadPhysicians({ filter: 'ACTIVE' }));
                        break;

                    case 'inactive':
                        this.store.dispatch(PhysicianCenterTableActions.LoadPhysicians({ filter: 'INACTIVE' }));
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(physician => {
            this.rowData = physician;
        });

        this.actions$
            .pipe(ofType(PhysicianCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}
    ngOnDestroy(): void {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(PhysicianCenterTableActions.ResetState());
    }

    onSelectionChanged(params) {
        const excludedColumns = ['actions', 'phone'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.openItem(params.api.getSelectedRows()[0]);
        }
    }

    openItem(item: PhysicianDisplay) {
        this.router.navigateByUrl(`/centers/physician-center/${item.id}/demographics`);

        // this.store.dispatch(PhysicianCenterTableActions.LoadTaxonomy());
        // this.selection.clear();
        // this.dialog.open(PhysicianCenterIndividualComponent, {
        //     data: item || null,
        //     width: '800px',
        //     maxWidth: '100%',
        //     panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
        //     position: {
        //         top: 0 + 'px',
        //         right: 0 + 'px',
        //     },
        //     height: '100vh'
        // }).beforeClosed().pipe(
        //     untilDestroyed(this)
        // ).subscribe((value) => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }
    /**
     * Delete the contact
     */
    deleteContact(item): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete physician',
            message: 'Are you sure you want to delete this physician? This action cannot be undone!',
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
                    // Get the current contact's id
                    const phy = {
                        id: item.id,
                    };

                    // Delete the contact
                    this.store.dispatch(PhysicianCenterIndividualActions.DeletePhysician({ phy }));
                }
            });
    }
}
