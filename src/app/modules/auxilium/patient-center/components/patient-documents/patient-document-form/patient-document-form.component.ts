import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { PatientDocument } from 'app/shared/interfaces/auxilium/patient-center/patient-document.interface';
import { PatientDocumentsActions } from '../../../actions/patient-documents.actions';
import { FileDragNDropDirective } from '../../../../../../shared/directives/auxilium/file-drag-n-drop.directive';
import { MatLabel, MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@UntilDestroy()
@Component({
    selector: 'patient-document-form',
    templateUrl: './patient-document-form.component.html',
    styleUrls: ['./patient-document-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        ReactiveFormsModule,
        FileDragNDropDirective,
        MatLabel,
        MatList,
        MatListItem,
        MatIcon,
        MatDivider,
        MatFormField,
        MatPrefix,
        MatInput,
        CdkTextareaAutosize,
    ],
})
export class PatientDocumentFormComponent implements OnInit {
    @Input() document: PatientDocument;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() saveContact: EventEmitter<any> = new EventEmitter<any>();
    uploadFile: boolean = false;
    files: any;
    getPatientId;
    composeForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<PatientDocumentFormComponent>,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private route: Router,
        private _snackBar: MatSnackBar,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private store: Store
    ) {
        this.document = data.dynamicComponentData;
    }

    ngOnInit(): void {
        this.getPatientId = Number(this.route.url.split('/')[3]);
        // Create the form
        this.composeForm = this._formBuilder.group({
            id: [0],
            DocumentName: [''],
            Description: [''],
            FileDetails: ['', Validators.required],
            Note: [''],
            AddUserId: [''],
            addDate: [],
        });

        if (this.document) {
            this.composeForm.setValue({
                id: this.document.id ? this.document.id : 0,
                DocumentName: this.document.documentname,
                Description: this.document.description,
                Note: this.document.note,
                FileDetails: '',
                AddUserId: this.document.adduserid,
                addDate: this.document.adddate,
            });
        }

        if (this.composeForm.value.id == 0) {
            this.uploadFile = true;
        }
    }

    onFileChange(pFileList: File[]) {
        const validFiles: File[] = [];

        for (let i = 0; i < pFileList.length; i++) {
            const file: File = pFileList[i];
            const fileSizeInMB: number = file.size / (1024 * 1024); // Convert file size to MB

            // Check file type (allow only PDF)
            if (file.type === 'application/pdf') {
                // Check file size (limit to 10MB)
                if (fileSizeInMB <= 10) {
                    validFiles.push(file);
                } else {
                    // File size exceeds the limit
                    this._snackBar.open('File size exceeds the limit of 10MB.', 'Close', { duration: 2000 });
                    return;
                }
            } else {
                // File type is not PDF
                this._snackBar.open('Only PDF files are allowed.', 'Close', { duration: 2000 });
                return;
            }
        }

        // Process the valid files
        this.files = validFiles;

        // Display success message
        this._snackBar.open('Successfully uploaded!', 'Close', { duration: 2000 });
    }

    /**
     * Save the document
     */
    saveDocument(): void {
        // Set default date when adding a new record
        if (this.composeForm.value.id == 0) {
            // Populate the object from the screen
            const doc = this.composeForm.value;

            doc.adddate = new Date();

            // Transform inputs to uppercase
            doc.Description = doc.Description ? this.composeForm.value.Description.toUpperCase() : '';
            doc.DocumentName = doc.DocumentName ? doc.DocumentName.toUpperCase() : '';
            doc.Note = doc.Note ? doc.Note.toUpperCase() : '';

            const file: File = this.files[0];

            const document: any = new FormData();
            document.append('FileDetails', file);
            document.append('Description', doc.Description);
            document.append('DocumentName', doc.DocumentName);
            document.append('Note', doc.Note);
            document.append('Entityid', this.getPatientId);
            document.append('Entitytypeid', 301);

            //console.log(doc);

            this.store.dispatch(PatientDocumentsActions.AddDocument({ document }));

            // trigger save event
            this.matDialogRef.close();
        }
    }

    // Update Document
    updateDocument() {
        delete this.composeForm.value.FileDetails;
        delete this.composeForm.value.addDate;

        const doc = this.composeForm.value;

        // Transform inputs to uppercase
        doc.DocumentName = doc.DocumentName ? doc.DocumentName.toUpperCase() : '';
        doc.Description = doc.Description ? doc.Description.toUpperCase() : '';
        doc.Note = doc.Note ? doc.Note.toUpperCase() : '';

        this.store.dispatch(PatientDocumentsActions.DocumentSave({ document: doc }));

        this.matDialogRef.close();
    }

    /**
     * Delete the document
     */
    closeDocument(): void {
        this.matDialogRef.close();
    }
}
