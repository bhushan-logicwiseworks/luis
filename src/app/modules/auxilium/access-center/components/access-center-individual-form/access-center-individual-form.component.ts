import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AppName } from 'app/shared/components/auxilium/appName';
import { AccessDisplay } from 'app/shared/interfaces/auxilium/access-center/access.interface';
import { Observable, map, startWith } from 'rxjs';
import { AccessCenterIndividualActions } from '../../actions/access-center-individual.actions';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ac-access-center-individual-form',
    templateUrl: './access-center-individual-form.component.html',
    styleUrls: ['./access-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatOption,
        MatSelect,
        MatCheckbox,
        FuseAlertComponent,
        AsyncPipe,
    ],
})
export class AccessCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    contact: AccessDisplay;
    @Input() showDeleteButton: boolean = false;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    showAlert: boolean = false;
    appname = AppName;
    filteredOptions: Observable<any>;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private accessDisplayData: any,
        private dialogRef: MatDialogRef<AccessCenterIndividualFormComponent>,
        private _formBuilder: UntypedFormBuilder,
        private store: Store
    ) {
        this.contact = accessDisplayData.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            email: ['', [Validators.required]],
            appName: ['', [Validators.required]],
            key: ['', [Validators.required]],
            value: ['', [Validators.required]],
            isActive: [true],
            accessLevel: [0],
        });
        // Filter App Name
        this.filteredOptions = this.contactForm.get('appName').valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );
        // Patch values to the form
        this.contactForm.patchValue(this.contact);
    }

    filter(val: string) {
        return this.appname.filter((option: any) => option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    ngAfterViewInit() {}

    ngOnDestroy(): void {}

    /**
     * Save the contact
     */
    saveContact(): void {
        // Populate the object from the screen
        const access: AccessDisplay = this.contactForm.value;

        if (!this.isInputValid(access)) {
            return;
        }

        // Transform inputs to uppercase
        access.email = access.email ? access.email.toUpperCase() : '';
        access.key = access.key ? access.key.toUpperCase() : '';
        access.value = access.value ? access.value.toUpperCase() : '';

        //console.log(access);

        // Update the contact on the server
        this.store.dispatch(AccessCenterIndividualActions.AddAccess({ access }));
        this.dialogRef.close();
    }

    isInputValid(contact: AccessDisplay): boolean {
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

        return true;
    }

    onAppChange(event: MatAutocompleteSelectedEvent) {
        var app = event.option.value;
        switch (app.toUpperCase()) {
            case 'PATIENTAPP':
                this.contactForm.controls['key'].setValue('patientid');
                break;
            case 'REFERRALSOURCEPORTAL':
                this.contactForm.controls['key'].setValue('referid');
                break;
            case 'SALESREPAPP':
                this.contactForm.controls['key'].setValue('salesid');
                break;
            default:
                this.contactForm.controls['key'].setValue('NetworkName');
                break;
        }
    }
}
