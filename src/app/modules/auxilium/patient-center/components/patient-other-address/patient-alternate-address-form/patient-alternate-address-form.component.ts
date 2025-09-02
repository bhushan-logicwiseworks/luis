import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import {
    TranFormAlterNateUpperCase,
    TransFormAlterNateDateValues,
} from 'app/shared/components/auxilium/patient-alternate-address-form';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { PatientOtherAddress } from 'app/shared/interfaces/auxilium/patient-center/patient-alternate-address.interface';
import { debounceTime, map, Observable, startWith, Subscription } from 'rxjs';
import { State } from '../../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { PatientAlternateAddressActions } from '../../../actions/patient-alternate-address.action';
import { PatientOtherAddressSelectors } from '../../../reducers';
import { MatFormField, MatLabel, MatPrefix, MatSuffix, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatDatepickerToggle, MatDatepickerInput, MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { Numbers } from '../../../../../../shared/directives/auxilium/aux-numbers.directive';
import { NgxMaskDirective } from 'ngx-mask';
import { FuseAlertComponent } from '../../../../../../../@fuse/components/alert/alert.component';
import { AsyncPipe } from '@angular/common';
import { AuxPhonePipe } from '../../../../../../shared/pipes/auxilium/aux-phone.pipe';
@UntilDestroy()
@Component({
    selector: 'ac-patient-alternate-address-form',
    templateUrl: './patient-alternate-address-form.component.html',
    styleUrls: ['./patient-alternate-address-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatSelect,
        MatOption,
        MatDatepickerToggle,
        MatSuffix,
        MatInput,
        MatDatepickerInput,
        MatDatepicker,
        MatError,
        MatAutocompleteTrigger,
        MatAutocomplete,
        Numbers,
        NgxMaskDirective,
        FuseAlertComponent,
        AsyncPipe,
        AuxPhonePipe,
    ],
})
export class PatientAlternateAddressFormComponent implements OnInit, OnDestroy {
    @Input() address: PatientOtherAddress;
    @Input() showDeleteButton: boolean = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    addressForm: UntypedFormGroup;
    patientCityState$ = this.store.select(PatientOtherAddressSelectors.selectPatientCityState);
    editMode: boolean = false;
    alert: any;
    entityId;
    usstates = states;
    stateMapping = stateMapping;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    showAlert: boolean = false;
    state = new FormControl();
    subscription: Subscription;
    dateFormat: string = constVariables.DATE_FORMAT;

    @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<PatientAlternateAddressFormComponent>,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private route: Router,
        private auxUtilService: AuxUtilService
    ) {
        this.address = data.dynamicComponentData;
        this.filteredStates = this.state.valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );
    }

    ngOnInit(): void {
        this.entityId = this.route.url.split('/')[3];
        // Create the address form
        this.addressForm = this._formBuilder.group({
            id: [0],
            addresstype: ['', [Validators.required]],
            firstname: ['', [Validators.required]],
            middlename: [''],
            lastname: ['', [Validators.required]],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            relationship: [''],
            email: [''],
            effectivedate: ['', [Validators.required]],
            expiredate: ['', [Validators.required]],
            adddate: [''],
            adduserid: [''],
        });

        this.addressForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(PatientAlternateAddressActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });

        this.patientCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.addressForm.get('state').setValue(result.state);
                this.addressForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.addressForm.get('state').setValue('');
                this.addressForm.get('city').setValue('');
            }
        });
        // Patch values to the form
        this.addressForm.patchValue(this.address, { emitEvent: false });
        this.state.setValue(this.address.state);
    }

    ngOnDestroy() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
        this.store.dispatch(PatientAlternateAddressActions.ResetState());
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    handler(event: MatAutocompleteSelectedEvent): void {
        this.state.setValue(event.option.value);
    }

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
        if (this.addressForm.invalid) {
            return;
        }
        // Populate the object from the screen
        let address: PatientOtherAddress = this.addressForm.value;
        if (!this.isInputValid(address)) {
            return;
        }

        // Set default date when adding a new record
        //if (address.id == 0) {
        address.adddate = new Date();
        address.entityid = this.entityId;
        address.entitytype = 'PATIENT';
        //}

        // Transform inputs to uppercase
        address = this.auxUtilService.transFormValuesToUpperCase(address, TranFormAlterNateUpperCase);

        address = this.auxUtilService.formatDateFields(address, TransFormAlterNateDateValues);

        address = this.auxUtilService.cleanData(address);
        address.state = this.state.value;
        // Update the contact on the server
        this.store.dispatch(PatientAlternateAddressActions.AddAlternateAddress({ address }));

        // trigger save event
        this.save.emit();
        this.dialogRef.close();
    }

    isInputValid(address: PatientOtherAddress): boolean {
        // Make sure SALES CODE was entered. This is the only required field.
        if (address.addresstype == '' || address.addresstype == null) {
            this.alert = {
                type: 'error',
                message: 'Sales Code cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }
        return true;
    }

    onDateChange(event, formControlName) {
        this.addressForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.addressForm,
            formControlName
        );
    }

    private _filterStates(value: string): State[] {
        const filterValue = value.toLowerCase().replace(/\s+/g, ' ');
        return this.usstates.filter(
            state =>
                state.name.toLowerCase().replace(/\s+/g, ' ').includes(filterValue) ||
                state.abbreviation.toLowerCase().includes(filterValue)
        );
    }

    makeCall(): void {
        const phoneNumber = this.addressForm.get('phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }
}
