import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { InventoryProductItem } from 'app/shared/interfaces/auxilium/inventory-center/product.interface';
import { combineLatest, map, startWith } from 'rxjs';
import { InventoryCenterIndividualActions } from '../../actions/inventory-center-individual.actions';
import { InventoryCenterIndividualSelectors, InventoryCenterProductSelectors } from '../../reducers';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';

@UntilDestroy()
@Component({
    selector: 'ac-inventory-center-individual-form',
    templateUrl: './inventory-center-individual-form.component.html',
    styleUrls: ['./inventory-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        AuxSelectDropdownComponent,
        MatAutocompleteTrigger,
        MatAutocomplete,
        NgFor,
        MatOption,
        MatSelect,
        MatCheckbox,
        AsyncPipe,
    ],
})
export class InventoryCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    inventoryCenter: FormGroup;
    branchName = new FormControl();

    branch$ = this.store.select(InventoryCenterIndividualSelectors.selectBranch);
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
                name: result.description,
                value: result.code,
            }))
        )
    );

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<InventoryCenterIndividualFormComponent>
    ) {
        this.inventoryCenter = this.fb.group({
            itemcode: [],
            alternatecode: [],
            itemcategory: [],
            description: [],
            description2: [],
            id: [0],
            branchid: ['', [Validators.required]],
            unitofmeasure: [],
            defaultquantity: ['', [Validators.required]],
            billingmultiplier: ['', [Validators.required]],
            level: ['', [Validators.maxLength(1)]],
            span: ['', [Validators.required]],
            averagecost: ['', [Validators.required]],
            vendor: [],
            itemstatus: [],
            // itemcategory: [],
            taxable: [false],
            printdrworkorders: [false],
            discreetpackaging: [false],
            isepoitem: [false],
            lastcost: ['', [Validators.required]],
            make: [],
            model: [],
            purchasemultiplier: ['', [Validators.required]],
            manufacturer: [],
            hcpcscode: [],
            vendorsku: [],
            manufacturerpartno: [],
        });
    }

    ngOnInit(): void {
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
    }

    ngAfterViewInit() {}
    ngOnDestroy() {}

    /**
     * Save the contact
     */
    saveInventory(): void {
        // Populate the object from the screen
        let inventory: InventoryProductItem = this.inventoryCenter.value;

        // Transform inputs to uppercase
        // inventory = this.auxUtilService.transFormValuesToUpperCase(inventory, TranFormInputValuesUpperCase)

        // inventory = this.auxUtilService.cleanData(inventory);

        // Update the contact on the server
        this.store.dispatch(InventoryCenterIndividualActions.AddInventory({ inventory }));
        this.dialogRef.close();
        // trigger save event
        // this.save.emit();
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.inventoryCenter.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
