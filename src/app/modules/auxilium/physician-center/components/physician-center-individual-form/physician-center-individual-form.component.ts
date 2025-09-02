import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { PatientCenterDeatilsActions } from 'app/modules/auxilium/patient-center/actions/patient-details.action';
import { PatientCenterDetailsSelectors } from 'app/modules/auxilium/patient-center/reducers';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { PhysicianDisplay } from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import { debounceTime, map, Observable, startWith, Subscription } from 'rxjs';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { PhysicianCenterTableActions } from '../../actions/physician-center-table.actions';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ac-physician-center-individual-form',
    templateUrl: './physician-center-individual-form.component.html',
    styleUrls: ['./physician-center-individual-form.component.scss'],
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
        MatSuffix,
        MatAutocomplete,
        MatOption,
        MatSelect,
        FuseAlertComponent,
        AsyncPipe,
    ],
})
export class PhysicianCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    contact: PhysicianDisplay;
    @Input() showDeleteButton: boolean = false;
    @Input() formType: string;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    state = new FormControl();
    data: PhysicianDisplay;
    contactForm: UntypedFormGroup;
    alert: any;
    usstates = states;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    stateMapping = stateMapping;
    showAlert: boolean = false;
    patientCityState$ = this.store.select(PatientCenterDetailsSelectors.selectPatientCityState);
    subscription: Subscription;
    pecosOptions = [
        {
            option: '',
            value: '',
        },
        {
            option: 'Yes',
            value: 'Y',
        },
        {
            option: 'No',
            value: 'N',
        },
    ];

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    @ViewChild('autoInput', { read: MatAutocompleteTrigger }) taxAutocomplete: MatAutocompleteTrigger;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<PhysicianCenterIndividualFormComponent>
    ) {
        this.filteredStates = this.state.valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );
    }

    ngOnInit(): void {
        this.contactForm = this._formBuilder.group({
            id: [0],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            npi: ['', [Validators.required]],
            address1: ['', [Validators.required]],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            zip: ['', [Validators.required]],
            assignment: [this.pecosOptions[0].value, [Validators.required]],
        });

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

        this.contactForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (this.formType === 'edit') {
                    if (result !== '' && result !== this.contact.zip) {
                        this.store.dispatch(PatientCenterDeatilsActions.LoadCityAndStateDropDown({ zipCode: result }));
                    }
                } else {
                    if (result !== '') {
                        this.store.dispatch(PatientCenterDeatilsActions.LoadCityAndStateDropDown({ zipCode: result }));
                    }
                }
            });
    }

    ngAfterViewInit() {
        this._subscribeToClosingActions();
    }

    ngOnDestroy() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
            this.contactForm.reset();
        }
    }

    private _subscribeToClosingActions(): void {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.stateAutocomplete.panelClosingActions.pipe(untilDestroyed(this)).subscribe(e => {
            if (!e || !e.source) {
                this.contactForm.get('state').setValue(null);
            }
        });
    }
    /**
     * Save the contact
     */
    saveContact(): void {
        this.contactForm.get('state').setValue(this.state.value);
        if (this.contactForm.invalid) {
            return;
        }

        // Populate the object from the screen
        let physician: PhysicianDisplay = this.contactForm.value;

        physician = this.auxUtilService.transFormValuesToUpperCase(physician, [
            'firstName',
            'lastName',
            'address1',
            'city',
            'state',
        ]);

        this.store.dispatch(PhysicianCenterTableActions.QuickAddPhysician({ physician }));
        this.save.emit();
        this.dialogRef.close();
        this.contactForm.reset();
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    private _filterStates(value: string): State[] {
        const filterValue = value.toLowerCase().replace(/\s+/g, ' ');
        return this.usstates.filter(
            state =>
                state.name.toLowerCase().replace(/\s+/g, ' ').includes(filterValue) ||
                state.abbreviation.toLowerCase().includes(filterValue)
        );
    }
}
