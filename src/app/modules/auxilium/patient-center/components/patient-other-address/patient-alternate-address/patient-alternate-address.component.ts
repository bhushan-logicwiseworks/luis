import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PatientOtherAddress } from 'app/shared/interfaces/auxilium/patient-center/patient-alternate-address.interface';
import { PatientAlternateAddressFormComponent } from '../patient-alternate-address-form/patient-alternate-address-form.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-alternate-address',
    templateUrl: './patient-alternate-address.component.html',
    styleUrls: ['./patient-alternate-address.component.scss'],
    imports: [PatientAlternateAddressFormComponent],
})
export class PatientAlternateAddressComponent implements OnInit, AfterViewInit, OnDestroy {
    focused: boolean;
    isreadonly: boolean = false;
    address: PatientOtherAddress;
    addressForm: UntypedFormGroup;
    editMode: boolean = true;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: PatientOtherAddress,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<PatientAlternateAddressComponent>
    ) {
        this.address = data;
        //console.log(data,"this is a data ")
    }

    ngOnInit(): void {
        // Create the address form
        this.addressForm = this._formBuilder.group({
            id: [0],
            addresstype: [''],
            entitytype: ['', [Validators.required]],
            firstname: [''],
            lastname: [''],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            relationship: [''],
            email: [''],
            effectivedate: [''],
            expiredate: [''],
            adddate: [''],
            adduserid: [''],
        });

        this.addressForm.patchValue(this.address);
    }

    ngAfterViewInit() {}

    onFocus() {}

    onBlur() {
        this.focused = false;
        this._changeDetectorRef.markForCheck();
    }

    ngOnDestroy() {}

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        } else {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete the address
     */
    deleteaddress(): void {
        this.dialogRef.close();
    }

    /**
     * Update the address
     */
    updateaddress(): void {
        this.dialogRef.close();
    }
}
