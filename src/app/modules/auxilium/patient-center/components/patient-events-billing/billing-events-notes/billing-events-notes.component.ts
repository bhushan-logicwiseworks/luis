import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatLabel } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { ContactNote } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance-notes.interface';
import { QuillEditorComponent } from 'ngx-quill';
import { Observable } from 'rxjs';
import { FuseAlertComponent } from '../../../../../../../@fuse/components/alert';
import { AuxHtmlContentRendererComponent } from '../../../../../../shared/components/auxilium/aux-html-content-renderer/aux-html-content-renderer.component';
import { ScrollbarComponent } from '../../../../../../shared/components/scrollbar/scrollbar.component';
import { DateTimeFormatPipe } from '../../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PatientEventsBillingActions } from '../../../actions/patient-events-billing.action';
import { PatientEventsBillingSelectors } from '../../../reducers';

@Component({
    selector: 'app-billing-events-notes',
    templateUrl: './billing-events-notes.component.html',
    styleUrl: './billing-events-notes.component.scss',
    imports: [
        ScrollbarComponent,
        NgClass,
        AuxHtmlContentRendererComponent,
        MatDivider,
        ReactiveFormsModule,
        MatLabel,
        QuillEditorComponent,
        FuseAlertComponent,
        AsyncPipe,
        DateTimeFormatPipe,
    ],
})
export class BillingEventsNotesComponent {
    @ViewChild('quillEditor') quillEditor: QuillEditorComponent;

    contactForm: UntypedFormGroup;
    contactList$: Observable<any[]>;
    contactNotes$: Observable<ContactNote[]>;

    alert: { type: string; message: string } | null = null;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private store: Store,
        private dialogRef: MatDialogRef<BillingEventsNotesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.contactNotes$ = this.store.select(PatientEventsBillingSelectors.selectContactNotes);
        // this.contactList$ = this.store.select(PatientComplianceSelectors.selectContactTypeList);
    }

    ngOnInit(): void {
        this.initForm();
        // this.loadContactList();
    }

    quillModules: any = {
        toolbar: false,
    };

    private initForm(): void {
        // Defensive check for data.dynamicComponentData
        const dynamicData = this.data || {};
        const patientId = dynamicData.patientId || 0;
        const refId = dynamicData.refId || 0;
        const moduleName = dynamicData.moduleName || 'BillingEvents';
        const contactType = 'BillingEvents';

        this.contactForm = this.formBuilder.group({
            contactType: [contactType, Validators.required],
            note: ['', Validators.required],
            priority: [false],
            entityID: [patientId, Validators.required],
            refId: [refId],
            moduleName: [moduleName],
        });
    }

    saveContactNote(): void {
        // Check if form is initialized
        if (!this.contactForm) {
            console.error('Form is not initialized');
            this.alert = {
                type: 'error',
                message: 'Form initialization failed. Please try again.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return;
        }

        // Get form values
        const formValue = this.contactForm.value;
        const quill = this.quillEditor.quillEditor;
        const plainText = quill.getText().trim();

        const note: ContactNote = {
            id: 0, // New note
            entityType: 'PATIENT',
            entityID: formValue.entityID,
            contactType: formValue.contactType,
            note: plainText.toUpperCase(),
            addUserId: 'SYSTEM', // Replace with actual user ID if available
            addDate: new Date().toISOString(),
            message: '', // Empty string as per API example
            priority: formValue.priority ? 'PRIORITY' : '',
            refId: formValue.refId,
        };

        // Validate input
        if (!this.isInputValid(note)) {
            return;
        }

        // Dispatch action to save note
        this.store.dispatch(PatientEventsBillingActions.AddContactNote({ note }));

        // Close dialog
        this.dialogRef.close();
    }

    private isInputValid(note: ContactNote): boolean {
        if (!note.contactType) {
            this.alert = {
                type: 'error',
                message: 'Contact Type cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }
        if (!note.note || note.note.trim() === '' || note.note === '<p><br></p>' || note.note === '<H1><BR></H1>') {
            this.alert = {
                type: 'error',
                message: 'Note cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }
        if (!note.entityID) {
            this.alert = {
                type: 'error',
                message: 'entity ID cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }
        return true;
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
