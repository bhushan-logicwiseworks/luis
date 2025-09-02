import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseHorizontalNavigationComponent, FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { InventoryItemsListComponent } from 'app/modules/auxilium/work-order-center/components/inventory-items-list/inventory-items-list.component';
import { WorkOrderCenterIndividualSelectors } from 'app/modules/auxilium/work-order-center/reducers';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxSearchService } from '../../../../../shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from '../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { TranFormInputValues } from '../../../../../shared/components/auxilium/work-order-details.enum';
import { VendorRecord } from '../../../../../shared/interfaces/auxilium/inventory-center/vendor.interface';
import { InventoryCenterDeatilsActions } from '../../actions/inventory-center-details.action';
import { InventoryCenterPriceListActions } from '../../actions/inventory-center-price-list.action';
import { InventoryCenterVendorTableActions } from '../../actions/inventory-center-vendor-table.actions';
import {
    InventoryCenterPriceListSelectors,
    InventoryCenterProductSelectors,
    InventoryCenterVendorTableSelectors,
} from '../../reducers';
import { InventoryCenterVendorCodeListComponent } from '../inventory-center-vendor-code-list/inventory-center-vendor-code-list.component';

@UntilDestroy()
@Component({
    selector: 'app-inventory-center-vendor-add',
    templateUrl: './inventory-center-vendor-add.component.html',
    styleUrls: ['./inventory-center-vendor-add.component.scss'],
    imports: [
        MatIcon,
        MatPrefix,
        FuseHorizontalNavigationComponent,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatSelect,
        MatOption,
        MatSelectTrigger,
    ],
})
export class InventoryCenterVendorAddComponent {
    toolbarData: FuseNavigationItem[];
    PriceId = null;
    addVendorDisp: VendorRecord;
    dateFormat: string = constVariables.DATE_FORMAT;
    addVendorForm: UntypedFormGroup;
    PriceById$ = this.store.select(InventoryCenterPriceListSelectors.selectPriceById);
    itemCode$ = this.store.select(WorkOrderCenterIndividualSelectors.selectItemCode);
    unitOfMeasure$ = this.store.select(InventoryCenterProductSelectors.selectShipping);
    unitOfMeasureDropDown;
    vendorCode$ = this.store.select(InventoryCenterVendorTableSelectors.selectVendorCodes);
    vendorCodeDropDown;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private formBuilder: UntypedFormBuilder,
        private auxUtilService: AuxUtilService,
        private router: Router,
        private matDialog: MatDialog,
        private searchService: AuxSearchService
    ) {
        let id = Number(this.router.url.split('/')[3]);
        this.store.dispatch(InventoryCenterDeatilsActions.LoadShippingUnitsDropdown());
        this.store.dispatch(InventoryCenterVendorTableActions.VendorCodeDropdown());
        // this.store.dispatch(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDown());
        this.toolbarData = [
            {
                title: 'Save',
                type: 'basic',
                icon: 'mat_outline:save',
                function: () => {
                    this.save();
                },
            },
        ];
    }

    ngOnInit() {
        this.addVendorForm = this.formBuilder.group({
            id: [0],
            itemid: [''],
            itemcode: [''],
            description: [''],
            vendor: [''],
            vendorCode: [''],
            vendorPartNo: [''],
            dateLastOrdered: [''],
            minimumOrder: [0],
            dateLastReceived: [''],
            orderMultiplier: [0],
            lastCost: [0],
            contractPrice: [0],
            weight: [0],
            company: [''],
            unitOfMeasure: [''],
        });

        // Handle route params and load data
        this.route.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
            this.PriceId = paramMap.get('id');
            if (this.PriceId) {
                this.store.dispatch(InventoryCenterPriceListActions.LoadPriceById({ priceId: this.PriceId }));
                this.addVendorForm.get('id').setValue(this.PriceId);
                // this.patchForm();
            }
        });

        this.unitOfMeasure$.pipe(untilDestroyed(this)).subscribe(res => {
            this.unitOfMeasureDropDown = res;
        });
        this.vendorCode$.pipe(untilDestroyed(this)).subscribe(res => {
            this.vendorCodeDropDown = res;
        });
        // this.placeOfServiceReps$.pipe(untilDestroyed(this)).subscribe(res => {
        //     this.placeOfServiceDropdown = res;
        // });
    }

    save() {
        let addvendor = this.addVendorForm.value;

        // Transform inputs to uppercase
        addvendor = this.auxUtilService.transFormValues(addvendor, TranFormInputValues);

        // Transform inputs to uppercase
        addvendor = this.auxUtilService.transFormValuesToUpperCase(addvendor, [
            'itemcode',
            'vendorPartNo',
            'company',
            'unitOfMeasure',
        ]);

        if (addvendor.itemCode === '') {
            addvendor.itemid = 0;
        }

        addvendor = this.auxUtilService.transformBankStringToDefaultDate(addvendor, [
            'dateLastOrdered',
            'dateLastReceived',
        ]);

        addvendor = this.auxUtilService.formatDateFields(addvendor, ['dateLastOrdered', 'dateLastReceived']);

        addvendor = this.auxUtilService.cleanData(addvendor);

        this.store.dispatch(InventoryCenterVendorTableActions.AddInventoryVendor({ vendor: addvendor }));
    }
    get selectedMesure() {
        return this.unitOfMeasureDropDown.find(res => res.code === this.addVendorForm.get('unitOfMeasure')?.value)
            ?.code;
    }
    get selectedVendorCode() {
        return this.vendorCodeDropDown.find(res => res.code === this.addVendorForm.get('vendorCode')?.value)?.code;
    }
    // get selectedPlaceOfService() {
    //     return this.placeOfServiceDropdown.find(res => res.code === this.addVendorForm.get('pos')?.value)?.code;
    // }

    // patchForm() {
    //     this.PriceById$.pipe(untilDestroyed(this)).subscribe(data => {
    //         if (data != null) {
    //             this.addVendorDisp = data;
    //             // const payorIds = [data[0].payorid];
    //             // this.store.dispatch(WorkOrderCenterIndividualActions.LoadPayorDetails({ id: payorIds }));
    //             if (this.addVendorDisp.itemid !== 0) {
    //                 this.itemCode$.pipe(untilDestroyed(this)).subscribe(itemcode => {
    //                     this.addVendorForm.get('itemcode').setValue(itemcode['desciption']);
    //                 });
    //                 const itemId = this.addVendorDisp.itemid;
    //                 this.store.dispatch(WorkOrderCenterIndividualActions.getItemCode({ id: itemId }));
    //             } else {
    //                 this.addVendorForm.get('itemcode').setValue('');
    //             }

    //             const productPriceDetails: Record<string, any> = {
    //                 ...this.addVendorDisp,
    //             };
    //             productPriceDetails.branchid = this.addVendorDisp.branchid.toString();
    //             const defaultDate = '1900-01-01T00:00:00';
    //             const dateFields = ['expiredate', 'effectivedate'];
    //             dateFields.forEach(field => {
    //                 if (productPriceDetails[field] === defaultDate) {
    //                     productPriceDetails[field] = '';
    //                 }
    //             });
    //             // productPriceDetails.description = this.addVendorDisp.description + '' + this.addVendorDisp.description2;
    //             this.addVendorForm.patchValue(productPriceDetails);
    //             // Handle branch selection
    //             combineLatest([
    //                 this.branch$,
    //                 this.addVendorForm
    //                     .get('branchid')
    //                     .valueChanges.pipe(startWith(this.addVendorForm.get('branchid').value)),
    //             ])
    //                 .pipe(untilDestroyed(this))
    //                 .subscribe(([branches, branchid]) => {
    //                     if (branches && Number(branchid)) {
    //                         const selectedBranch = branches.find(branch => branch.id === Number(branchid));
    //                         if (selectedBranch) {
    //                             this.onBranchSelected(selectedBranch);
    //                         }
    //                     }
    //                 });
    //         }
    //     });
    // }

    backToListing() {
        window.history.back();
    }

    openItemList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Item Code',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: InventoryItemsListComponent,
            dynamicComponentData: {
                itemCode: this.addVendorForm.get('itemcode').value,
            },
            submitFunction: 'selectRowSubmit',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '70%',
            height: 'auto',
            data: popupData,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //console.log('luicho',result);
                this.addVendorForm.get('itemcode').setValue(result.itemcode);
                this.addVendorForm.get('description').setValue(result.description);
                this.addVendorForm.get('itemid').setValue(result.id);
            }
        });
    }

    openVendorList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Adjustment Code',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: InventoryCenterVendorCodeListComponent,
            dynamicComponentData: {
                vendorCode: this.addVendorForm.get('vendorCode').value,
            },
            submitFunction: 'selectRowSubmit',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '70%',
            height: 'auto',
            data: popupData,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addVendorForm.get('vendor').setValue(result.vendorcode);
                this.addVendorForm.get('company').setValue(result.company);
                this.addVendorForm.get('vendorCode').setValue(result.id);
            }
        });
    }

    onDateChange(event, formControlName) {
        this.addVendorForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.addVendorForm,
            formControlName
        );
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }
}
