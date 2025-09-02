import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { PatientAlternateAddressFormComponent } from '../patient-alternate-address-form/patient-alternate-address-form.component';

@UntilDestroy()
@Component({
    selector: 'ac-sales-center-individual-add',
    templateUrl: './patient-alternate-address-add.component.html',
    styleUrls: ['./patient-alternate-address-add.component.scss'],
    imports: [PatientAlternateAddressFormComponent],
})
export class PatientAlternateAddressAddComponent implements OnInit, AfterViewInit, OnDestroy {
    focused: boolean;
    isreadonly: boolean = false;
    contact: SalesRepDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: SalesRepDisplay,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<PatientAlternateAddressAddComponent>
    ) {
        this.contact = data;
        //console.log(data,"this is a data 2 ");
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            salesCode: [''],
            salesId: [''],
            company: [''],
            address: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            fax: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            email: [''],
            notes: [''],
            territory: [''],
            status: [''],
            taxId: [''],
            npi: [''],
            provider: [''],
            taxonomy: [''],
            addUserid: [''],
            doesOptIn: [''],
        });

        // Patch values to the form
        this.contactForm.patchValue(this.contact);
    }

    ngAfterViewInit() {}

    onFocus() {}

    onBlur() {
        this.focused = false;
        this._changeDetectorRef.markForCheck();
    }

    ngOnDestroy() {}

    cancelContact(editMode: boolean | null = null): void {
        this.dialogRef.close();
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        this.dialogRef.close();
    }
}
