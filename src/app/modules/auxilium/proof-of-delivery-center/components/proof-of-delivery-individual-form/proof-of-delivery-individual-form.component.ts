import { Component, Inject, Optional, ViewChild, ViewEncapsulation } from '@angular/core';

import { FormControl, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { BillTypeCenterIndividualFormComponent } from 'app/modules/auxilium/billType-center/components/billType-center-individual-form/billType-center-individual-form.component';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { SaveProofOfDelivery } from 'app/shared/interfaces/auxilium/proof-of-delivery-center/save-proof-of-delivery.interface';
import { Subscription } from 'rxjs';
import { ProofOfDeliveryIndividualActions } from '../../actions/proof-of-delivery-individual.actions';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatSelect, MatOption } from '@angular/material/select';

@UntilDestroy()
@Component({
    selector: 'ac-proof-of-delivery-individual-form',
    templateUrl: './proof-of-delivery-individual-form.component.html',
    styleUrls: ['./proof-of-delivery-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        FuseAlertComponent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatSelect,
        MatOption,
    ],
})
export class ProofOfDeliveryIndividualFormComponent {
    ShipDisplayData: SaveProofOfDelivery;

    state = new FormControl();
    shipForm: UntypedFormGroup;
    alert: any;
    showAlert: boolean = false;
    subscription: Subscription;

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<BillTypeCenterIndividualFormComponent>
    ) {
        this.ShipDisplayData = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.shipForm = this._formBuilder.group({
            id: [0],
            vendor: [''],
            patientid: [0],
            ponumber: [''],
            shipdate: [''],
            trackingnumber: [''],
            shippingcarrier: [''],
            shipstatus: [''],
            emailstatus: [''],
            results: [''],
            iscomplete: [true],
            fileattached: [true],
        });
        // Patch values to the form
        this.shipForm.patchValue(this.ShipDisplayData);
    }

    ngAfterViewInit() {}
    ngOnDestroy() {}

    trackByFn(item: any) {
        return item.abbreviation;
    }

    /**
     * Save the updateShipDetails
     */
    updateShipDetails(): void {
        if (this.shipForm.invalid) {
            // Handle validation errors
            this.showAlert = true;
            this.alert = {
                type: 'error',
                message: 'Please fill out all required fields correctly.',
            };
            return; // Exit the function if the form is invalid
        }
        // Populate the object from the screen
        let shipData: SaveProofOfDelivery = this.shipForm.value;
        //shipData.createddate = this.auxUtilService.formatDate(shipData.createddate );

        // Transform inputs to uppercase
        shipData = this.auxUtilService.transFormValuesToUpperCase(shipData, [
            'shippingcarrier',
            'shipstatus',
            'emailstatus',
            'modifiedby',
            'period',
        ]);

        // Update the contact on the server
        this.store.dispatch(ProofOfDeliveryIndividualActions.saveProofOfDelivery({ saveProofOfDelivery: shipData }));

        // trigger save event
        this.dialogRef.close();
    }
}
