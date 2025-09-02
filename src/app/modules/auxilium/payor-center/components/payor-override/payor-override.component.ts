import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { PayorOverride } from 'app/shared/interfaces/auxilium/payor-center/payor-override.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { PayorCenterTableActions } from '../../actions/payor-center-table.actions';
import { PayorCenterTableSelectors } from '../../reducers';

import { AsyncPipe } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PayorCenterAddOverrideComponent } from '../payor-center-add-override/payor-center-add-override.component';

@UntilDestroy()
@Component({
    selector: 'app-payor-override',
    templateUrl: './payor-override.component.html',
    styleUrl: './payor-override.component.scss',
    animations: fuseAnimations,
    providers: [DateTimeFormatPipe],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PayorOverrideComponent {
    data$ = this.store.select(PayorCenterTableSelectors.selectPayorOverrides);
    loading$ = this.store.select(PayorCenterTableSelectors.selectLoading);
    rowData: PayorOverride[] = [];

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    options = {
        gridOptions: {
            rowSelection: 'multiple',
            rowMultiSelectWithClick: true,
            headerHeight: 36,
            rowHeight: 40,
            suppressRowClickSelection: true,
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    toolbarData: FuseNavigationItem[] = [
        {
            title: 'Add Payor Override',
            type: 'basic',
            icon: 'heroicons_outline:plus-circle',
            function: () => {
                this.addPayorOverride();
            },
        },
    ];

    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 50, field: 'id', hide: false },
        {
            headerName: 'Payor ID',
            minWidth: 85,
            field: 'payorId',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Bill To',
            minWidth: 100,
            field: 'billto',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Item ID',
            minWidth: 75,
            field: 'itemId',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Item Code',
            minWidth: 110,
            field: 'itemCode',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 250,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'T',
            minWidth: 45,
            field: 'billType',
            hide: false,
        },
        {
            headerName: 'C',
            minWidth: 45,
            field: 'confirm',
            hide: false,
        },
        {
            headerName: 'Q',
            minWidth: 50,
            field: 'quantity',
            hide: false,
        },
        { headerName: 'HCPC', minWidth: 90, field: 'hcpc', filter: 'agMultiColumnFilter', sortIndex: 10, hide: false },
        {
            headerName: 'Submitted',
            minWidth: 95,
            field: 'submitted',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'Allowed',
            minWidth: 90,
            field: 'allowed',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Due Primary',
            minWidth: 100,
            field: 'duePrimary',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Created Date',
            minWidth: 120,
            field: 'createdDate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.createdDate),
            filterParams: filterParams,
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'Created By',
            minWidth: 120,
            field: 'createdBy',
            filter: 'agMultiColumnFilter',
            sortIndex: 14,
            hide: false,
        },
        {
            headerName: 'Modified Date',
            minWidth: 120,
            field: 'modifiedDate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.modifiedDate),
            filterParams: filterParams,
            sortIndex: 15,
            hide: false,
        },
        {
            headerName: 'Modified By',
            minWidth: 120,
            field: 'modifiedBy',
            filter: 'agMultiColumnFilter',
            sortIndex: 16,
            hide: false,
        },
        {
            headerName: 'Actions',
            minWidth: 80,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Remove Record',
                        action: this.delete.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            hide: false,
        },
    ];

    visibleColumns = [
        'id',
        'payorId',
        'billto',
        'itemId',
        'itemCode',
        'description',
        'billType',
        'confirm',
        'quantity',
        'hcpc',
        'submitted',
        'allowed',
        'duePrimary',
        'actions',
    ];

    selection = new SelectionModel<any>(true, []);

    constructor(
        private store: Store,
        private dateTime: DateTimeFormatPipe,
        private actions$: Actions,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private auxSearchService: AuxSearchService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.store.dispatch(PayorCenterTableActions.LoadPayorOverrides({ filter: 'all' }));
    }

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(PayorCenterTableActions.LoadPayorOverrides({ filter: 'all' }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(payorOverrides => {
            if (payorOverrides?.length) {
                this.rowData = payorOverrides;
            }
        });

        this.actions$
            .pipe(ofType(PayorCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(values => this.refresh.next(values));
    }

    onSelectionChanged(params: CellClickedEvent): void {
        const excludedColumns = ['checkedField', 'actions'];
        if (!excludedColumns.includes(params.column.getColId())) {
            this.openEditPayorOverride(params.data);
        }
    }

    addPayorOverride() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'ADD PAYOR OVERRIDE',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PayorCenterAddOverrideComponent,
            dynamicComponentData: { payorOverride: null },
            submitFunction: 'save',
            enterKeyEnabled: true,
        };
        this._matDialog
            .open(AuxPopupComponent, {
                width: '800px',
                height: 'auto',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result?.success) {
                    this.store.dispatch(PayorCenterTableActions.LoadPayorOverrides({ filter: 'all' }));
                }
            });
    }

    openEditPayorOverride(payorOverride: PayorOverride) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            iconColor: 'primary',
            title: 'EDIT PAYOR OVERRIDE',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PayorCenterAddOverrideComponent,
            dynamicComponentData: { payorOverride },
            submitFunction: 'save',
            enterKeyEnabled: true,
        };
        this._matDialog
            .open(AuxPopupComponent, {
                width: '800px',
                height: 'auto',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result?.success) {
                    this.store.dispatch(PayorCenterTableActions.LoadPayorOverrides({ filter: 'all' }));
                }
            });
    }

    delete(delData: any) {
        this.deleteRecord(delData.data);
    }

    deleteRecord(dto: PayorOverride): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Remove Payor override Record',
            message: 'Are you sure you want to remove this record? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result === 'confirmed') {
                    this.store.dispatch(PayorCenterTableActions.DeletePayorOverride({ payorOverride: dto }));
                }
            });
    }

    onChangeSelection($event) {
        this.selection.setSelection(...$event.api.getSelectedRows());
    }

    ngOnDestroy() {
        this.auxSearchService.resetFilter.next({ resetGrid: true });
    }
}
