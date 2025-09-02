import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IdentityDisplay } from 'app/shared/interfaces/auxilium/identity-center/identity.interface';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { IdentityCenterIndividualFormComponent } from '../identity-center-individual-form/identity-center-individual-form.component';
import { DateTimeFormatPipe } from '../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

@UntilDestroy()
@Component({
    selector: 'ac-identity-center-individual',
    templateUrl: './identity-center-individual.component.html',
    styleUrls: ['./identity-center-individual.component.scss'],
    imports: [
        MatTooltip,
        MatIcon,
        IdentityCenterIndividualFormComponent,
        DateTimeFormatPipe,
    ],
})
export class IdentityCenterIndividualComponent implements OnInit, AfterViewInit, OnDestroy {
    focused: boolean;
    isreadonly: boolean = false;
    contact: IdentityDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<IdentityCenterIndividualComponent>
    ) {
        this.contact = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            uid: [''],
            DisplayName: [''],
            Email: [''],
            emailVerified: [''],
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
