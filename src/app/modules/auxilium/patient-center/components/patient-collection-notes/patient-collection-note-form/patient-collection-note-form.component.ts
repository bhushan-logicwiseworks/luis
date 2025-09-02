import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { TranFormContactInputValuesUpperCase } from 'app/shared/components/auxilium/patient-contact-note-form';
import { PatientNote } from 'app/shared/interfaces/auxilium/patient-center/patient-note.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { PatientCollectionNotesActions } from '../../../actions/patient-collection-notes.actions';
import { PatientCollectionNotesSelectors } from '../../../reducers';
import { AuxSelectDropdownComponent } from '../../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { FuseAlertComponent } from '../../../../../../../@fuse/components/alert/alert.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ac-patient-collection-note-form',
    templateUrl: './patient-collection-note-form.component.html',
    styleUrls: ['./patient-collection-note-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        AuxSelectDropdownComponent,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        CdkTextareaAutosize,
        MatCheckbox,
        FuseAlertComponent,
        AsyncPipe,
    ],
})
export class PatientCollectionNoteFormComponent implements OnInit, AfterViewInit, OnDestroy {
    note: PatientNote;
    contactType = new FormControl();
    data: PatientNote;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    adduserId: number;
    showAlert: boolean = false;
    filteredOptions: Observable<any>;
    contacttype: Patient[];
    // data$ = this.store.select(PatientCollectionNotesSelectors.selectContactType);
    subscription: Subscription;

    // Contact Dropdown
    contactList$ = this.store.select(PatientCollectionNotesSelectors.selectContactTypeList).pipe(
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
        private dialogRef: MatDialogRef<PatientCollectionNoteFormComponent>,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private route: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private auxUtilService: AuxUtilService
    ) {
        this.note = patientNoteData?.dynamicComponentData;
    }

    ngOnInit(): void {
        this.adduserId = Number(this.route.url.split('/')[3]);
        // Create the address form
        this.contactForm = this._formBuilder.group({
            id: [0],
            contactType: ['', [Validators.required]],
            note: ['', [Validators.required]],
            message: [''],
            priority: [''],
        });
        if (this.note) {
            // Patch values to the form
            this.note.contactType = this.note.contactType ? this.note.contactType : '';
            this.contactForm.patchValue(this.note);
        }
        // Filter state
        this.filteredOptions = this.contactForm.get('contactType').valueChanges.pipe(
            startWith(''),
            map(val => this.ContactTypeFilter(val))
        );
    }

    ContactTypeFilter(val: any) {
        return this.contacttype.filter((option: any) => option.code.toLowerCase().indexOf(val?.toLowerCase()) === 0);
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

    /**
     * Delete the contact
     */
    deleteContact(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete contact',
            message: 'Are you sure you want to delete this contact? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                    // Get the current contact's id
                    // const id: number = this.note.id;

                    // Delete the contact
                    // this.store.dispatch(SalesCenterIndividualActions.DeleteSalesRep({ id }));
                    // this.delete.emit();

                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                    this.dialogRef.close();
                }
            });
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        // Populate the object from the screen
        let note: PatientNote = this.contactForm.value;

        // Validate input
        if (!this.isInputValid(note)) {
            return;
        }

        // Set default date when adding a new record
        if (note.id == 0) {
            note.addDate = new Date();
        }

        note.entityID = this.adduserId;
        note.entityType = 'PATIENT';

        // Transform inputs to uppercase
        note = this.auxUtilService.transFormValuesToUpperCase(note, TranFormContactInputValuesUpperCase);
        note.priority = note.priority ? 'PRIORITY' : '';

        //console.log('note data =>', note)

        // Update the contact on the server
        this.store.dispatch(PatientCollectionNotesActions.AddPatientCollectionNote({ note }));
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

        if (contact.note == '' || contact.note == null) {
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
