import { formatDate, NgFor, AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { states } from 'app/shared/components/auxilium/states';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import moment from 'moment';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { debounceTime, filter, map, startWith, tap } from 'rxjs/operators';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { PayorCenterTableActions } from '../../actions/payor-center-table.actions';
import { PayorDemographicsActions } from '../../actions/payor-demographics.action';
import { PayorCenterDetailSelectors, PayorCenterIndividualSelectors, PayorCenterTableSelectors } from '../../reducers';
import { TitleService } from '../../services/title.service';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@UntilDestroy()
@Component({
    selector: 'app-payor-demographics',
    templateUrl: './payor-demographics.component.html',
    styleUrls: ['./payor-demographics.component.scss'],
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
        NgxMaskDirective,
        MatSelect,
        MatSelectTrigger,
        AuxSelectDropdownComponent,
        NgFor,
        MatCheckbox,
        CdkTextareaAutosize,
        AsyncPipe,
    ],
})
export class PayorDemographicsComponent implements OnInit, OnDestroy {
    payorDemographicsForm: FormGroup;
    salesid = new FormControl();
    branchName = new FormControl();
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    payorDetails: Payor;
    refresh = new Subject();
    usstates = states;
    statusDropDown = [
        {
            name: 'Active',
            code: 'A',
        },
        {
            name: 'Inactive',
            code: 'I',
        },
        {
            name: 'Deleted',
            code: 'D',
        },
    ];
    statusDropDown$ = of(this.statusDropDown);

    allowedList = [
        {
            name: 'S',
            value: 'S',
        },
        {
            name: 'A',
            value: 'A',
        },
    ];

    upinProvList = [
        {
            name: 'Taxonomy',
            value: 1,
        },
        {
            name: 'Provider#',
            value: 2,
        },
        {
            name: 'NPI',
            value: 3,
        },
    ];

    refprovList = [
        {
            name: 'Referring',
            value: 1,
        },
        {
            name: 'Rendering',
            value: 2,
        },
        {
            name: 'Company',
            value: 3,
        },
    ];

    // Payor Type Dropdown
    payorType$ = this.store.select(PayorCenterDetailSelectors.selectPayorType).pipe(
        map(data =>
            data.map(result => ({
                name: result.description || result.code,
                code: result.code,
            }))
        )
    );

    primaryBillForm$ = this.store.select(PayorCenterDetailSelectors.selectPayorPrimaryBillForm).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
                description: result.description || result.code,
            }))
        )
    );

    priceCode$ = this.store.select(PayorCenterDetailSelectors.selectPayorPriceCode).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
                description: result.description,
            }))
        )
    );

    boxOne$ = this.store.select(PayorCenterDetailSelectors.selectPayorBoxOne).pipe(
        map(data =>
            data.map(result => ({
                id: result.id,
                code: result.code,
                description: result.description || result.code,
            }))
        )
    );

    saleRep$ = this.store.select(PayorCenterDetailSelectors.selectPatientSalesRep).pipe(
        map(data =>
            data.map(result => ({
                name: result.firstName + ' ' + result.lastName,
                value: result.id,
            }))
        )
    );

    financialClass$ = this.store.select(PayorCenterDetailSelectors.selectPayorFinancialClass).pipe(
        map(data =>
            data.map(result => ({
                name: result.description,
                value: result.id,
            }))
        )
    );

    data$ = this.store.select(PayorCenterTableSelectors.selectPayorDetails);
    branch$ = this.store.select(PayorCenterIndividualSelectors.selectBranch);

    payorCityState$ = this.store.select(PayorCenterIndividualSelectors.selectPatientCityState);
    loading$ = this.store.select(PayorCenterTableSelectors.selectLoading);
    toolbarData: FuseNavigationItem[];

    selectedPriceCodeDescription: string = '';
    priceCodesByCode: Record<string, { name: string; value: string; description: string }> = {};

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private auxUtilService: AuxUtilService,
        private actions$: Actions,
        private titleService: TitleService
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
        const payorId = parseInt(this.route.parent.snapshot.params['id']);
        this.store.dispatch(PayorCenterTableActions.LoadPayorDetails({ id: payorId }));

        this.payorDemographicsForm = this.fb.group({
            salesid: [],
            billto: [],
            name: [],
            branchid: [],
            phone: [],
            address: [],
            email: [],
            address2: [],
            city: [],
            state: [],
            zip: [],
            payorstatus: [],
            contactname: [],
            pricecode: [],
            ar: [],
            percentpaid: [],
            primarybillform: [],
            payortype: [],
            pin: [],
            adddate: [],
            adduserid: [],
            id: [0],
            npi: [],
            taxid: [],
            npionly: [],
            notes: [],
            payorpercent: [],
            flatfee: [],
            secondarybillform: [],
            ocnanumber: [],
            account: [],
            payto: [],
            payorcategory: [],
            block24k: [],
            _1500box1: [],
            refprov: [],
            upinprov: [],
            paytoforeligibility: [],
        });
        this.filteredStates = this.payorDemographicsForm.get('state').valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );
    }

    ngOnInit(): void {
        this.data$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.payorDetails = result;
                this.payorDemographicsForm.patchValue(result);
                if (result?.adddate) {
                    const date = new Date(result.adddate);
                    const formattedDate = formatDate(date, 'M/d/yyyy h:mm a', 'en-US');
                    this.payorDemographicsForm.controls['adddate'].setValue(formattedDate, { emitEvent: false });
                }
            }
        });

        // Handle zip code lookup response
        this.payorCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.payorDemographicsForm.patchValue(
                    {
                        state: result.state,
                        city: result.city,
                    },
                    { emitEvent: false }
                );
            }
        });

        this.branch$.pipe(untilDestroyed(this)).subscribe(branches => {
            if (branches && !branches.length) {
                this.store.dispatch(PayorDemographicsActions.LoadBranchDropDown());
            }
        });

        this.payorDemographicsForm.controls['adduserid'].disable();

        // Only trigger zip lookup on manual changes
        this.payorDemographicsForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result && result !== this.payorDetails?.zip) {
                    this.store.dispatch(
                        PayorDemographicsActions.LoadCityAndStateDropDown({
                            zipCode: result,
                        })
                    );
                }
            });

        this.filteredStates = this.payorDemographicsForm.get('state').valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );

        combineLatest([
            this.branch$,
            this.payorDemographicsForm
                .get('branchid')
                .valueChanges.pipe(startWith(this.payorDemographicsForm.get('branchid').value)),
        ])
            .pipe(untilDestroyed(this))
            .subscribe(([branches, branchid]) => {
                if (branches && Number(branchid)) {
                    const selectedBranch = branches.find(branch => branch.id === Number(branchid));
                    if (selectedBranch) {
                        this.onBranchSelected(selectedBranch);
                    }
                }
            });

        this.actions$
            .pipe(ofType(PayorDemographicsActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        // Listen for both price code dropdown data and form value changes
        combineLatest([
            this.priceCode$,
            this.payorDemographicsForm
                .get('pricecode')
                .valueChanges.pipe(startWith(this.payorDemographicsForm.get('pricecode').value)),
        ])
            .pipe(
                untilDestroyed(this),
                filter(([priceCodes, selectedCode]) => !!priceCodes && !!selectedCode),
                tap(([priceCodes, selectedCode]) => {
                    const selectedPriceCode = priceCodes.find(code => code.value === selectedCode);
                    if (selectedPriceCode) {
                        this.selectedPriceCodeDescription = selectedPriceCode.description || '';
                    }
                })
            )
            .subscribe();

        combineLatest([
            this.primaryBillForm$,
            this.payorDemographicsForm
                .get('primarybillform')
                .valueChanges.pipe(startWith(this.payorDemographicsForm.get('primarybillform').value)),
            this.payorDemographicsForm
                .get('secondarybillform')
                .valueChanges.pipe(startWith(this.payorDemographicsForm.get('secondarybillform').value)),
        ])
            .pipe(
                untilDestroyed(this),
                filter(([forms, primaryCode, secondaryCode]) => !!forms),
                tap(([forms, primaryCode, secondaryCode]) => {
                    // No additional actions needed for description updates
                })
            )
            .subscribe();

        combineLatest([
            this.boxOne$,
            this.payorDemographicsForm
                .get('_1500box1')
                .valueChanges.pipe(startWith(this.payorDemographicsForm.get('_1500box1').value)),
        ])
            .pipe(
                untilDestroyed(this),
                filter(([boxes, selectedBox]) => !!boxes),
                tap(([boxes, selectedBox]) => {
                    // No additional actions needed
                })
            )
            .subscribe();

        combineLatest([
            this.statusDropDown$,
            this.payorDemographicsForm
                .get('payorstatus')
                .valueChanges.pipe(startWith(this.payorDemographicsForm.get('payorstatus').value)),
        ])
            .pipe(
                untilDestroyed(this),
                filter(([statuses, selectedStatus]) => !!statuses),
                tap(([statuses, selectedStatus]) => {
                    // No additional actions needed
                })
            )
            .subscribe();

        combineLatest([
            this.payorType$,
            this.payorDemographicsForm
                .get('payortype')
                .valueChanges.pipe(startWith(this.payorDemographicsForm.get('payortype').value)),
        ])
            .pipe(
                untilDestroyed(this),
                filter(([types, selectedType]) => !!types),
                tap(([types, selectedType]) => {
                    // No additional actions needed
                })
            )
            .subscribe();
    }

    get selectedPriceCode() {
        return this.payorDemographicsForm.get('pricecode')?.value || '';
    }

    get selectedPrimaryBillForm() {
        return this.payorDemographicsForm.get('primarybillform')?.value || '';
    }

    get selectedCopayBillForm() {
        return this.payorDemographicsForm.get('secondarybillform')?.value || '';
    }

    get selectedBoxOne() {
        return this.payorDemographicsForm.get('_1500box1')?.value || '';
    }

    get selectedStatus() {
        return this.payorDemographicsForm.get('payorstatus')?.value || '';
    }

    get selectedPayorType() {
        return this.payorDemographicsForm.get('payortype')?.value || '';
    }

    save() {
        let formValue = { ...this.payorDemographicsForm.value };
        formValue.adddate = moment(formValue.adddate, 'MM/DD/YYYY hh:mm A').format('YYYY-MM-DDTHH:mm:ss');
        // Transform values to uppercase
        formValue = this.auxUtilService.transFormValuesToUpperCase(formValue, [
            'name',
            'address',
            'address2',
            'billto',
            'notes',
            'paytoforeligibility',
        ]);
        // Convert empty salesid and branchid to 0
        formValue.salesid = formValue.salesid || 0;
        formValue.branchid = formValue.branchid || 0;
        // Dispatch action to add payor demographics
        this.store.dispatch(PayorDemographicsActions.AddPayorDemographics({ payor: formValue }));
    }

    trackByFn(item) {
        return item.abbreviation;
    }

    trackBySales(item) {
        return item.value;
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
        const phoneNumber = this.payorDemographicsForm.get('phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }

    ngOnDestroy(): void {
        this.store.dispatch(PayorDemographicsActions.Refresh());
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.payorDemographicsForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
