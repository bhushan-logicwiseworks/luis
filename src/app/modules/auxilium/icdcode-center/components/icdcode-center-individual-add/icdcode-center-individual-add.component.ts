import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ICDCodeDisplay } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';
import { IcdCodeCenterIndividualFormComponent } from '../icdcode-center-individual-form/icdcode-center-individual-form.component';

@UntilDestroy()
@Component({
    selector: 'ac-icdcode-center-individual-add',
    templateUrl: './icdcode-center-individual-add.component.html',
    styleUrls: ['./icdcode-center-individual-add.component.scss'],
    imports: [IcdCodeCenterIndividualFormComponent],
})
export class IcdCodeCenterIndividualAddComponent implements OnInit, AfterViewInit, OnDestroy {
    focused: boolean;
    isreadonly: boolean = false;
    contact: ICDCodeDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: ICDCodeDisplay,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<IcdCodeCenterIndividualAddComponent>
    ) {
        this.contact = data;
        //console.log(data,"this is a data 2 ");
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            icd9code: [''],
            status: [''],
            description: [''],
            changeindicator: [''],
            codestatus: [''],
            shortdescription: [''],
            mediumdescription: [''],
            longdescription: [''],
            icd10code: [''],
            icd10description: [''],
            flags: [''],
            inactivedate: [''],
            adddate: [''],
            adduserid: [''],
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
