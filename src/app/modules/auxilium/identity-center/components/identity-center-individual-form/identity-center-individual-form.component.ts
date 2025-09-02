import {
    AfterViewInit,
    ChangeDetectorRef,
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
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { IdentityDisplay } from 'app/shared/interfaces/auxilium/identity-center/identity.interface';
import { Observable } from 'rxjs';
import { IdentityCenterIndividualActions } from '../../actions/identity-center-individual.actions';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'ac-identity-center-individual-form',
    templateUrl: './identity-center-individual-form.component.html',
    styleUrls: ['./identity-center-individual-form.component.scss'],
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
export class IdentityCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() contact: IdentityDisplay;
    @Input() showDeleteButton: boolean = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    //data: UserDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    showAlert: boolean = false;
    filteredOptions: Observable<any>;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.contact = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            uid: [''],
            displayName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
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
        const user: IdentityDisplay = this.contactForm.value;

        // Update the contact on the server
        this.store.dispatch(IdentityCenterIndividualActions.AddUser({ user }));

        // trigger save event
        this.save.emit();
    }

    isInputValid(contact: IdentityDisplay): boolean {
        // Make sure SALES CODE was entered. This is the only required field.
        if (contact.displayName == '' || contact.displayName == null) {
            this.alert = {
                type: 'error',
                message: 'DisplayName cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }
}
