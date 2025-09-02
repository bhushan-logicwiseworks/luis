import { AsyncPipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { TranFormContactInputValuesUpperCase } from 'app/shared/components/auxilium/patient-contact-note-form';
import { PatientNote } from 'app/shared/interfaces/auxilium/patient-center/patient-note.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { QuillEditorComponent } from 'ngx-quill';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { FuseAlertComponent } from '../../../../../../../@fuse/components/alert/alert.component';
import { AuxSelectDropdownComponent } from '../../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { PatientNotesActions } from '../../../actions/patient-notes.actions';
import { PatientNotesSelectors } from '../../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-patient-contact-note-form',
    templateUrl: './patient-contact-note-form.component.html',
    styleUrls: ['./patient-contact-note-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        AuxSelectDropdownComponent,
        MatLabel,
        QuillEditorComponent,
        MatCheckbox,
        FuseAlertComponent,
        AsyncPipe,
    ],
})
export class PatientContactNoteFormComponent implements OnInit, AfterViewInit, OnDestroy {
    note: PatientNote;
    @Input() showDeleteButton: boolean = false;
    @ViewChild('quillEditor') quillEditor: QuillEditorComponent;
    quillModules: any = {
        toolbar: false,
    };
    contactType = new FormControl();
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    adduserId: number;
    showAlert: boolean = false;
    filteredOptions: Observable<any>;
    contacttype: Patient[];
    data$ = this.store.select(PatientNotesSelectors.selectContactType);
    subscription: Subscription;

    contactList$ = this.store.select(PatientNotesSelectors.selectContactTypeList).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    @ViewChild(MatAutocompleteTrigger) contactAutocomplete: MatAutocompleteTrigger;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private patientNoteData: any,
        private dialogRef: MatDialogRef<PatientContactNoteFormComponent>,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private route: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private auxUtilService: AuxUtilService
    ) {
        this.store.dispatch(PatientNotesActions.LoadContactList());
        if (patientNoteData.dynamicComponentData) {
            const noteHtml = patientNoteData.dynamicComponentData.note;
            // Clean the HTML tags only if necessary, otherwise preserve the text as-is
            const cleanedNote = this.stripHtmlTags(noteHtml);
            this.note = {
                ...patientNoteData.dynamicComponentData,
                note: cleanedNote,
            };
        }
    }

    // Utility function to strip HTML tags only when necessary and preserve formatting
    stripHtmlTags(input: string): string {
        if (!input) return '';

        const hasHtmlTags = /<[a-z][\s\S]*>/i.test(input);

        if (!hasHtmlTags) {
            return input;
        }

        // Remove "SafeHtmlImpl" wrapper if present
        let cleanedHtml = input.replace("SafeHtmlImpl {changingThisBreaksApplicationSecurity: '", '').replace("'}", '');

        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cleanedHtml;

        // Function to recursively extract text and preserve line breaks
        const extractTextWithBreaks = (node: Node): string => {
            let result = '';
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    // Preserve the text content as-is, including spaces
                    result += child.textContent;
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const element = child as HTMLElement;
                    // Add a newline for block-level elements like <P>
                    if (['P', 'DIV', 'BR'].includes(element.tagName)) {
                        result += '\n' + extractTextWithBreaks(child);
                    } else {
                        result += extractTextWithBreaks(child);
                    }
                }
            });
            return result;
        };

        // Extract text while preserving line breaks
        let text = extractTextWithBreaks(tempDiv);

        text = text.replace(/^\n+|\n+$/g, '');

        const lines = text.split('\n');
        // .map(line => line.trim())
        // .filter(line => line.length > 0);

        // Join the lines back with newlines
        return lines.join('\n');
    }

    ngOnInit(): void {
        this.adduserId = Number(this.route.url.split('/')[3]);
        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.contacttype = data;
        });

        this.contactForm = this._formBuilder.group({
            id: [0],
            contactType: ['', [Validators.required]],
            note: ['', [Validators.required]],
            message: [''],
            priority: [''],
        });

        if (this.note) {
            this.note.contactType = this.note.contactType ? this.note.contactType : '';
            this.contactForm.patchValue(this.note);
        }

        this.filteredOptions = this.contactForm.get('contactType').valueChanges.pipe(
            startWith(''),
            map(val => this.ContactTypeFilter(val))
        );
    }

    ContactTypeFilter(val: any) {
        return this.contacttype.filter((option: any) => option.code.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    onEditorReady(quillInstance: any): void {
        if (this.note && this.note.note) {
            quillInstance.setText(this.note.note.toString(), 'user');
            this._changeDetectorRef.detectChanges();
        }
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    contacthandler(event: MatAutocompleteSelectedEvent): void {
        this.contactType.setValue(event.option.value);
    }

    deleteContact(): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete contact',
            message: 'Are you sure you want to delete this contact? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result === 'confirmed') {
                    this.dialogRef.close();
                    this._changeDetectorRef.markForCheck();
                }
            });
    }

    saveContact(): void {
        let note: PatientNote = this.contactForm.value;
        const quill = this.quillEditor.quillEditor;
        const plainText = quill.getText();
        note.note = plainText;

        if (!this.isInputValid(note)) {
            return;
        }

        if (note.id == 0) {
            note.addDate = new Date();
        }
        note.entityID = this.adduserId;
        note.entityType = 'PATIENT';

        note = this.auxUtilService.transFormValuesToUpperCase(note, TranFormContactInputValuesUpperCase);
        note.priority = note.priority ? 'PRIORITY' : '';
        note.message = '';

        this.store.dispatch(PatientNotesActions.AddPatientNote({ note }));
        this.dialogRef.close();
    }

    isInputValid(contact: PatientNote): boolean {
        if (contact.contactType == '' || contact.contactType == null) {
            this.alert = {
                type: 'error',
                message: 'Contact Type cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }
        if (contact.note == '' || contact.note == null || contact.note === '<H1><BR></H1>') {
            this.alert = {
                type: 'error',
                message: 'Contact note cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }
}
