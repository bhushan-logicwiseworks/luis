import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { VendorDisplay } from 'app/shared/interfaces/auxilium/vendor-center/vendor.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { VendorCenterTableActions } from '../../actions/vendor-center-table.actions';
import { VendorCenterIndividualFormComponent } from '../../components/vendor-center-individual-form/vendor-center-individual-form.component';
import { VendorCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-vendor-center-table',
    templateUrl: './vendor-center-table.component.html',
    styleUrls: ['./vendor-center-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateTimeFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class VenderCenterTableComponent implements OnInit, AfterViewInit {
    visibleColumns = ['id', 'vendorcode', 'company', 'email', 'adddate', 'adduserid', 'actions'];

    loading$ = this.store.select(VendorCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(VendorCenterTableSelectors.selectVendors))
    );

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    columnDefs = [
        {
            headerName: 'ID',
            field: 'id',
            hide: false,
            minWidth: 146,
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
        },
        {
            headerName: 'Vendor Code',
            field: 'vendorcode',
            hide: false,
            minWidth: 150,
            sort: 'desc',
            filter: 'agTextColumnFilter',
            sortIndex: 2,
        },
        {
            headerName: 'Company',
            field: 'company',
            hide: false,
            minWidth: 350,
            sort: 'desc',
            filter: 'agTextColumnFilter',
            sortIndex: 3,
        },
        {
            headerName: 'Email',
            field: 'email',
            hide: false,
            minWidth: 250,
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
        },
        {
            headerName: 'Added Date',
            field: 'adddate',
            hide: false,
            minWidth: 175,
            sort: 'desc',
            filter: 'agDateColumnFilter',
            sortIndex: 9,
            valueFormatter: (params: any) => this.dateTimeFormatPipe.transform(params.data.entryDate),
            filterParams: filterParams,
        },
        {
            headerName: 'Added By',
            field: 'adduserid',
            hide: false,
            minWidth: 125,
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
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

    rowData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        @Inject(Actions) private actions$: Actions,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService,
        private dateTimeFormatPipe: DateTimeFormatPipe
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(VendorCenterTableActions.LoadVendors());
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(vendorRep => {
            this.rowData = vendorRep;
        });

        this.actions$
            .pipe(ofType(VendorCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE VENDOR',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: VendorCenterIndividualFormComponent,
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
                item.api.clearFocusedCell();
            });
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: VendorDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Vendor Rep',
            message: 'Are you sure you want to delete this Vendor rep? This action cannot be undone!',
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
                    this.store.dispatch(VendorCenterTableActions.DeleteVendor({ dto }));
                }
            });
    }

    onSelectionChanged(params): void {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }

    deleteRow(params: any): void {
        this.deleteContact(params.data);
    }
}
