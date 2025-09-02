import {
    AfterViewInit,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { DexcomUserDisplay } from 'app/shared/interfaces/auxilium/dexcom-center/dexcomuser.interface';
import { Observable } from 'rxjs';
import { DexcomCenterIndividualActions } from '../../actions/dexcom-center-individual.actions';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'ac-dexcom-center-individual-form',
    templateUrl: './dexcom-center-individual-form.component.html',
    styleUrls: ['./dexcom-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        CdkTextareaAutosize,
        FuseAlertComponent,
    ],
})
export class DexcomCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() contact: DexcomUserDisplay;
    @Input() showDeleteButton: boolean = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    showAlert: boolean = false;
    filteredOptions: Observable<any>;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private dialogRef: MatDialogRef<DexcomCenterIndividualFormComponent>
    ) {
        this.contact = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            //email: ['', [Validators.required]],
            email: [''],
            zipcodes: [''],
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
        const user: DexcomUserDisplay = this.contactForm.value;

        // Validate input
        /* if (!this.isInputValid(user)) {
            return;
        } */

        // Transform inputs to uppercase
        user.email = user.email ? user.email.toUpperCase() : '';

        // Update the contact on the server
        this.store.dispatch(DexcomCenterIndividualActions.AddUser({ user }));

        // trigger save event
        this.save.emit();
        this.dialogRef.close();
    }

    isInputValid(contact: DexcomUserDisplay): boolean {
        // Make sure SALES CODE was entered. This is the only required field.
        if (contact.email == '' || contact.email == null) {
            this.alert = {
                type: 'error',
                message: 'Email cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        if (contact.zipcodes == '' || contact.zipcodes == null) {
            this.alert = {
                type: 'error',
                message: 'Zip cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }
}
