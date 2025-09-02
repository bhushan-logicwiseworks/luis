import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { ItemDisplay } from 'app/shared/interfaces/auxilium/price-center/item.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith, switchMap } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PriceCenterTableActions } from '../../actions/price-center-table.actions';
import { ItemPriceListComponent } from '../../components/item-price-list/item-price-list.component';
import { PriceCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-price-center-table',
    templateUrl: './price-center-table.component.html',
    styleUrls: ['./price-center-table.component.scss'],
    providers: [DateTimeFormatPipe],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class PriceCenterTableComponent {
    rowData: ItemDisplay[] = [];
    toolbarData: FuseNavigationItem[];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        {
            headerName: 'Item Code',
            minWidth: 75,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Alternate Code',
            minWidth: 123,
            field: 'alternatecode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Branch',
            minWidth: 123,
            field: 'branchcode',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 150,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Description2',
            minWidth: 150,
            field: 'descriptioN2',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Category',
            minWidth: 123,
            field: 'itemcategory',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Status',
            minWidth: 123,
            field: 'itemstatus',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Hcpcs',
            minWidth: 123,
            field: 'hcpcscode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Mfg Part No',
            minWidth: 123,
            field: 'manufacturerpartno',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
    ];

    visibleColumns = [
        'itemcode',
        'alternatecode',
        'branchcode',
        'description',
        'descriptioN2',
        'itemcategory',
        'itemstatus',
        'hcpcscode',
        'manufacturerpartno',
    ];

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(PriceCenterTableSelectors.selectSearchItem))
    );
    loading$ = this.store.select(PriceCenterTableSelectors.selectLoading);
    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private actions$: Actions,
        private dateTime: DateTimeFormatPipe,
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([params, refresh]) => {
                const filterSlug = this.route.snapshot.routeConfig.path;
                this.store.dispatch(PriceCenterTableActions.LoadItem({ filter: filterSlug }));
            });
        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data) {
                this.rowData = data;
            }
        });

        this.actions$
            .pipe(ofType(PriceCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    onRowSelection(param) {
        this.showPriceListAction(param);
    }

    showPriceListAction(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Item Price List',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: ItemPriceListComponent, // Component you want to load dynamically
            dynamicComponentData: item.api.getSelectedRows()[0],
            submitFunction: '',
            enterKeyEnabled: true,
        };
        const dialogRef = this.dialog.open(AuxPopupComponent, {
            width: '60%',
            minHeight: 'auto',
            data: popupData,
        });
    }
}
