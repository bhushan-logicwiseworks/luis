import { Component, Inject, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { PatientCenterDeatilsActions } from 'app/modules/auxilium/patient-center/actions/patient-details.action';
import { EmergencyContactsActions } from 'app/modules/auxilium/patient-center/actions/patient-emergency-contacts.action';
import { EmergencyContactsSelectors } from 'app/modules/auxilium/patient-center/reducers';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { states } from 'app/shared/components/auxilium/states';
import {
    PatientEmergencyContact,
    TranFormInputValuesUpperCase,
} from 'app/shared/interfaces/auxilium/patient-center/patient-emergency-contacts.interface';
import { debounceTime, map, Observable, startWith, Subject, Subscription } from 'rxjs';
import { State } from '../../../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { Numbers } from '../../../../../../../shared/directives/auxilium/aux-numbers.directive';
import { NgxMaskDirective } from 'ngx-mask';
import { FuseAlertComponent } from '../../../../../../../../@fuse/components/alert/alert.component';
import { AsyncPipe } from '@angular/common';
import { AuxPhonePipe } from '../../../../../../../shared/pipes/auxilium/aux-phone.pipe';

@UntilDestroy()
@Component({
    selector: 'ac-patient-emergency-contact-form',
    templateUrl: './patient-emergency-contact-form.component.html',
    styleUrls: ['./patient-emergency-contact-form.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatSelect,
        MatOption,
        MatCheckbox,
        MatInput,
        MatAutocompleteTrigger,
        MatSuffix,
        MatAutocomplete,
        Numbers,
        NgxMaskDirective,
        FuseAlertComponent,
        AsyncPipe,
        AuxPhonePipe,
    ],
})
export class PatientEmergencyContactFormComponent implements OnInit, OnChanges, OnDestroy {
    emergencyContact: PatientEmergencyContact;
    showDeleteButton: boolean = false;
    formType: string;

    state = new FormControl();
    subscription: Subscription;
    dateFormat: string = constVariables.DATE_FORMAT;
    emergencyContactForm: UntypedFormGroup;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    alert: any;
    refresh = new Subject();
    usstates = states;
    ranks: number[] = [1, 2, 3, 4, 5];
    patientCityState$ = this.store.select(EmergencyContactsSelectors.selectPatientCityState);
    relationShipDorpDownValue = [
        {
            name: 'Spouse/significant other',
        },
        {
            name: 'Son/daughter',
        },
        {
            name: 'Parent/guardian',
        },
        {
            name: 'Sibling/family member',
        },
        {
            name: 'Friend/neighbor',
        },
        {
            name: 'Clinician',
        },
        {
            name: 'Case Manager',
        },
    ];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private actions$: Actions,
        private dialogRef: MatDialogRef<PatientEmergencyContactFormComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private auxUtilService: AuxUtilService,
        private router: Router
    ) {
        (this.emergencyContact = data.dynamicComponentData),
            (this.filteredStates = this.state.valueChanges.pipe(
                startWith(''),
                map(state => (state ? this._filterStates(state) : this.usstates.slice()))
            ));
    }

    ngOnInit(): void {
        const patientId = Number(this.router.url.split('/')[3]);
        // Create the Emergency Contact form
        this.emergencyContactForm = this._formBuilder.group({
            id: [0],
            patientId: [patientId],
            rank: [1],
            firstname: [''],
            lastname: [''],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: [''],
            cell: [''],
            relationship: [''],
            email: [''],
            type: [''],
            isactive: [true],
            isdeleted: [false],
            isEmergency: [true],
            isAuthorized: [false],
        });

        this.emergencyContactForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(EmergencyContactsActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });

        // Get the city and state based on the zip code
        this.patientCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.emergencyContactForm.get('state').setValue(result.state);
                this.emergencyContactForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.emergencyContactForm.get('state').setValue('');
                this.emergencyContactForm.get('city').setValue('');
            }
        });

        // Patch values to the form
        this.emergencyContactForm.patchValue(this.emergencyContact, { emitEvent: false });
        if (this.emergencyContact && this.emergencyContact.state != null) {
            this.state.setValue(this.emergencyContact.state);
        } else {
            this.state.setValue('');
            this.emergencyContactForm.get('state').setValue('');
            this.emergencyContactForm.get('city').setValue('');
        }
        this.emergencyContactForm.get('relationship').setValue(this.emergencyContact.relationship.toUpperCase());

        this.actions$
            .pipe(ofType(EmergencyContactsActions.Refresh, PatientCenterDeatilsActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    ngOnDestroy(): void {
        this.store.dispatch(EmergencyContactsActions.ResetState());
        this.emergencyContactForm.get('city').setValue('');
        this.emergencyContactForm.get('state').setValue('');
        this.emergencyContactForm.get('zip').setValue('');
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.emergencyContactForm && changes['emergencyContact']?.currentValue) {
            this.emergencyContactForm.patchValue(this.emergencyContact);
        }
    }

    saveEmergencyContact() {
        // Populate the object from the screen
        let emergencyContact: PatientEmergencyContact = this.emergencyContactForm.value;

        emergencyContact = this.auxUtilService.transFormValuesToUpperCase(
            emergencyContact,
            TranFormInputValuesUpperCase
        );

        this.store.dispatch(EmergencyContactsActions.AddEmergencyContact({ emergencyContact }));

        // trigger save event
        this.dialogRef.close();
    }

    onDateChange(event, formControlName) {
        this.emergencyContactForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.emergencyContactForm,
            formControlName
        );
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    trackByFnForRelationship(index: number, item: any): any {
        return item ? item.id : undefined;
    }

    private _filterStates(value: string): State[] {
        const filterValue = value.toLowerCase().replace(/\s+/g, ' ');
        return this.usstates.filter(
            state =>
                state.name.toLowerCase().replace(/\s+/g, ' ').includes(filterValue) ||
                state.abbreviation.toLowerCase().includes(filterValue)
        );
    }
    makeCall(type: string): void {
        const phoneNumber = this.emergencyContactForm.get(type == 'Cell' ? 'cell' : 'phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }
}
