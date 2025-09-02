import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-enterprise';
import { combineLatest, startWith, Subject } from 'rxjs';
import { FuseHorizontalNavigationComponent, FuseNavigationItem } from '../../../../../../@fuse/components/navigation';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { DateFormatPipe } from '../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { InventoryCenterPriceListActions } from '../../actions/inventory-center-price-list.action';
import { InventoryCenterPriceListSelectors } from '../../reducers';
@UntilDestroy()
@Component({
    selector: 'app-inventory-center-product-price-list',
    templateUrl: './inventory-center-product-price-list.component.html',
    styleUrls: ['./inventory-center-product-price-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateFormatPipe],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, LoadingOverlayComponent, AsyncPipe],
})
export class InventoryCenterProductPriceListComponent implements OnInit {
    // title: string;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    priceList$ = this.store.select(InventoryCenterPriceListSelectors.selectPriceList);
    loading$ = this.store.select(InventoryCenterPriceListSelectors.selectLoading);
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
            headerName: 'ID',
            field: 'id',
            minWidth: 100,
            sortable: true,
            filter: 'agNumberColumnFilter',
            onCellClicked: params => this.openProductDetails(params),
        },
        {
            headerName: 'Price Code',
            field: 'pricecode',
            minWidth: 120,
            filter: 'agTextColumnFilter',
            onCellClicked: params => this.openProductDetails(params),
        },
        {
            headerName: 'HCPCS',
            field: 'hcpcscode',
            minWidth: 130,
            filter: 'agTextColumnFilter',
            onCellClicked: params => this.openProductDetails(params),
        },
        {
            headerName: 'Effective',
            field: 'effectivedate',
            minWidth: 150,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.datePipe.transform(params.value),
            onCellClicked: params => this.openProductDetails(params),
        },
        {
            headerName: 'Expire',
            field: 'expiredate',
            minWidth: 150,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.datePipe.transform(params.value),
            onCellClicked: params => this.openProductDetails(params),
        },

        {
            headerName: 'Description',
            field: 'description',
            minWidth: 200,
            filter: 'agTextColumnFilter',
            onCellClicked: params => this.openProductDetails(params),
        },

        {
            headerName: 'Item Code',
            field: 'itemcode',
            minWidth: 150,
            filter: 'agTextColumnFilter',
            onCellClicked: params => this.openProductDetails(params),
        },
        {
            headerName: 'Description 2',
            field: 'descriptioN2',
            minWidth: 200,
            filter: 'agTextColumnFilter',
            onCellClicked: params => this.openProductDetails(params),
        },
    ];

    visibleColumns = [
        'id',
        'pricecode',
        'description',
        'hcpcscode',
        'effectivedate',
        'expiredate',
        // 'itemcode',
        // 'descriptioN2',
    ];
    rowData;
    productId;

    constructor(
        private store: Store,
        // private currency: CurrencyPipe,
        private actions$: Actions,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        // private dateTime: DateTimeFormatPipe,
        private datePipe: DateFormatPipe,
        private cdr: ChangeDetectorRef
        // private titleService: TitleService
    ) {
        this.toolbarData = [
            {
                title: 'Add Price',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.addPrice();
                },
            },
        ];
    }

    ngOnInit() {
        // Set title
        // this.title = this.router.url.split('/')[4];
        // this.titleService.setValue(this.title);

        this.productId = Number(this.router.url.split('/')[3]);
        combineLatest([this.activatedRoute.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.store.dispatch(InventoryCenterPriceListActions.LoadPriceList({ productId: this.productId }));
            });

        this.priceList$.pipe(untilDestroyed(this)).subscribe(access => {
            //console.log(access);
            this.rowData = access;
        });
    }

    openProductDetails(params) {
        const isOptionAvailable = this.toolbarData.findIndex(item => item.title === 'Edit');
        if (isOptionAvailable === -1) {
            this.toolbarData = [
                ...this.toolbarData,
                {
                    title: 'Edit',
                    type: 'basic',
                    icon: 'mat_outline:edit',
                    function: () => {
                        this.redirectToEdit(params);
                    },
                },
            ];
            this.cdr.detectChanges();
        }
    }

    updateToolBarData(isOptionAvailable) {
        this.toolbarData = [
            ...this.toolbarData.slice(0, isOptionAvailable),
            ...this.toolbarData.slice(isOptionAvailable + 1),
        ];
        //console.log(this.toolbarData);
    }

    redirectToEdit(params) {
        this.router.navigate([`/centers/inventory-center/${this.productId}/product-price-list/add`, params.data.id]);
    }

    addPrice() {
        this.router.navigate([`/centers/inventory-center/${this.productId}/product-price-list/add`]);
    }
}
