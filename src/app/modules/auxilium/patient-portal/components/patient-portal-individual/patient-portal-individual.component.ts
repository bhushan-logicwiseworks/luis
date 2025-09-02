import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { PatientPortalUserDisplay } from 'app/shared/interfaces/auxilium/patient-portal/patient-portal-user.interface';
import moment from 'moment';
import { MatFormField, MatLabel, MatPrefix, MatSuffix, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatDatepickerToggle, MatDatepickerInput, MatDatepicker } from '@angular/material/datepicker';

@UntilDestroy()
@Component({
    selector: 'ac-patient-portal-individual',
    templateUrl: './patient-portal-individual.component.html',
    styleUrls: ['./patient-portal-individual.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        MatSelect,
        MatOption,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepickerInput,
        MatDatepicker,
        MatError,
    ],
})
export class PatientPortalIndividualComponent implements OnInit, AfterViewInit, OnDestroy {
    focused: boolean;
    isreadonly: boolean = false;
    contact: PatientPortalUserDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    dateFormat: string = constVariables.DATE_FORMAT;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<PatientPortalIndividualComponent>,
        private auxUtilService: AuxUtilService
    ) {
        this.contact = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            patientId: [0],
            guid: ['', [Validators.required]],
            registeredEmail: ['', [Validators.required]],
            userEmail: ['', [Validators.required]],
            isEmailConfirmed: [''],
            isElectronicConsent: [''],
            electronicConsentDate: [Date],
            createdDate: [Date],
            createdBy: [''],
        });

        this.contactForm.patchValue(this.contact);
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
     * Delete the contact
     */
    deleteContact(): void {
        this.dialogRef.close();
    }

    /**
     * Update the contact
     */
    updateContact(): void {
        this.dialogRef.close();
    }

    onDateChange(event, formControlName) {
        this.contactForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.contactForm,
            formControlName
        );
        console.log(this.contactForm.value);
    }
    updateUserDetails() {
        let contactDetails: PatientPortalUserDisplay = this.contactForm.value;
        if (contactDetails.electronicConsentDate) {
            contactDetails.electronicConsentDate =
                moment(contactDetails.electronicConsentDate).format('YYYY-MM-DD') + moment().format('THH:mm:ss.SS');
        }
        contactDetails = this.auxUtilService.convertObjToUppercase(contactDetails);
        this.dialogRef.close(contactDetails);
    }
}
