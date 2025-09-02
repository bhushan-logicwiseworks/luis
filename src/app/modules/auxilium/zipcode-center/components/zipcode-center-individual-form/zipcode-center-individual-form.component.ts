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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { ZipCodeDisplay } from 'app/shared/interfaces/auxilium/zipcode-center/zipcode.interface';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { ZipCodeCenterIndividualActions } from '../../actions/zipcode-center-individual.actions';

@UntilDestroy()
@Component({
    selector: 'ac-zipcode-center-individual-form',
    templateUrl: './zipcode-center-individual-form.component.html',
    styleUrls: ['./zipcode-center-individual-form.component.scss'],
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
        AsyncPipe,
    ],
})
export class ZipCodeCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    zipCodeDisplayData: ZipCodeDisplay;
    @Input() showDeleteButton: boolean = false;

    state = new FormControl();
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    usstates = states;
    stateMapping = stateMapping;
    filteredOptions: Observable<any>;
    alert: any;
    subscription: Subscription;
    dateFormat: string = constVariables.DATE_FORMAT;

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<ZipCodeCenterIndividualFormComponent>,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService
    ) {
        this.zipCodeDisplayData = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            zipcode: ['', [Validators.required]],
            state: [''],
            city: [''],
        });
        // Filter state
        this.filteredOptions = this.contactForm.get('state').valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );

        // Patch values to the form
        this.contactForm.patchValue(this.zipCodeDisplayData);
        const selectedOption = `${this.zipCodeDisplayData?.state}`;
        const abbreviation = this.stateMapping[selectedOption];
        this.contactForm.patchValue({
            state: abbreviation, // Send the abbreviation to the backend
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
     * Save the contact
     */
    saveContact(): void {
        if (this.contactForm.invalid) {
            return;
        }
        // Populate the object from the screen
        let zipcodeRep: ZipCodeDisplay = this.contactForm.value;

        // Validate input
        if (!this.isInputValid(zipcodeRep)) {
            return;
        }
        if (zipcodeRep.state != null) {
            let state = this.usstates.filter(item => item.name == zipcodeRep.state);
            zipcodeRep.state = state[0].abbreviation;
        }

        // Set default date when adding a new record
        if (zipcodeRep.id == 0) {
            zipcodeRep.adddate = new Date() as unknown as string;
        }

        // Transform inputs to uppercase
        zipcodeRep = this.auxUtilService.transFormValuesToUpperCase(zipcodeRep, ['zipcode', 'city', 'state']);
        zipcodeRep = this.auxUtilService.cleanData(zipcodeRep);

        // Update the contact on the server
        this.store.dispatch(ZipCodeCenterIndividualActions.AddZipCode({ zipcode: zipcodeRep }));

        // trigger save event
        this.dialogRef.close();
    }

    isInputValid(contact: ZipCodeDisplay): boolean {
        // Make sure CODE was entered. This is the only required field.
        if (contact.zipcode == '' || contact.zipcode == null) {
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
}
