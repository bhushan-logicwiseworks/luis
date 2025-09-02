import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { InventoryProductItem } from 'app/shared/interfaces/auxilium/inventory-center/product.interface';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { InventoryCenterTableActions } from '../../actions/inventory-center-table.actions';
import { InventoryCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-inventory-center-table',
    templateUrl: './inventory-center-table.component.html',
    styleUrls: ['./inventory-center-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class InventoryCenterTableComponent implements OnInit, AfterViewInit {
    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 90, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Item Code',
            minWidth: 150,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'NDC Number',
            minWidth: 150,
            field: 'alternatecode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 500,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Description2',
            minWidth: 500,
            field: 'description2',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Added by ',
            minWidth: 200,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Actions',
            minWidth: 100,
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
            sortIndex: 5,
            hide: false,
            sortable: false,
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

    visibleColumns = ['id', 'itemcode', 'alternatecode', 'description', 'description2', 'adduserid', 'actions'];

    loading$ = this.store.select(InventoryCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(InventoryCenterTableSelectors.selectInventory))
    );

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'active':
                        this.store.dispatch(InventoryCenterTableActions.LoadInventory({ filter: 'active' }));
                        break;

                    case 'inactive':
                        this.store.dispatch(InventoryCenterTableActions.LoadInventory({ filter: 'inactive' }));
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(inventory => {
            this.rowData = inventory;
        });

        this.actions$
            .pipe(ofType(InventoryCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}

    onSelectionChanged(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params.api.getSelectedRows()[0]);
        }
    }

    openItem(item: InventoryProductItem) {
        this.router.navigateByUrl(`/centers/inventory-center/${item.id}/details`);
    }

    deleteRow(params) {
        this.deleteInventory(params.data);
    }

    /**
     ** Delete the Inventory
     */
    deleteInventory(dto: InventoryProductItem): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Inventory',
            message: 'Are you sure you want to delete this Inventory? This action cannot be undone!',
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
                    this.store.dispatch(InventoryCenterTableActions.DeleteInventory({ dto }));
                }
            });
    }
}
