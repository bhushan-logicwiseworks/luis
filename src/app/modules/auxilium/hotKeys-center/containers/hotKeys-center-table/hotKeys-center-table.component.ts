import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { HotKeysDisplay } from 'app/shared/interfaces/auxilium/hotKeys-center/hotkeys.interface';
import { SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { HotKeysCenterTableActions } from '../../actions/hotKeys-center-table.actions';
import { HotkeysCenterIndividualFormComponent } from '../../components/hotKeys-center-individual-form/hotKeys-center-individual-form.component';
import { HotKeysCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-hotKeys-center-table',
    templateUrl: './hotKeys-center-table.component.html',
    styleUrls: ['./hotKeys-center-table.component.scss'],
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class HotKeysCenterTableComponent implements OnInit, AfterViewInit {
    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 90, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Key Label',
            minWidth: 130,
            field: 'keylabel',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Command',
            minWidth: 170,
            field: 'command',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Item Id 1',
            minWidth: 110,
            field: 'itemid1',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Item Id 2',
            minWidth: 110,
            field: 'itemid2',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Item Id 3',
            minWidth: 110,
            field: 'itemid3',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Item Id 4',
            minWidth: 110,
            field: 'itemid4',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Item Id 5',
            minWidth: 110,
            field: 'itemid5',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Item Id 6',
            minWidth: 110,
            field: 'itemid6',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'Item Id 7',
            minWidth: 110,
            field: 'itemid7',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Branch ID',
            minWidth: 150,
            field: 'branchid',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'Bill Type 1',
            minWidth: 110,
            field: 'billtype1',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Bill Type 2',
            minWidth: 110,
            field: 'billtype2',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'Bill Type 3',
            minWidth: 110,
            field: 'billtype3',
            filter: 'agMultiColumnFilter',
            sortIndex: 14,
            hide: false,
        },
        {
            headerName: 'Bill Type 4',
            minWidth: 110,
            field: 'billtype4',
            filter: 'agMultiColumnFilter',
            sortIndex: 15,
            hide: false,
        },
        {
            headerName: 'Bill Type 5',
            minWidth: 110,
            field: 'billtype5',
            filter: 'agMultiColumnFilter',
            sortIndex: 16,
            hide: false,
        },
        {
            headerName: 'Bill Type 6',
            minWidth: 110,
            field: 'billtype6',
            filter: 'agMultiColumnFilter',
            sortIndex: 17,
            hide: false,
        },
        {
            headerName: 'Bill Type 7',
            minWidth: 110,
            field: 'billtype7',
            filter: 'agMultiColumnFilter',
            sortIndex: 18,
            hide: false,
        },
        {
            headerName: 'Added Date',
            minWidth: 200,
            field: 'adddate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.adddate),
            filterParams: filterParams,
            sortIndex: 20,
            hide: false,
        },
        {
            headerName: 'Added By',
            minWidth: 125,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            sortIndex: 19,
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
                        name: 'Delete Permanently',
                        action: this.deleteData.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            filter: false,
            sortIndex: 17,
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

    visibleColumns = [
        'keylabel',
        'itemid1',
        'itemid2',
        'itemid3',
        'branchid',
        'billtype1',
        'billtype2',
        'billtype3',
        'adddate',
        'adduserid',
        'actions',
    ];

    loading$ = this.store.select(HotKeysCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(HotKeysCenterTableSelectors.selectHotKeysReps))
    );

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
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
                this.store.dispatch(HotKeysCenterTableActions.LoadHotKeys());
            });
        this.data$.pipe(untilDestroyed(this)).subscribe(salesRep => {
            this.rowData = salesRep;
        });

        this.actions$
            .pipe(ofType(HotKeysCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}

    openItem(item) {
        this.selection.clear();
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE HOTKEYS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: HotkeysCenterIndividualFormComponent,
            dynamicComponentData: item.api.getSelectedRows()[0] || null,
            submitFunction: 'saveContact',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: 0 + 'px',
                    right: 0 + 'px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                this.refresh.next(result);
                item.api.clearFocusedCell();
            });
    }

    deleteData(data) {
        this.deleteContact(data.data);
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: HotKeysDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Hotkeys Rep',
            message: 'Are you sure you want to delete this hotkeys rep? This action cannot be undone!',
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
                    this.store.dispatch(HotKeysCenterTableActions.DeleteHotKey({ dto }));
                }
            });
    }

    onSelectionChanged(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }
}
