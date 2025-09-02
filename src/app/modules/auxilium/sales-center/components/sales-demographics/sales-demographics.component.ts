import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { Categories } from 'app/shared/components/auxilium/categories';
import { states } from 'app/shared/components/auxilium/states';
import { TranFormInputValues } from 'app/shared/components/auxilium/work-order-details.enum';
import { SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { Observable, Subject, combineLatest, debounceTime, map, startWith, switchMap } from 'rxjs';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { SalesCenterIndividualActions } from '../../actions/sales-center-individual.actions';
import { SalesCenterTableActions } from '../../actions/sales-center-table.actions';
import { SalesCenterIndividualSelectors, SalesCenterTableSelectors } from '../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgxMaskDirective } from 'ngx-mask';
import { NgFor, AsyncPipe } from '@angular/common';
import { AuxPhonePipe } from '../../../../../shared/pipes/auxilium/aux-phone.pipe';
@UntilDestroy()
@Component({
    selector: 'app-sales-demographics',
    templateUrl: './sales-demographics.component.html',
    styleUrls: ['./sales-demographics.component.scss'],
    animations: fuseAnimations,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        NgxMaskDirective,
        NgFor,
        AsyncPipe,
        AuxPhonePipe,
    ],
})
export class SalesDemographicsComponent {
    salesForm: FormGroup;
    toolbarData: FuseNavigationItem[];
    usstates = states;
    categories = Categories;
    salesDetails: SalesRepDisplay;
    state = new FormControl();
    branchName = new FormControl();
    filteredCategories: Observable<any>;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    territory = new FormControl();
    filteredOptions: Observable<any>;
    refresh = new Subject();
    salesDetailsById$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(SalesCenterTableSelectors.selectSalesRepById))
    );
    branch$ = this.store.select(SalesCenterIndividualSelectors.selectBranch);

    salesCityState$ = this.store.select(SalesCenterTableSelectors.selectSalesCityState);
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
        this.filteredStates = this.state.valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );
    }

    ngOnInit(): void {
        this.salesForm = this.fb.group({
            id: [0],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required]],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            fax: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            cell: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            territory: [''],
            authrep: [''],
            isactive: [true],
            adddate: [''],
            addUserId: [''],
            branchid: [''],
        });

        this.salesDetailsById$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.salesDetails = result;
                this.salesForm.patchValue(result, { emitEvent: false });
                this.state.setValue(result.state);
                combineLatest([
                    this.branch$,
                    this.salesForm.get('branchid').valueChanges.pipe(startWith(this.salesForm.get('branchid').value)),
                ])
                    .pipe(untilDestroyed(this))
                    .subscribe(([branches, branchid]) => {
                        if (branches && branchid) {
                            const selectedBranch = branches.find(branch => branch.id === branchid);
                            if (selectedBranch) {
                                this.onBranchSelected(selectedBranch);
                            }
                        }
                    });
            }
        });
        this.salesForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(
                        SalesCenterTableActions.LoadCityAndStateDropDown({
                            zipCode: result,
                        })
                    );
                }
            });
        this.salesCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.salesForm.get('state').setValue(result.state);
                this.salesForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.salesForm.get('state').setValue('');
                this.salesForm.get('city').setValue('');
            }
        });

        this.actions$
            .pipe(ofType(SalesCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    save() {
        if (this.salesForm.invalid) {
            return;
        }
        let salesrep: SalesRepDisplay = this.salesForm.value;
        salesrep = this.auxUtilService.transFormValuesToUpperCase(salesrep, [
            'firstname',
            'lastname',
            'address',
            'address2',
            'city',
            'state',
            'email',
            'territory',
        ]);
        salesrep = this.auxUtilService.transFormValues(salesrep, TranFormInputValues);
        this.store.dispatch(SalesCenterIndividualActions.AddSalesRep({ salesrep }));
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
    makeCall(type: string): void {
        const phoneNumber = this.salesForm.get(type == 'Cell' ? 'cell' : 'phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.salesForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
