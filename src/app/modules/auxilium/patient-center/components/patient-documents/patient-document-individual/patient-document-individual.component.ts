import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PatientDocument } from 'app/shared/interfaces/auxilium/patient-center/patient-document.interface';
import { base64ToArrayBuffer } from 'app/shared/utils/base64ToArrayBuffer';
import { PatientDocumentsActions } from '../../../actions/patient-documents.actions';
import { PatientDocumentsSelectors } from '../../../reducers';
import { PatientDocumentFormComponent } from '../patient-document-form/patient-document-form.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatTooltip } from '@angular/material/tooltip';
import { DateTimeFormatPipe } from '../../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

@UntilDestroy()
@Component({
    selector: 'ac-patient-document-individual',
    templateUrl: './patient-document-individual.component.html',
    styleUrls: ['./patient-document-individual.component.scss'],
    imports: [
        MatButton,
        MatIcon,
        PdfViewerModule,
        MatTooltip,
        PatientDocumentFormComponent,
        DateTimeFormatPipe,
    ],
})
export class PatientDocumentIndividualComponent implements OnInit, AfterViewInit, OnDestroy {
    focused: boolean;
    blob: Blob;
    file: any;
    isreadonly: boolean = false;
    document: PatientDocument;
    composeForm: UntypedFormGroup;
    editMode: boolean = false;

    data$ = this.store.select(PatientDocumentsSelectors.selectDocuments);
    pdfFile$ = this.store.select(PatientDocumentsSelectors.selectDocument);
    loading$ = this.store.select(PatientDocumentsSelectors.selectLoading);
    previewUrl$ = this.store.select(PatientDocumentsSelectors.selectPreviewUrl);

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private store: Store,
        private dialogRef: MatDialogRef<PatientDocumentIndividualComponent>,
        private dialog: MatDialog
    ) {
        this.document = data.dynamicComponentData;
        this.store.dispatch(PatientDocumentsActions.SetPreviewUrl({ id: this.document.id }));
    }

    ngOnInit(): void {
        // Create the Document form
        this.composeForm = this._formBuilder.group({
            documentname: [''],
            description: [''],
            FileDetails: ['', Validators.required],
            note: [''],
            AddUserId: [''],
            addDate: [],
        });
        this.pdfFile$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data !== null) {
                const arrBuffer = base64ToArrayBuffer(data[0]?.fileBlob);
                const blob = new Blob([arrBuffer], { type: 'application/pdf' });
                const fileUrl = URL?.createObjectURL(blob);
                this.file = fileUrl;
            }
        });

        this.composeForm.patchValue(this.document);
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
            this.openEditModel();
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete the document
     */
    deleteDocument(): void {
        this.dialogRef.close();
    }

    /**
     * Update the document
     */
    updateDocument(): void {
        this.dialogRef.close();
    }

    viewDocument(document: PatientDocument) {
        this.store.dispatch(PatientDocumentsActions.LoadDocument({ id: document.id }));
    }

    openEditModel() {
        this.dialogRef.close();
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'UPDATE DOCUMENT',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientDocumentFormComponent,
            dynamicComponentData: this.document,
            submitFunction: 'updateDocument',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: 0 + 'px',
                    right: 0 + 'px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }
}
