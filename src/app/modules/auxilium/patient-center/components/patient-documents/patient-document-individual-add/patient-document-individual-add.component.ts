import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PatientDocument } from 'app/shared/interfaces/auxilium/patient-center/patient-document.interface';
import { PatientDocumentFormComponent } from '../patient-document-form/patient-document-form.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-document-individual-add',
    templateUrl: './patient-document-individual-add.component.html',
    styleUrls: ['./patient-document-individual-add.component.scss'],
    imports: [PatientDocumentFormComponent],
})
export class PatientDocumentIndividualAddComponent implements OnInit, AfterViewInit, OnDestroy {
    focused: boolean;
    isreadonly: boolean = false;
    document: PatientDocument;
    composeForm: UntypedFormGroup;
    editMode: boolean = false;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: PatientDocument,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<PatientDocumentIndividualAddComponent>
    ) {
        this.document = data;
        //console.log(data,"this is a data 2 ");
    }

    ngOnInit(): void {
        // Create the contact form
        this.composeForm = this._formBuilder.group({
            documentname: [''],
            description: [''],
            FileDetails: ['', Validators.required],
            note: [''],
            AddUserId: [''],
            addDate: [],
        });

        // Patch values to the form
        this.composeForm.patchValue(this.document);
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
