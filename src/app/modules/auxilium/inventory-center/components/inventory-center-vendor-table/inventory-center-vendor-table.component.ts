import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseHorizontalNavigationComponent, FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { TitleService } from '../../../payor-center/services/title.service';
import { InventoryCenterVendorTableActions } from '../../actions/inventory-center-vendor-table.actions';
import { InventoryCenterVendorTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-inventory-center-vendor-table',
    templateUrl: './inventory-center-vendor-table.component.html',
    styleUrls: ['./inventory-center-vendor-table.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, LoadingOverlayComponent, AsyncPipe],
})
export class InventoryCenterVendorTableComponent {
    // title: string;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    vendorList$ = this.store.select(InventoryCenterVendorTableSelectors.selectVendorList);
    loading$ = this.store.select(InventoryCenterVendorTableSelectors.selectLoading);
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
            minWidth: 80,
            filter: 'agNumberColumnFilter',
            onCellClicked: params => this.openVendorDetails(params),
        },
        {
            headerName: 'Vendor',
            field: 'vendorCode',
            minWidth: 120,
            filter: 'agTextColumnFilter',
            onCellClicked: params => this.openVendorDetails(params),
        },
        {
            headerName: 'Vendor Part #',
            field: 'vendorPartNo',
            minWidth: 130,
            filter: 'agTextColumnFilter',
            onCellClicked: params => this.openVendorDetails(params),
        },
        {
            headerName: 'Last Ordered',
            field: 'dateLastOrdered',
            minWidth: 150,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.datePipe.transform(params.value),
            onCellClicked: params => this.openVendorDetails(params),
        },
        {
            headerName: 'Last Received',
            field: 'dateLastReceived',
            minWidth: 150,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.datePipe.transform(params.value),
            onCellClicked: params => this.openVendorDetails(params),
        },
        {
            headerName: 'Contract Price',
            field: 'contractPrice',
            minWidth: 140,
            filter: 'agNumberColumnFilter',
            valueFormatter: (params: any) => this.currency.transform(params.data.tranamount, 'USD', 'symbol'),
            onCellClicked: params => this.openVendorDetails(params),
        },
        {
            headerName: 'Last Cost',
            field: 'lastCost',
            minWidth: 120,
            filter: 'agNumberColumnFilter',
            valueFormatter: (params: any) => this.currency.transform(params.data.tranamount, 'USD', 'symbol'),
            onCellClicked: params => this.openVendorDetails(params),
        },
        {
            headerName: 'U/M',
            field: 'unitOfMeasure',
            minWidth: 100,
            filter: 'agTextColumnFilter',
            onCellClicked: params => this.openVendorDetails(params),
        },
    ];

    visibleColumns = [
        'vendorCode',
        'vendorPartNo',
        'dateLastOrdered',
        'dateLastReceived',
        'contractPrice',
        'lastCost',
        'unitOfMeasure',
    ];
    rowData;
    productId;

    constructor(
        private store: Store,
        private currency: CurrencyPipe,
        private actions$: Actions,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private datePipe: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private titleService: TitleService
    ) {
        this.toolbarData = [
            {
                title: 'Add Vendor',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.addVendor();
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
                this.store.dispatch(InventoryCenterVendorTableActions.LoadVendor({ productId: this.productId }));
            });

        this.vendorList$.pipe(untilDestroyed(this)).subscribe(access => {
            //console.log(access);
            this.rowData = access;
        });
    }

    openVendorDetails(params) {
        const isOptionAvailable = this.toolbarData.findIndex(item => item.title === 'Edit');
        if (isOptionAvailable === -1) {
            this.toolbarData = [
                ...this.toolbarData,
                // {
                //     title: 'Edit',
                //     type: 'basic',
                //     icon: 'mat_outline:edit',
                //     function: () => {
                //         this.redirectToEdit(params);
                //     },
                // },
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
        this.router.navigate([`/centers/inventory-center/${this.productId}/vendor-list/edit`, params.data.id]);
    }

    addVendor() {
        this.router.navigate([`/centers/inventory-center/${this.productId}/vendor-list/add`]);
    }
}
