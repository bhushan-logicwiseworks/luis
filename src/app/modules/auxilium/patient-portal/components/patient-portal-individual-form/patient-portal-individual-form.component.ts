import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { PatientPortalUserDisplay } from 'app/shared/interfaces/auxilium/patient-portal/patient-portal-user.interface';
import { Observable } from 'rxjs';
import { PatientPortalIndividualActions } from '../../actions/patient-portal-individual.actions';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-portal-individual-form',
    templateUrl: './patient-portal-individual-form.component.html',
    styleUrls: ['./patient-portal-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        FuseAlertComponent,
    ],
})
export class PatientPortalIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() contact: PatientPortalUserDisplay;
    @Input() showDeleteButton: boolean = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    data: PatientPortalUserDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    showAlert: boolean = false;
    filteredOptions: Observable<any>;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private dialogRef: MatDialogRef<PatientPortalIndividualFormComponent>
    ) {}

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            patientId: ['', [Validators.required]],
            registeredEmail: ['', [Validators.required]],
        });

        // Patch values to the form
        this.contactForm.patchValue(this.contact);
    }

    ngAfterViewInit() {}

    ngOnDestroy() {}

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        this.cancel.emit(editMode);
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        // Populate the object from the screen
        const user: PatientPortalUserDisplay = this.contactForm.value;

        // Transform inputs to uppercase
        user.registeredEmail = user.registeredEmail ? user.registeredEmail.toUpperCase() : '';

        //console.log(user);

        // Update the contact on the server
        this.store.dispatch(PatientPortalIndividualActions.AddPPUser({ user }));

        // trigger save event
        this.save.emit();
        this.dialogRef.close();
    }

    isInputValid(contact: PatientPortalUserDisplay): boolean {
        // Make sure SALES CODE was entered. This is the only required field.
        if (contact.guid == '' || contact.guid == null) {
            this.alert = {
                type: 'error',
                message: 'Guid cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }
}
