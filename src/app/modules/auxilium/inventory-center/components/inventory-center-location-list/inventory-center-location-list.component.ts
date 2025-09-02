import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseHorizontalNavigationComponent, FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { PatientArHistorySelectors } from '../../../patient-center/reducers';
import { TitleService } from '../../../patient-center/services/title.service';
import { InventoryCenterLocationListActions } from '../../actions/inventory-center-location-list.actions';

@UntilDestroy()
@Component({
    selector: 'app-inventory-center-location-list',
    templateUrl: './inventory-center-location-list.component.html',
    styleUrls: ['./inventory-center-location-list.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, LoadingOverlayComponent, AsyncPipe],
})
export class InventoryCenterLocationListComponent {
    title: string;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    arHistoryData$ = this.store.select(PatientArHistorySelectors.selectArHistory);
    loading$ = this.store.select(PatientArHistorySelectors.selectLoading);
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
            filter: 'agNumberColumnFilter',
            sortable: true,
        },
        {
            headerName: 'Location',
            field: 'locationCode',
            minWidth: 120,
            filter: 'agTextColumnFilter',
            sortable: true,
        },
        {
            headerName: 'Name',
            field: 'locationName',
            minWidth: 150,
            filter: 'agTextColumnFilter',
            sortable: true,
        },
        {
            headerName: 'Bin',
            field: 'binCode',
            minWidth: 100,
            filter: 'agTextColumnFilter',
            sortable: true,
        },
        {
            headerName: 'On Hand',
            field: 'onHand',
            minWidth: 120,
            filter: 'agNumberColumnFilter',
            sortable: true,
        },
        {
            headerName: 'Allocated',
            field: 'allocated',
            minWidth: 120,
            filter: 'agNumberColumnFilter',
            sortable: true,
        },
        {
            headerName: 'Available',
            field: 'available',
            minWidth: 120,
            filter: 'agNumberColumnFilter',
            sortable: true,
        },
        {
            headerName: 'On Order',
            field: 'onOrder',
            minWidth: 120,
            filter: 'agNumberColumnFilter',
            sortable: true,
        },
    ];

    visibleColumns = ['locationCode', 'locationName', 'binCode', 'onHand', 'allocated', 'available', 'onOrder'];
    rowData;
    productId;

    constructor(
        private store: Store,
        private currency: CurrencyPipe,
        private actions$: Actions,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dateTime: DateTimeFormatPipe,
        private datePipe: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private titleService: TitleService
    ) {
        this.toolbarData = [
            {
                title: 'Add Location',
                type: 'basic',
                icon: 'heroicons_outline:plus-circle',
                function: () => {
                    this.addLocation();
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
                this.store.dispatch(
                    InventoryCenterLocationListActions.LoadLocation({ productId: this.productId, location: '' })
                );
            });

        this.arHistoryData$.pipe(untilDestroyed(this)).subscribe(access => {
            //console.log(access);
            this.rowData = access;
        });
    }

    openArHistoryDetails(params) {
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
        this.router.navigate([`/centers/inventory-center/${this.productId}/location-list/add`, params.data.id]);
    }

    addLocation() {
        this.router.navigate([`/centers/inventory-center/${this.productId}/location-list/add`]);
    }
}
