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
import { BillTypeDisplay } from 'app/shared/interfaces/auxilium/billType-center/billType.interface';
import { SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { BillTypesCenterTableActions } from '../../actions/billtype-center-table.actions';
import { BillTypeCenterIndividualFormComponent } from '../../components/billType-center-individual-form/billType-center-individual-form.component';
import { BillTypeCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-billType-center-table',
    templateUrl: './billType-center-table.component.html',
    styleUrls: ['./billType-center-table.component.scss'],
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class BillTypeCenterTableComponent implements OnInit, AfterViewInit {
    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 90, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Bill Type',
            minWidth: 130,
            field: 'billtype',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Title',
            minWidth: 170,
            field: 'title',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Ship Count',
            minWidth: 110,
            field: 'shipcount',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Skip Count',
            minWidth: 110,
            field: 'skipcount',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 110,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Period',
            minWidth: 110,
            field: 'period',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
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
        'billtype',
        'title',
        'shipcount',
        'skipcount',
        'description',
        'period',
        'adddate',
        'adduserid',
        'actions',
    ];

    loading$ = this.store.select(BillTypeCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(BillTypeCenterTableSelectors.selectBillTypeReps))
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
                this.store.dispatch(BillTypesCenterTableActions.LoadBillTypes());
            });
        this.data$.pipe(untilDestroyed(this)).subscribe(salesRep => {
            this.rowData = salesRep;
        });

        this.actions$
            .pipe(ofType(BillTypesCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngAfterViewInit() {}

    openItem(item) {
        this.selection.clear();
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'Save BillType',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: BillTypeCenterIndividualFormComponent,
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
    deleteContact(dto: BillTypeDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete BillType Rep',
            message: 'Are you sure you want to delete this BillType rep? This action cannot be undone!',
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
                    this.store.dispatch(BillTypesCenterTableActions.DeleteBillType({ dto }));
                }
            });
    }

    onSelectionChanged(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }
}
