import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PriceCenterIndividualActions } from '../../actions/price-center-individual.actions';
import { PriceCenterTableActions } from '../../actions/price-center-table.actions';
import { PriceCenterTableSelectors } from '../../reducers';
import { ItemPriceInformationComponent } from '../item-price-information/item-price-information.component';

@UntilDestroy()
@Component({
    selector: 'app-item-price-list',
    templateUrl: './item-price-list.component.html',
    styleUrls: ['./item-price-list.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        AuxAgGridComponent,
        MatButton,
        MatTooltip,
        AsyncPipe,
    ],
})
export class ItemPriceListComponent {
    priceListData;
    itemPriceListForm: FormGroup;
    rowData = [];
    columnDefs = [
        {
            headerName: 'Price Code',
            field: 'pricecode',
            minWidth: 101,
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 300,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'HCPC',
            field: 'hcpcscode',
            minWidth: 101,
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Effective',
            field: 'effectivedate',
            minWidth: 101,
            valueFormatter: (params: any) => this.datePipe.transform(params.data.effectivedate),
            filter: 'agDateColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Expires',
            field: 'expiredate',
            minWidth: 101,
            valueFormatter: (params: any) => this.datePipe.transform(params.data.expiredate),
            filter: 'agDateColumnFilter',
            sortIndex: 1,
            hide: false,
        },
    ];

    visibleColumns = ['pricecode', 'description', 'hcpcscode', 'effectivedate', 'expiredate'];
    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    selectedRow = null;
    data$ = this.store.select(PriceCenterTableSelectors.selectedItemPriceList);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    loading$ = this.store.select(PriceCenterTableSelectors.selectLoading);

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        public matDialogRef: MatDialogRef<ItemPriceListComponent>,
        private searchService: AuxSearchService,
        private datePipe: DateFormatPipe,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private dialog: MatDialog,
        private store: Store,
        private cdr: ChangeDetectorRef,
        private actions$: Actions
    ) {
        this.priceListData = data.dynamicComponentData;
        this.itemPriceListForm = this._formBuilder.group({
            itemcode: [],
            hcpcscode: [],
            description: [],
            branchcode: [],
        });
    }

    ngOnInit() {
        Promise.resolve().then(() => {
            combineLatest([this.refresh$.pipe(startWith(null))])
                .pipe(untilDestroyed(this))
                .subscribe(res => {
                    this.store.dispatch(
                        PriceCenterTableActions.loadItemPriceList({
                            id: this.priceListData.id,
                        })
                    );
                });
            this.data$.pipe(untilDestroyed(this)).subscribe(res => {
                if (res) {
                    this.rowData = res;
                    this.selectedRow = null;
                    this.itemPriceListForm.patchValue(this.priceListData);
                    this.cdr.detectChanges();
                }
            });
        });

        this.actions$
            .pipe(ofType(PriceCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    closeModal() {
        this.matDialogRef.close();
        this.searchService.resetFilter.next({ resetGrid: true });
    }

    selectionRowChange(event) {
        this.selectedRow = event.api.getSelectedRows()[0] || null;
    }

    openItemPriceInfoModal() {
        const data = {
            itemPriceItem: this.selectedRow || null,
            itemPriceListData: this.priceListData || null,
        };
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Edit Item Price Information',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: ItemPriceInformationComponent, // Component you want to load dynamically
            dynamicComponentData: data,
            submitFunction: 'submitItemPrice',
            enterKeyEnabled: true,
        };
        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '700px',
            minHeight: 'auto',
            data: popupData,
        });
        modalRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(res => {
                this.store.dispatch(PriceCenterTableActions.ResetState());
            });
        // this.dialog
        //     .open(ItemPriceInformationComponent, {
        //         data: {
        //             itemPriceItem: this.selectedRow || null,
        //             itemPriceListData: this.priceListData || null,
        //         },
        //         width: '700px',
        //     })
        //     .afterClosed()
        //     .pipe(untilDestroyed(this))
        //     .subscribe((res) => {
        //         this.store.dispatch(PriceCenterTableActions.ResetState());
        //     });
    }

    deleteContact(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete contact',
            message: 'Are you sure you want to delete this contact? This action cannot be undone!',
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
                    // Get the current price's id
                    const price = {
                        id: this.selectedRow.id,
                    };
                    // Delete the Price
                    this.store.dispatch(PriceCenterIndividualActions.DeletePrice({ price }));
                }
            });
    }
    createPriceModal() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Add Item Price Information',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: ItemPriceInformationComponent, // Component you want to load dynamically
            dynamicComponentData: this.priceListData || null,
            submitFunction: 'submitItemPrice',
            enterKeyEnabled: true,
        };
        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '700px',
            minHeight: 'auto',
            data: popupData,
        });
    }
}
