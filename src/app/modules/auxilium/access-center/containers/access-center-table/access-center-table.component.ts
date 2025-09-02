import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { SourceChipComponent } from 'app/shared/components/auxilium/aux-source-chip/aux-source-chip.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { AccessDisplay } from 'app/shared/interfaces/auxilium/access-center/access.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AccessCenterTableActions } from '../../actions/access-center-table.actions';
import { AccessCenterIndividualFormComponent } from '../../components/access-center-individual-form/access-center-individual-form.component';
import { AccessCenterTableSelectors } from '../../reducers';

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'ac-access-center-table',
    templateUrl: './access-center-table.component.html',
    styleUrls: ['./access-center-table.component.scss'],
    providers: [DateTimeFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class AccessCenterTableComponent implements OnInit, AfterViewInit, OnDestroy {
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', filter: 'agMultiColumnFilter', minWidth: 90 },
        {
            headerName: 'App',
            field: 'appName',
            cellRenderer: SourceChipComponent,
            filter: 'agMultiColumnFilter',
            minWidth: 185,
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
        },
        { headerName: 'Email', field: 'email', filter: 'agMultiColumnFilter', minWidth: 250 },
        { headerName: 'Key', field: 'key', filter: 'agMultiColumnFilter', minWidth: 120 },
        { headerName: 'Value', field: 'value', filter: 'agMultiColumnFilter', minWidth: 120 },
        {
            headerName: 'Active',
            field: 'isActive',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'active' },
            filter: 'agMultiColumnFilter',
            minWidth: 100,
        },
        {
            headerName: 'Deleted',
            field: 'isDeleted',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'isDeleted' },
            filter: 'agMultiColumnFilter',
            minWidth: 110,
        },
        { headerName: 'Level', field: 'accessLevel', filter: 'agMultiColumnFilter', minWidth: 80 },
        { headerName: 'Created By', field: 'createdBy', filter: 'agMultiColumnFilter', minWidth: 100 },
        {
            headerName: 'Created Date',
            field: 'createdDate',
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormat.transform(params.data.createdDate),
            filterParams: filterParams,
            minWidth: 150,
        },
        { headerName: 'Modified By', field: 'modifiedBy', filter: 'agMultiColumnFilter', minWidth: 130 },
        {
            headerName: 'Modified Date',
            field: 'modifiedDate',
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormat.transform(params.data.modifiedDate),
            filterParams: filterParams,
            minWidth: 175,
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
            sortIndex: 10,
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
        'appName',
        'email',
        'key',
        'value',
        'isActive',
        'accessLevel',
        'createdBy',
        'createdDate',
        'actions',
    ];

    paginatorOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    loading$ = this.store.select(AccessCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(switchMap(paramMap => this.store.select(AccessCenterTableSelectors.selectUsers)));

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private dialog: MatDialog,
        private dateTimeFormat: DateTimeFormatPipe,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'active':
                        this.store.dispatch(AccessCenterTableActions.LoadAccessList({ filter: 'ACTIVE' }));
                        this.visibleColumns = [
                            'appName',
                            'email',
                            'key',
                            'value',
                            'isActive',
                            'accessLevel',
                            'createdBy',
                            'createdDate',
                            'actions',
                        ];
                        break;

                    case 'inactive':
                        this.store.dispatch(AccessCenterTableActions.LoadAccessList({ filter: 'INACTIVE' }));
                        this.visibleColumns = [
                            'appName',
                            'email',
                            'key',
                            'value',
                            'isActive',
                            'accessLevel',
                            'modifiedBy',
                            'modifiedDate',
                            'actions',
                        ];
                        break;

                    default:
                        this.store.dispatch(AccessCenterTableActions.LoadAccessList({ filter: filterSlug }));
                        this.visibleColumns = [
                            'appName',
                            'email',
                            'key',
                            'value',
                            'isDeleted',
                            'accessLevel',
                            'modifiedBy',
                            'modifiedDate',
                            'actions',
                        ];
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(access => {
            this.rowData = access;
        });

        this.actions$.pipe(ofType(AccessCenterTableActions.Refresh), untilDestroyed(this)).subscribe(value => {
            this.refresh.next(value);
        });
    }

    deleteRow(params: any) {
        this.deleteContact(params.data);
    }

    ngOnDestroy(): void {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(AccessCenterTableActions.ResetState());
    }

    ngAfterViewInit() {}

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE ACCESS',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: AccessCenterIndividualFormComponent,
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
            .subscribe(res => {});
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: AccessDisplay) {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Permanently',
            message: 'Are you sure you want to delete this access? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe(result => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Delete the contact
                this.store.dispatch(AccessCenterTableActions.DeleteAccess({ dto }));
            }
        });
    }

    selectedRowChange(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }
}
