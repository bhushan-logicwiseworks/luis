import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { PhysicianDisplay } from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ValidationCenterIndividualActions } from '../../actions/validation-center-individual.actions';
import { ValidationCenterTableActions } from '../../actions/validation-center-table.actions';
import { ValidationCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-validation-center-table',
    templateUrl: './validation-center-table.component.html',
    styleUrls: ['./validation-center-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ValidationCenterTableComponent implements OnInit, AfterViewInit, OnDestroy {
    rowData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        { headerName: 'id', minWidth: 75, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Entity',
            minWidth: 123,
            field: 'entity',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Title',
            minWidth: 123,
            field: 'title',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Fail Code',
            minWidth: 150,
            field: 'failcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Fail Message',
            minWidth: 150,
            field: 'failmessage',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Added Date',
            minWidth: 170,
            field: 'adddate',
            valueFormatter: (params: any) => this.dateTimeFormatPipe.transform(params.data.addDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Bypass For Payors',
            minWidth: 150,
            field: 'bypassforpayors',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Execute For Payors',
            minWidth: 150,
            field: 'executeforpayors',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        { headerName: 'Note', minWidth: 500, field: 'notes', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Add User Id',
            minWidth: 123,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Active',
            minWidth: 123,
            field: 'isActive',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Columns',
            minWidth: 123,
            field: 'columns',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Severity',
            minWidth: 123,
            field: 'severity',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Validate For Mode',
            minWidth: 150,
            field: 'validateformode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Bill Forms To Skip',
            minWidth: 150,
            field: 'billformstoskip',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Actions',
            minWidth: 150,
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

    visibleColumns = ['id', 'entity', 'title', 'failcode', 'adddate', 'notes', 'severity', 'actions'];

    loading$ = this.store.select(ValidationCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(ValidationCenterTableSelectors.selectValidations))
    );

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        @Inject(Actions) private actions$: Actions,
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
                this.store.dispatch(ValidationCenterTableActions.LoadValidations());
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(physician => {
            this.rowData = physician;
        });

        this.actions$
            .pipe(ofType(ValidationCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}
    ngOnDestroy(): void {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(ValidationCenterTableActions.ResetState());
    }

    onSelectionChanged(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params.api.getSelectedRows()[0]);
        }
    }

    openItem(item: PhysicianDisplay) {
        this.router.navigateByUrl(`/centers/validation-center/${item.id}/validation-details`);
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
            title: 'Delete validation',
            message: 'Are you sure you want to delete this validation? This action cannot be undone!',
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
                    this.store.dispatch(ValidationCenterIndividualActions.DeleteValidation({ phy }));
                }
            });
    }
}
