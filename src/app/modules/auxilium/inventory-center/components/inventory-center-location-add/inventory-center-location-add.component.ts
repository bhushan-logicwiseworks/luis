import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
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
import { LocationList } from '../../../../../shared/interfaces/auxilium/inventory-center/location-list.interface';
import { InventoryCenterLocationListActions } from '../../actions/inventory-center-location-list.actions';
import { InventoryCenterPriceListActions } from '../../actions/inventory-center-price-list.action';
import { InventoryCenterLocationSelectors, InventoryCenterPriceListSelectors } from '../../reducers';
import { InventoryCenterLocationBinListComponent } from '../inventory-center-location-bin-list/inventory-center-location-bin-list.component';
import { InventoryCenterLocationCodeListComponent } from '../inventory-center-location-code-list/inventory-center-location-code-list.component';

@UntilDestroy()
@Component({
    selector: 'app-inventory-center-location-add',
    templateUrl: './inventory-center-location-add.component.html',
    styleUrls: ['./inventory-center-location-add.component.scss'],
    imports: [
        MatIcon,
        MatPrefix,
        FuseHorizontalNavigationComponent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        // MatSelect,
        // MatOption,
        // MatSelectTrigger,
        // AsyncPipe,
    ],
})
export class InventoryCenterLocationAddComponent {
    toolbarData: FuseNavigationItem[];
    PriceId = null;
    addLocationDisp: LocationList;
    dateFormat: string = constVariables.DATE_FORMAT;
    addLocationForm: UntypedFormGroup;
    PriceById$ = this.store.select(InventoryCenterPriceListSelectors.selectPriceById);
    itemCode$ = this.store.select(WorkOrderCenterIndividualSelectors.selectItemCode);
    locationBin$ = this.store.select(InventoryCenterLocationSelectors.selectLocationBinList);
    locationBinDropDown;
    locationCode$ = this.store.select(InventoryCenterLocationSelectors.selectLocationCodeList);
    locationCodeDropDown;

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
        this.store.dispatch(InventoryCenterLocationListActions.LocationBinDropdown());
        this.store.dispatch(InventoryCenterLocationListActions.LocationCodeDropdown());
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
        this.addLocationForm = this.formBuilder.group({
            id: [0],
            itemid: [''],
            itemcode: [''],
            description: [''],
            locationCode: [''],
            binCode: [''],
            onHand: [''],
            allocated: [''],
            onOrder: [''],
        });

        // Handle route params and load data
        this.route.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
            this.PriceId = paramMap.get('id');
            if (this.PriceId) {
                this.store.dispatch(InventoryCenterPriceListActions.LoadPriceById({ priceId: this.PriceId }));
                this.addLocationForm.get('id').setValue(this.PriceId);
                // this.patchForm();
            }
        });

        // this.placeOfServiceReps$.pipe(untilDestroyed(this)).subscribe(res => {
        //     this.placeOfServiceDropdown = res;
        // });
    }

    save() {
        let addlocation = this.addLocationForm.value;

        // Transform inputs to uppercase
        addlocation = this.auxUtilService.transFormValues(addlocation, TranFormInputValues);

        // Transform inputs to uppercase
        addlocation = this.auxUtilService.transFormValuesToUpperCase(addlocation, [
            'itemcode',
            'vendorPartNo',
            'company',
            'unitOfMeasure',
        ]);

        if (addlocation.itemCode === '') {
            addlocation.itemid = 0;
        }

        addlocation = this.auxUtilService.transformBankStringToDefaultDate(addlocation, [
            'dateLastOrdered',
            'dateLastReceived',
        ]);

        addlocation = this.auxUtilService.formatDateFields(addlocation, ['dateLastOrdered', 'dateLastReceived']);

        addlocation = this.auxUtilService.cleanData(addlocation);

        this.store.dispatch(InventoryCenterLocationListActions.AddLocation({ location: addlocation }));
    }

    // get selectedPlaceOfService() {
    //     return this.placeOfServiceDropdown.find(res => res.code === this.addLocationForm.get('pos')?.value)?.code;
    // }

    // patchForm() {
    //     this.PriceById$.pipe(untilDestroyed(this)).subscribe(data => {
    //         if (data != null) {
    //             this.addLocationDisp = data;
    //             // const payorIds = [data[0].payorid];
    //             // this.store.dispatch(WorkOrderCenterIndividualActions.LoadPayorDetails({ id: payorIds }));
    //             if (this.addLocationDisp.itemid !== 0) {
    //                 this.itemCode$.pipe(untilDestroyed(this)).subscribe(itemcode => {
    //                     this.addLocationForm.get('itemcode').setValue(itemcode['desciption']);
    //                 });
    //                 const itemId = this.addLocationDisp.itemid;
    //                 this.store.dispatch(WorkOrderCenterIndividualActions.getItemCode({ id: itemId }));
    //             } else {
    //                 this.addLocationForm.get('itemcode').setValue('');
    //             }

    //             const productPriceDetails: Record<string, any> = {
    //                 ...this.addLocationDisp,
    //             };
    //             productPriceDetails.branchid = this.addLocationDisp.branchid.toString();
    //             const defaultDate = '1900-01-01T00:00:00';
    //             const dateFields = ['expiredate', 'effectivedate'];
    //             dateFields.forEach(field => {
    //                 if (productPriceDetails[field] === defaultDate) {
    //                     productPriceDetails[field] = '';
    //                 }
    //             });
    //             // productPriceDetails.description = this.addLocationDisp.description + '' + this.addLocationDisp.description2;
    //             this.addLocationForm.patchValue(productPriceDetails);
    //             // Handle branch selection
    //             combineLatest([
    //                 this.branch$,
    //                 this.addLocationForm
    //                     .get('branchid')
    //                     .valueChanges.pipe(startWith(this.addLocationForm.get('branchid').value)),
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
                itemCode: this.addLocationForm.get('itemcode').value,
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
                this.addLocationForm.get('itemcode').setValue(result.itemcode);
                this.addLocationForm.get('description').setValue(result.description);
                this.addLocationForm.get('itemid').setValue(result.id);
            }
        });
    }

    openLocationBinList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Location Bin',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: InventoryCenterLocationBinListComponent,
            dynamicComponentData: {
                locationBin: this.addLocationForm.get('binCode').value,
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
                this.addLocationForm.get('binCode').setValue(result.bincode);
                // this.addLocationForm.get('bin').setValue(result.id);
            }
        });
    }

    openLocationCodeList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Location Code',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: InventoryCenterLocationCodeListComponent,
            dynamicComponentData: {
                locationCode: this.addLocationForm.get('locationCode').value,
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
                this.addLocationForm.get('locationCode').setValue(result.locationcode);
                // this.addLocationForm.get('bin').setValue(result.id);
            }
        });
    }

    onDateChange(event, formControlName) {
        this.addLocationForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.addLocationForm,
            formControlName
        );
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }
}
