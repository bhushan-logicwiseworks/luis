import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AbbottUserDisplay } from 'app/shared/interfaces/auxilium/abbott-center/abbottuser.interface';
import { AbbottCenterIndividualFormComponent } from '../abbott-center-individual-form/abbott-center-individual-form.component';

@UntilDestroy()
@Component({
    selector: 'app-abbott-center-individual',
    templateUrl: './abbott-center-individual.component.html',
    styleUrls: ['./abbott-center-individual.component.scss'],
    standalone: true,
    imports: [CommonModule, AbbottCenterIndividualFormComponent],
})
export class AbbottCenterIndividualComponent implements OnInit, AfterViewInit, OnDestroy {
    focused: boolean;
    isreadonly: boolean = false;
    user: AbbottUserDisplay;
    abbotUserForm: UntypedFormGroup;
    editMode: boolean = true;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: AbbottUserDisplay,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<AbbottCenterIndividualComponent>
    ) {
        this.user = data;
    }

    ngOnInit(): void {
        // Create the contact form
        this.abbotUserForm = this._formBuilder.group({
            id: [0],
            email: [''],
            zipcodes: [''],
            addedby: [''],
            addeddate: [''],
            modifiedby: [''],
            modifieddate: [''],
        });

        this.abbotUserForm.patchValue(this.user);
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
    deleteUser(): void {
        this.dialogRef.close();
    }

    /**
     * Update the contact
     */
    updateUser(): void {
        this.dialogRef.close();
    }
}
