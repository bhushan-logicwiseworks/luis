import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DexcomUserDisplay } from 'app/shared/interfaces/auxilium/dexcom-center/dexcomuser.interface';
import { DexcomCenterIndividualFormComponent } from '../dexcom-center-individual-form/dexcom-center-individual-form.component';

@UntilDestroy()
@Component({
    selector: 'ac-dexcom-center-individual',
    templateUrl: './dexcom-center-individual.component.html',
    styleUrls: ['./dexcom-center-individual.component.scss'],
    imports: [DexcomCenterIndividualFormComponent],
})
export class DexcomCenterIndividualComponent implements OnInit, AfterViewInit, OnDestroy {
    focused: boolean;
    isreadonly: boolean = false;
    contact: DexcomUserDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = true;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: DexcomUserDisplay,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<DexcomCenterIndividualComponent>
    ) {
        this.contact = data;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            email: [''],
            zipcodes: [''],
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
}
