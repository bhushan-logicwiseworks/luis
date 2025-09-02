import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatSuffix, MatPrefix } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { Categories } from 'app/shared/components/auxilium/categories';
import { states } from 'app/shared/components/auxilium/states';
import { TranFormInputValues } from 'app/shared/components/auxilium/work-order-details.enum';
import { ReferralDetails, ReferralDisplay } from 'app/shared/interfaces/auxilium/referral-center/referral.interface';
import { Validation } from 'app/shared/interfaces/auxilium/validation-center/validation.interface';
import { Observable, Subject, Subscription, debounceTime, map, startWith, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { ReferralCenterIndividualActions } from '../../actions/referral-center-individual.actions';
import { ReferralCenterTableActions } from '../../actions/referral-center-table.actions';
import { ReferralCenterTableSelectors } from '../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgxMaskDirective } from 'ngx-mask';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AsyncPipe } from '@angular/common';
import { AuxPhonePipe } from '../../../../../shared/pipes/auxilium/aux-phone.pipe';

@UntilDestroy()
@Component({
    selector: 'app-referral-demographics',
    templateUrl: './referral-demographics.component.html',
    styleUrls: ['./referral-demographics.component.scss'],
    animations: fuseAnimations,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
    ],
    imports: [
        ReactiveFormsModule,
        FuseHorizontalNavigationComponent,
        MatIcon,
        MatFormField,
        MatLabel,
        MatInput,
        MatAutocompleteTrigger,
        MatSuffix,
        MatAutocomplete,
        MatOption,
        MatCheckbox,
        MatPrefix,
        NgxMaskDirective,
        MatSelect,
        CdkTextareaAutosize,
        AsyncPipe,
        AuxPhonePipe,
    ],
})
export class ReferralDemographicsComponent {
    territory = new FormControl();
    state = new FormControl();
    referralDetails: ReferralDetails;
    categories = Categories;
    salesRepList: any;
    referralForm: FormGroup;
    toolbarData: FuseNavigationItem[];
    usstates = states;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    data: Validation;
    refresh = new Subject();
    filteredOptions: Observable<any>;
    filteredCategories: Observable<any>;
    selectedSalesRep;
    data$ = this.store.select(ReferralCenterTableSelectors.selectActive);
    referralCityState$ = this.store.select(ReferralCenterTableSelectors.selectZipCode);
    referralData$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(ReferralCenterTableSelectors.selectReferralById))
    );
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
    constructor(
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private auxUtilService: AuxUtilService
    ) {
        this.toolbarData = [
            {
                title: 'Save',
                type: 'basic',
                icon: 'mat_outline:save',
                function: () => {
                    this.save();
                },
            },
        ];
    }

    ngOnInit(): void {
        this.referralForm = this.fb.group({
            id: [0],
            refercode: [''],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            salesid: ['', [Validators.required]],
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
            taxid: [''],
            npi: [''],
            provider: [''],
            taxonomy: [''],
            addUserid: [''],
            doesOptIn: [true],
        });

        this.filteredStates = this.referralForm.get('state').valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );

        this.referralData$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.referralDetails = result;
                this.referralForm.patchValue(result, { emitEvent: false });
                this.state.setValue(result.state);
            }
        });

        this.referralForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(
                        ReferralCenterTableActions.LoadCityAndStateDropDown({
                            zipCode: result,
                        })
                    );
                }
            });

        this.referralCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.referralForm.get('state').setValue(result.state);
                this.referralForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.referralForm.get('state').setValue('');
                this.referralForm.get('city').setValue('');
            }
        });

        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.salesRepList = data;
        });

        // Filter state
        this.filteredOptions = this.referralForm.get('state').valueChanges.pipe(
            startWith(''),
            map(val => this.stateFilter(val))
        );

        // Filter Categories
        this.filteredCategories = this.referralForm.get('territory').valueChanges.pipe(
            startWith(''),
            map(val => this.CategoryFilter(val))
        );

        // Sync this.state with referralForm.state
        this.referralForm
            .get('state')
            .valueChanges.pipe(untilDestroyed(this))
            .subscribe(state => {
                this.state.setValue(state, { emitEvent: false });
            });

        // Patch values to the form
        this.referralForm.patchValue(this.referralDetails);
    }

    CategoryFilter(val: string) {
        return this.categories.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    stateFilter(val: string) {
        return this.usstates.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    save() {
        if (this.referralForm.invalid) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: 'Required fields are missing...',
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }
        let referral: ReferralDisplay = this.referralForm.value;
        referral = this.auxUtilService.transFormValuesToUpperCase(referral, [
            'referCode',
            'company',
            'title',
            'status',
            'firstname',
            'lastname',
            'address',
            'city',
            'state',
            'email',
            'territory',
            'notes',
        ]);

        referral = this.auxUtilService.transFormValues(referral, TranFormInputValues);
        this.store.dispatch(ReferralCenterIndividualActions.UpdateReferral({ referral }));
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    categoryhandler(event: MatAutocompleteSelectedEvent): void {
        this.territory.setValue(event.option.value);
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
        const phoneNumber = this.referralForm.get('phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }
}
