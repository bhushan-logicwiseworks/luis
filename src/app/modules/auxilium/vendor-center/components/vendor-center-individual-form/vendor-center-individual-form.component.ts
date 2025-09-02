import { AsyncPipe } from '@angular/common';
import {
    AfterViewInit,
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
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { VendorDisplay } from 'app/shared/interfaces/auxilium/vendor-center/vendor.interface';
import { NgxMaskDirective } from 'ngx-mask';
import { debounceTime, map, Observable, startWith, Subscription } from 'rxjs';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { AuxPhonePipe } from '../../../../../shared/pipes/auxilium/aux-phone.pipe';
import { VendorCenterIndividualActions } from '../../actions/vendor-center-individual.actions';
import { VendorCenterIndividualSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-vendor-center-individual-form',
    templateUrl: './vendor-center-individual-form.component.html',
    styleUrls: ['./vendor-center-individual-form.component.scss'],
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
        NgxMaskDirective,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        FuseAlertComponent,
        AsyncPipe,
        AuxPhonePipe,
    ],
})
export class VendorCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    VendorRepDisplayData: VendorDisplay;
    @Input() showDeleteButton: boolean = false;
    // @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    // @Output() save: EventEmitter<any> = new EventEmitter<any>();
    // @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    state = new FormControl();
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    usstates = states;
    stateMapping = stateMapping;
    filteredOptions: Observable<any>;
    alert: any;
    subscription: Subscription;
    dateFormat: string = constVariables.DATE_FORMAT;
    patientCityState$ = this.store.select(VendorCenterIndividualSelectors.selectPatientCityState);

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<VendorCenterIndividualFormComponent>,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService
    ) {
        this.VendorRepDisplayData = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            vendorcode: ['', [Validators.required]],
            company: ['', [Validators.required]],
            address1: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            terms: [''],
            creditlimit: [''],
            taxrate: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            fax: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            email: [''],
            adddate: [''],
            action: [''],
            notes: [''],
        });
        // Filter state
        this.filteredOptions = this.contactForm.get('state').valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );

        this.patientCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.contactForm.get('state').setValue(result.state);
                this.contactForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.contactForm.get('state').setValue('');
                this.contactForm.get('city').setValue('');
            }
        });

        if (this.VendorRepDisplayData && this.VendorRepDisplayData.state != null) {
            this.state.setValue(this.VendorRepDisplayData.state);
        } else {
            this.state.setValue('');
            this.contactForm.get('state').setValue('');
            this.contactForm.get('city').setValue('');
        }

        // Patch values to the form
        this.contactForm.patchValue(this.VendorRepDisplayData);
        const selectedOption = `${this.VendorRepDisplayData?.state}`;
        const abbreviation = this.stateMapping[selectedOption];
        this.contactForm.patchValue({
            state: abbreviation, // Send the abbreviation to the backend
        });

        this.contactForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(VendorCenterIndividualActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });
    }
    filter(val: string) {
        return this.usstates.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    ngAfterViewInit() {
        this._subscribeToClosingActions();
    }

    ngOnDestroy() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    private _subscribeToClosingActions(): void {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.stateAutocomplete.panelClosingActions.subscribe(e => {
            if (!e || !e.source) {
                this.contactForm.get('state').setValue(null);
            }
        });
    }

    statehandler(event: MatAutocompleteSelectedEvent): void {
        this.state.setValue(event.option.value);
    }
    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        this.dialogRef.close();
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        if (this.contactForm.invalid) {
            return;
        }
        // Populate the object from the screen
        let vendor: VendorDisplay = this.contactForm.value;

        // Validate input
        if (!this.isInputValid(vendor)) {
            return;
        }
        if (vendor.state != null) {
            let state = this.usstates.filter(item => item.name == vendor.state);
            vendor.state = state[0]?.abbreviation;
        }

        // Set default date when adding a new record
        if (vendor.id == 0) {
            vendor.adddate = new Date() as unknown as string;
        }

        // Transform inputs to uppercase
        vendor = this.auxUtilService.transFormValuesToUpperCase(vendor, [
            'vendorcode',
            'company',
            'address1',
            'address2',
            'city',
            'email',
            'terms',
            'notes',
        ]);
        vendor = this.auxUtilService.cleanData(vendor);
        vendor.state = this.state.value;
        // Update the contact on the server
        this.store.dispatch(VendorCenterIndividualActions.AddVendor({ vendor }));

        // trigger save event
        this.dialogRef.close();
    }

    isInputValid(contact: VendorDisplay): boolean {
        // Make sure CODE was entered. This is the only required field.
        if (contact.vendorcode == '' || contact.vendorcode == null) {
            this.alert = {
                type: 'error',
                message: 'Code cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }

    onDateChange(event, formControlName) {
        this.contactForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.contactForm,
            formControlName
        );
    }
    makeCall(): void {
        const phoneNumber = this.contactForm.get('phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }
}
