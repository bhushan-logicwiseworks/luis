import { CommonModule } from '@angular/common';
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
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AbbottUserDisplay } from 'app/shared/interfaces/auxilium/abbott-center/abbottuser.interface';
import { Observable } from 'rxjs';
import { AbbottCenterIndividualActions } from '../../actions/abbott-center-individual.actions';

@UntilDestroy()
@Component({
    selector: 'app-abbott-center-individual-form',
    templateUrl: './abbott-center-individual-form.component.html',
    styleUrls: ['./abbott-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatLabel,
        // MaterialModule,
        // ...add any other required standalone components/modules...
    ],
})
export class AbbottCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() user: AbbottUserDisplay;
    @Input() showDeleteButton: boolean = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    abbottUserForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    showAlert: boolean = false;
    filteredOptions: Observable<any>;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<any>
    ) {
        this.user = data.dynamicComponentData;
    }

    ngOnInit(): void {
        this.abbottUserForm = this._formBuilder.group({
            id: [0],
            email: ['', [Validators.required]],
            zipcodes: ['', [Validators.required]],
            addedby: [''],
            addeddate: [''],
            modifiedby: [''],
            modifieddate: [''],
        });

        // Patch values to the form
        this.abbottUserForm.patchValue(this.user);
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
        this.dialogRef.close();
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        if (this.abbottUserForm.invalid) {
            return;
        }

        // Populate the object from the screen
        const user: AbbottUserDisplay = this.abbottUserForm.value;
        // Set default date when adding a new record
        if (user.id == 0) {
            user.addeddate = new Date().toISOString();
            const originalDate = new Date(user.addeddate);
            user.addeddate = originalDate.toISOString();
            user.modifieddate = originalDate.toISOString();
            // user.adddate = new Date() as unknown as string;
        }

        user.email = user.email ? user.email.toUpperCase() : '';

        // console.dir('user ====>');
        // console.dir(user);
        // Update the contact on the server
        this.store.dispatch(AbbottCenterIndividualActions.AddUser({ user }));
        // trigger save event
        this.save.emit();
        this.dialogRef.close();
    }

    isInputValid(user: AbbottUserDisplay): boolean {
        if (user.email == '' || user.email == null) {
            this.alert = {
                type: 'error',
                message: 'Email cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        if (user.zipcodes == '' || user.zipcodes == null) {
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
