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
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Categories } from 'app/shared/components/auxilium/categories';
import { stateMapping, states } from 'app/shared/components/auxilium/states';
import { ReferralDisplay } from 'app/shared/interfaces/auxilium/referral-center/referral.interface';
import { debounceTime, map, Observable, startWith, Subscription } from 'rxjs';
import { ReferralCenterIndividualActions } from '../../actions/referral-center-individual.actions';
import { ReferralCenterTableActions } from '../../actions/referral-center-table.actions';
import { ReferralCenterTableSelectors } from '../../reducers';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { NgSelectComponent, NgOptionTemplateDirective } from '@ng-select/ng-select';
import { NgxMaskDirective } from 'ngx-mask';
import { MatCheckbox } from '@angular/material/checkbox';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AsyncPipe } from '@angular/common';
import { AuxPhonePipe } from '../../../../../shared/pipes/auxilium/aux-phone.pipe';

@UntilDestroy()
@Component({
    selector: 'ac-referral-center-individual-form',
    templateUrl: './referral-center-individual-form.component.html',
    styleUrls: ['./referral-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        MatSelect,
        MatOption,
        MatAutocompleteTrigger,
        MatAutocomplete,
        NgSelectComponent,
        NgOptionTemplateDirective,
        NgxMaskDirective,
        MatCheckbox,
        CdkTextareaAutosize,
        AsyncPipe,
        AuxPhonePipe,
    ],
})
export class ReferralCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() contact: ReferralDisplay;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();
    territory = new FormControl();
    data: ReferralDisplay;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    salesRepList: any;
    usstates = states;
    categories = Categories;
    stateMapping = stateMapping;
    filteredOptions: Observable<any>;
    filteredCategories: Observable<any>;
    data$ = this.store.select(ReferralCenterTableSelectors.selectActive);
    patientCityState$ = this.store.select(ReferralCenterTableSelectors.selectZipCode);
    subscription: Subscription;

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    @ViewChild('autoInput', { read: MatAutocompleteTrigger }) categoryAutocomplete: MatAutocompleteTrigger;
    constructor(
        private dialogRef: MatDialogRef<ReferralCenterIndividualFormComponent>,
        private _formBuilder: UntypedFormBuilder,
        private store: Store
    ) {}

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            referCode: [''],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            salesId: ['', [Validators.required]],
            company: [''],
            title: [''],
            address: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            fax: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            email: [''],
            notes: [''],
            territory: [''],
            status: [''],
            taxId: [''],
            npi: [''],
            provider: [''],
            taxonomy: [''],
            addUserid: [''],
            doesOptIn: [true],
        });

        this.contactForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '' && result !== this.contact?.zip) {
                    this.store.dispatch(ReferralCenterTableActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });

        this.patientCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.contactForm.get('state').setValue(result.state);
                this.contactForm.get('city').setValue(result.city);
            }
        });

        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.salesRepList = data;
        });

        // Filter state
        this.filteredOptions = this.contactForm.get('state').valueChanges.pipe(
            startWith(''),
            map(val => this.stateFilter(val))
        );

        // Filter Categories
        this.filteredCategories = this.contactForm.get('territory').valueChanges.pipe(
            startWith(''),
            map(val => this.CategoryFilter(val))
        );

        // Patch values to the form
        this.contactForm.patchValue(this.contact);
    }

    CategoryFilter(val: string) {
        return this.categories.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    stateFilter(val: string) {
        return this.usstates.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    ngAfterViewInit() {
        this._subscribeToClosingActions();
    }

    ngOnDestroy() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
        this.store.dispatch(ReferralCenterTableActions.ResetStateZipCode());
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
        this.subscription = this.categoryAutocomplete.panelClosingActions.subscribe(e => {
            if (!e || !e.source) {
                this.contactForm.get('territory').setValue(null);
            }
        });
    }

    categoryhandler(event: MatAutocompleteSelectedEvent): void {
        this.territory.setValue(event.option.value);
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
        // Populate the object from the screen
        const referral: ReferralDisplay = this.contactForm.value;

        /* if (!this.isInputValid(referral)) {
            return;
        } */

        // Transform inputs to uppercase
        referral.referCode = referral.referCode.toUpperCase();
        referral.company = referral.company.toUpperCase();
        referral.title = referral.title.toUpperCase();
        referral.status = referral.status.toUpperCase();
        referral.firstName = referral.firstName.toUpperCase();
        referral.lastName = referral.lastName.toUpperCase();
        referral.address = referral.address.toUpperCase();
        referral.address = referral.address.toUpperCase();
        referral.city = referral.city.toUpperCase();
        referral.state = referral.state.toUpperCase();
        referral.email = referral.email.toUpperCase();
        referral.territory = referral.territory.toUpperCase();
        referral.notes = referral.notes.toUpperCase();

        // Update the contact on the server
        this.store.dispatch(ReferralCenterIndividualActions.UpdateReferral({ referral }));

        // trigger save event
        this.save.emit();
        this.dialogRef.close();
    }

    isInputValid(contact: ReferralDisplay): boolean {
        // Make sure REFER CODE was entered. This is the only required field.
        if (contact.referCode == '' || contact.referCode == null) {
            this.alert = {
                type: 'error',
                message: 'Refer Code cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }
}
