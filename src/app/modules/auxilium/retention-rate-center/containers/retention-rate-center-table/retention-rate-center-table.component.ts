import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { RetentionRate } from 'app/shared/interfaces/auxilium/retention-rate-center/retention-rate.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { RetentionRateTableActions } from '../../actions/retention-rate-table.actions';
import { RetentionRateCenterComponent } from '../../components/retention-rate-center/retention-rate-center.component';
import { RetentionRateTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-retention-rate-center-table',
    templateUrl: './retention-rate-center-table.component.html',
    styleUrls: ['./retention-rate-center-table.component.scss'],
    providers: [DateTimeFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class RetentionRateCenterTableComponent implements OnInit {
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', width: 150, filter: 'agMultiColumnFilter' },
        { headerName: 'Year', field: 'year', width: 280, filter: 'agMultiColumnFilter' },
        { headerName: 'Month', field: 'month', width: 280, filter: 'agMultiColumnFilter' },
        { headerName: 'Initial', field: 'initial', width: 280, filter: 'agMultiColumnFilter' },
        { headerName: 'New', field: 'new', width: 280, filter: 'agMultiColumnFilter' },
        { headerName: 'Total', field: 'total', width: 280, filter: 'agMultiColumnFilter' },
        {
            headerName: 'Created Date',
            field: 'createdDate',
            width: 280,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormat.transform(params.data.createdDate),
        },
        { headerName: 'Created By', field: 'createdBy', width: 280, filter: 'agMultiColumnFilter' },
        { headerName: 'Modified By', field: 'modifiedBy', width: 280, filter: 'agMultiColumnFilter' },
        {
            headerName: 'Modified Date',
            field: 'modifiedDate',
            width: 280,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormat.transform(params.data.modifiedDate),
        },
        {
            headerName: 'Actions',
            width: 100,
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
            sortIndex: 10,
            hide: false,
            sortable: false,
        },
    ];

    paginatorOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    visibleColumns = ['year', 'month', 'initial', 'modifiedBy', 'modifiedDate', 'new', 'total', 'actions'];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    loading$ = this.store.select(RetentionRateTableSelectors.selectLoading);
    data$ = this.store.select(RetentionRateTableSelectors.selectRetentions);

    rowData = [];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private actions$: Actions,
        private dialog: MatDialog,
        private dateTimeFormat: DateTimeFormatPipe,
        private _fuseConfirmationService: FuseConfirmationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.store.dispatch(RetentionRateTableActions.LoadRetentions());
            });
        this.data$.pipe(untilDestroyed(this)).subscribe(access => {
            this.rowData = access;
        });

        this.actions$
            .pipe(ofType(RetentionRateTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngOnDestroy(): void {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(RetentionRateTableActions.ResetState());
    }

    deleteRow(params) {
        this.deleteRetentionRate(params.data);
    }

    openItem(item) {
        const modalRef = this.dialog.open(RetentionRateCenterComponent, {
            data: item.api.getSelectedRows()[0] || null,
            width: '800px',
            maxWidth: '100%',
            panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
            position: {
                top: 0 + 'px',
                right: 0 + 'px',
            },
            height: '100vh',
        });
        modalRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                item.api.clearFocusedCell();
            });
    }

    /**
     * Delete the RetentionRate
     */
    deleteRetentionRate(retentionRate: RetentionRate): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Retention',
            message: 'Are you sure you want to delete this Retention Rate? This action cannot be undone!',
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
                    // Delete the Retention
                    this.store.dispatch(RetentionRateTableActions.DeleteRetentions({ retentionRate }));
                }
            });
    }

    rowSelectionChange(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }
}
