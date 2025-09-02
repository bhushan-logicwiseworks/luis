import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ShortcutsTableSelectors } from 'app/modules/auxilium/shortcut-center/reducer';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { ShortcutDisplay } from 'app/shared/interfaces/auxilium/shortcut-center/shortcut.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { switchMap } from 'rxjs';
import { ShortcutCenterTableActions } from '../../action/shortcut-center-table.action';
import { EditSelectedShortcuteComponentComponent } from '../../components/edit-selected-shortcute-component/edit-selected-shortcute-component.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-shortcut-center-table',
    templateUrl: './shortcut-center-table-component.html',
    styleUrls: ['./shortcut-center-table-component.scss'],
    providers: [DateFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ShortcutCenterTableComponent {
    data$ = this.route.paramMap.pipe(switchMap(paramMap => this.store.select(ShortcutsTableSelectors.selectShortcuts)));

    loading$ = this.store.select(ShortcutsTableSelectors.selectLoading);

    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 75, field: 'id', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'title', minWidth: 250, field: 'title', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'description', minWidth: 260, field: 'description', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'category', minWidth: 223, field: 'category', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'itemId1', minWidth: 110, field: 'itemId1', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'itemId2', minWidth: 110, field: 'itemId2', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'itemId3', minWidth: 110, field: 'itemId3', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'itemId4', minWidth: 110, field: 'itemId4', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'itemId5', minWidth: 110, field: 'itemId5', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'itemId6', minWidth: 110, field: 'itemId6', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'itemId7', minWidth: 110, field: 'itemId7', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'billType1', minWidth: 100, field: 'billType1', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'quantity1', minWidth: 100, field: 'quantity1', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'addedBy', minWidth: 223, field: 'addedBy', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'addedDate',
            minWidth: 160,
            field: 'addedDate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.addedDate),
            hide: false,
            filterParams: filterParams,
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
            hide: false,
        },
    ];

    shortcutListData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    visibleColumns = [
        'id',
        'title',
        'itemId1',
        'itemId2',
        'itemId3',
        'itemId4',
        'itemId5',
        'itemId6',
        'itemId7',
        'actions',
    ];

    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private matDialog: MatDialog,
        private dateFormatePipe: DateFormatPipe,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.store.dispatch(ShortcutCenterTableActions.LoadShortcut());
        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.shortcutListData = data;
        });
    }

    onSelectedEditShortcut(params) {
        if (params.column.colId != 'actions') {
            this.openAddShortcut(params);
        }
    }

    openAddShortcut(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Edit Shortcut',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: EditSelectedShortcuteComponentComponent, // Component you want to load dynamically
            dynamicComponentData: item.api.getSelectedRows()[0] || null,
            submitFunction: 'updateSelectedShortcutsDetails',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '50%',
            height: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                item.api.clearFocusedCell();
                this.store.dispatch(ShortcutCenterTableActions.LoadShortcut());
            });
    }

    deleteRow(params) {
        this.deleteShortcut(params.data);
    }

    deleteShortcut(shortcut: ShortcutDisplay): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete shortcut',
            message: 'Are you sure you want to delete this shortcut? This action cannot be undone!',
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
                    this.store.dispatch(ShortcutCenterTableActions.DeleteShortcut({ shortcut }));
                }
            });
    }
}
