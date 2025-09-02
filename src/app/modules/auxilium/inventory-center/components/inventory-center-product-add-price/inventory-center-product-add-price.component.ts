import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseHorizontalNavigationComponent, FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';

import { AsyncPipe, NgFor } from '@angular/common';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatSelectTrigger } from '@angular/material/select';
import { combineLatest, startWith } from 'rxjs';
import { constVariables } from '../../../../../common/constants/constVariables';
import { AuxPopupComponent, PopupData } from '../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { TranFormInputValues } from '../../../../../shared/components/auxilium/work-order-details.enum';
import { ItemPriceById } from '../../../../../shared/interfaces/auxilium/inventory-center/price-by-id.interface';
import { PatientInquiryChangesActions } from '../../../patient-center/actions/patient-inquiry-changes.action';
import { PatientInquiryChangesSelectors } from '../../../patient-center/reducers';
import { WorkOrderCenterIndividualActions } from '../../../work-order-center/actions/work-order-center-individual.actions';
import { InventoryItemsListComponent } from '../../../work-order-center/components/inventory-items-list/inventory-items-list.component';
import { WorkOrderCenterIndividualSelectors } from '../../../work-order-center/reducers';
import { InventoryCenterPriceListActions } from '../../actions/inventory-center-price-list.action';
import { InventoryCenterIndividualSelectors, InventoryCenterPriceListSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-inventory-center-product-add-price',
    templateUrl: './inventory-center-product-add-price.component.html',
    styleUrls: ['./inventory-center-product-add-price.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        MatAutocompleteTrigger,
        MatAutocomplete,
        NgFor,
        MatSelectTrigger,
        MatCheckbox,
        AsyncPipe,
    ],
})
export class InventoryCenterProductAddPriceComponent {
    toolbarData: FuseNavigationItem[];
    PriceId = null;
    addPriceDisp: ItemPriceById;
    dateFormat: string = constVariables.DATE_FORMAT;
    addPriceForm: UntypedFormGroup;
    PriceById$ = this.store.select(InventoryCenterPriceListSelectors.selectPriceById);
    itemCode$ = this.store.select(WorkOrderCenterIndividualSelectors.selectItemCode);
    branchName = new FormControl();
    branch$ = this.store.select(InventoryCenterIndividualSelectors.selectBranch);
    billType$ = this.store.select(PatientInquiryChangesSelectors.selectBillType);
    billTypeDropDown;
    // selectedPayors$ = this.store.select(WorkOrderCenterIndividualSelectors.selectPayorsDetail);
    // placeOfServiceReps$ = this.store.select(PatientCenterDetailsSelectors.selectPlaceOfService);
    // placeOfServiceDropdown: GetPatientPlaceOfServiceResponse = [];
    priceCode$ = this.store.select(InventoryCenterPriceListSelectors.selectPriceCode);
    priceCodeDropDown;
    cmnForms$ = this.store.select(InventoryCenterPriceListSelectors.selectCMNForms);
    cmnFormsDropDown;

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
        this.store.dispatch(InventoryCenterPriceListActions.PriceCodeDropdown());
        this.store.dispatch(InventoryCenterPriceListActions.CMNFormsDropdown());
        this.store.dispatch(PatientInquiryChangesActions.BillTypeDropdown());
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
        this.addPriceForm = this.formBuilder.group({
            // Basic Information Section
            id: [0],
            itemid: [''],
            itemcode: [''],
            description: [''],
            hcpcscode: [''],
            branchid: [''],
            pricecode: [''],
            billtype: [''],
            rxflag: [''],
            cmnformid: [''],
            authreq: [''],
            quantityallowed: [0],
            lot: [false],
            effectivedate: [''],
            spanhold: [false],
            expiredate: [''],
            norollup: [false],
            roundtonearestdollar: [false],

            // Left Column - Rental Section
            rentmod: [''],
            rentmod2: [''],
            rentmod3: [''],
            rentmod4: [''],
            rentsubmitted: [0],
            rentallowed: [0],
            rentday: [0],
            rentweek: [0],
            lonrent: [0],
            cappedrentalmonths: [0],
            capexempt: [false],

            // Right Column - Purchase Section
            salemod: [''],
            salemod2: [''],
            salemod3: [''],
            salemod4: [''],
            salesubmitted: [0],
            saleallowed: [0],
            lonsale: [0],
            pos: [''],
            quantitydivider: [0],
            markuppercent: [0],
            markupamount: [0],

            // Hidden/Unused fields
            // tos: [''],
            // drordergroup: [''],
            // dispensingfee: [''],
            // revenuecode: [''],
            // adduserid: [''],
            // adddate: [''],
            // qtyorderedbyphy: [0],
        });

        // Handle route params and load data
        this.route.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
            this.PriceId = paramMap.get('id');
            if (this.PriceId) {
                this.store.dispatch(InventoryCenterPriceListActions.LoadPriceById({ priceId: this.PriceId }));
                this.addPriceForm.get('id').setValue(this.PriceId);
                this.patchForm();
            }
        });

        this.priceCode$.pipe(untilDestroyed(this)).subscribe(res => {
            this.priceCodeDropDown = res;
        });
        this.cmnForms$.pipe(untilDestroyed(this)).subscribe(res => {
            this.cmnFormsDropDown = res;
        });
        this.billType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.billTypeDropDown = res;
        });
        // this.placeOfServiceReps$.pipe(untilDestroyed(this)).subscribe(res => {
        //     this.placeOfServiceDropdown = res;
        // });
    }

    save() {
        let addPrice = this.addPriceForm.value;

        // Transform inputs to uppercase
        addPrice = this.auxUtilService.transFormValues(addPrice, TranFormInputValues);

        // Transform inputs to uppercase
        addPrice = this.auxUtilService.transFormValuesToUpperCase(addPrice, [
            'itemcode',
            'description',
            'hcpcscode',
            'rentsubmitted',
            'rentallowed',
            'rentday',
            'rentweek',
            'lonrent',
            'salesubmitted',
            'saleallowed',
            'rentmod',
            'rentmod2',
            'rentmod3',
            'rentmod4',
            'salemod',
            'salemod2',
            'salemod3',
            'salemod4',
        ]);

        if (addPrice.itemCode === '') {
            addPrice.itemid = 0;
        }

        addPrice = this.auxUtilService.transformBankStringToDefaultDate(addPrice, ['expiredate', 'effectivedate']);

        addPrice = this.auxUtilService.formatDateFields(addPrice, ['expiredate', 'effectivedate']);

        addPrice = this.auxUtilService.cleanData(addPrice);

        this.store.dispatch(InventoryCenterPriceListActions.SavePrice({ price: addPrice }));
    }

    get selectedPriceCode() {
        return this.priceCodeDropDown.find(res => res.code === this.addPriceForm.get('pricecode')?.value)?.code;
    }
    get selectedCMNForms() {
        return this.cmnFormsDropDown.find(res => res.code === this.addPriceForm.get('cmnForms')?.value)?.code;
    }
    get selectedBillType() {
        return this.billTypeDropDown.find(res => res.billType === this.addPriceForm.get('billtype')?.value)?.billType;
    }
    // get selectedPlaceOfService() {
    //     return this.placeOfServiceDropdown.find(res => res.code === this.addPriceForm.get('pos')?.value)?.code;
    // }

    patchForm() {
        this.PriceById$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data != null) {
                this.addPriceDisp = data;
                // const payorIds = [data[0].payorid];
                // this.store.dispatch(WorkOrderCenterIndividualActions.LoadPayorDetails({ id: payorIds }));
                if (this.addPriceDisp.itemid !== 0) {
                    this.itemCode$.pipe(untilDestroyed(this)).subscribe(itemcode => {
                        this.addPriceForm.get('itemcode').setValue(itemcode['desciption']);
                    });
                    const itemId = this.addPriceDisp.itemid;
                    this.store.dispatch(WorkOrderCenterIndividualActions.getItemCode({ id: itemId }));
                } else {
                    this.addPriceForm.get('itemcode').setValue('');
                }

                const productPriceDetails: Record<string, any> = {
                    ...this.addPriceDisp,
                };
                productPriceDetails.branchid = this.addPriceDisp.branchid.toString();
                const defaultDate = '1900-01-01T00:00:00';
                const dateFields = ['expiredate', 'effectivedate'];
                dateFields.forEach(field => {
                    if (productPriceDetails[field] === defaultDate) {
                        productPriceDetails[field] = '';
                    }
                });
                // productPriceDetails.description = this.addPriceDisp.description + '' + this.addPriceDisp.description2;
                this.addPriceForm.patchValue(productPriceDetails);
                // Handle branch selection
                combineLatest([
                    this.branch$,
                    this.addPriceForm
                        .get('branchid')
                        .valueChanges.pipe(startWith(this.addPriceForm.get('branchid').value)),
                ])
                    .pipe(untilDestroyed(this))
                    .subscribe(([branches, branchid]) => {
                        if (branches && Number(branchid)) {
                            const selectedBranch = branches.find(branch => branch.id === Number(branchid));
                            if (selectedBranch) {
                                this.onBranchSelected(selectedBranch);
                            }
                        }
                    });
            }
        });
    }

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
                itemCode: this.addPriceForm.get('itemcode').value,
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
                this.addPriceForm.get('itemcode').setValue(result.itemcode);
                this.addPriceForm.get('description').setValue(result.description);
                this.addPriceForm.get('itemid').setValue(result.id);
            }
        });
    }

    onDateChange(event, formControlName) {
        this.addPriceForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.addPriceForm,
            formControlName
        );
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.addPriceForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
