import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { InventoryProductItem } from 'app/shared/interfaces/auxilium/inventory-center/product.interface';
import { combineLatest, map, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { PatientCenterDeatilsActions } from '../../../patient-center/actions/patient-details.action';
import { PatientCenterDetailsSelectors } from '../../../patient-center/reducers';
import { InventoryCenterDeatilsActions } from '../../actions/inventory-center-details.action';
import { InventoryCenterIndividualActions } from '../../actions/inventory-center-individual.actions';
import { InventoryCenterIndividualSelectors, InventoryCenterProductSelectors } from '../../reducers';
@UntilDestroy()
@Component({
    selector: 'app-inventory-center-product-detail',
    templateUrl: './inventory-center-product-detail.component.html',
    styleUrls: ['./inventory-center-product-detail.component.scss'],
    imports: [
        ReactiveFormsModule,
        FuseHorizontalNavigationComponent,
        MatFormField,
        MatInput,
        AuxSelectDropdownComponent,
        MatAutocompleteTrigger,
        MatAutocomplete,
        NgFor,
        MatOption,
        MatCheckbox,
        AsyncPipe,
    ],
})
export class InventoryCenterProductDetailComponent {
    toolbarData: FuseNavigationItem[];
    inventoryCenter: FormGroup;
    productId: number;
    branchName = new FormControl();
    branch$ = this.store.select(InventoryCenterIndividualSelectors.selectBranch);
    // Get Product Details Data
    productDetailsList$ = this.store.select(InventoryCenterProductSelectors.selectProductDetails);

    // Get Class Dropdown Data
    classDropdownList$ = this.store.select(InventoryCenterProductSelectors.selectClass).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    // Get Shipping Dropdown Data
    shippingDropdownList$ = this.store.select(InventoryCenterProductSelectors.selectShipping).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    // Get tatus Dropdown Data
    statusDropdownList$ = this.store.select(InventoryCenterProductSelectors.selectStatus).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    // Get Make Dropdown Data
    makeDropdownList$ = this.store.select(InventoryCenterProductSelectors.selectMake).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    // Get Make Dropdown Data
    modelDropdownList$ = this.store.select(InventoryCenterProductSelectors.selectModal).pipe(
        map(data =>
            data.map(result => ({
                name: result.description,
                value: result.code,
            }))
        )
    );

    // Get Manufacturer Dropdown Data
    manufacturerDropdownList$ = this.store.select(InventoryCenterProductSelectors.selectManufacturer).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    patientCategoryList$ = this.store.select(PatientCenterDetailsSelectors.selectPatientCategory).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private auxUtilService: AuxUtilService
    ) {
        this.store.dispatch(PatientCenterDeatilsActions.LoadPatientCategoryDropDown());
        combineLatest([this.activatedRoute.params])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.productId = parseInt(this.activatedRoute.parent.snapshot.params['id'], 10);
                this.store.dispatch(InventoryCenterDeatilsActions.LoadProductDetails({ id: this.productId }));
            });

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
        this.inventoryCenter = this.fb.group({
            itemcode: [],
            alternatecode: [],
            itemcategory: [],
            inventorycategory: [],
            description: [],
            description2: [],
            id: [],
            branchid: [],
            unitofmeasure: [],
            purchaseunitofmeasure: [],
            defaultquantity: [],
            billingmultiplier: [],
            isepoitem: [],
            level: [],
            span: [],
            averagecost: [],
            vendor: [],
            itemstatus: [],
            // itemcategory: [],
            taxable: [],
            printdrworkorders: [],
            discreetpackaging: [],
            lastcost: [],
            make: [],
            model: [],
            purchasemultiplier: [],
            manufacturer: [],
            upnqualifier: [],
            hcpcscode: [],
            vendorsku: [],
            manufacturerpartno: [],
        });
    }
    /**
     * * On init
     * */
    ngOnInit(): void {
        this.inventoryCenter.get('id').setValue(this.productId);
        this.productDetailsList$.pipe(untilDestroyed(this)).subscribe(data => {
            this.inventoryCenter.patchValue(data);
            combineLatest([
                this.branch$,
                this.inventoryCenter
                    .get('branchid')
                    .valueChanges.pipe(startWith(this.inventoryCenter.get('branchid').value)),
            ])
                .pipe(untilDestroyed(this))
                .subscribe(([branches, branchid]) => {
                    if (branches && branchid) {
                        const selectedBranch = branches.find(branch => branch.id === branchid);
                        if (selectedBranch) {
                            this.onBranchSelected(selectedBranch);
                        }
                    }
                });
        });
    }
    save() {
        // Populate the object from the screen
        let inventory: InventoryProductItem = this.inventoryCenter.value;

        // Transform inputs to uppercase
        // inventory = this.auxUtilService.transFormValuesToUpperCase(inventory, TranFormInputValuesUpperCase)

        inventory = this.auxUtilService.transFormValuesToUpperCase(inventory, [
            'itemcode',
            'alternatecode',
            'description',
            'description2',
            'vendor',
            'vendorsku',
        ]);

        inventory = this.auxUtilService.cleanData(inventory);

        // Update the contact on the server
        this.store.dispatch(InventoryCenterIndividualActions.AddInventory({ inventory }));
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.inventoryCenter.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
