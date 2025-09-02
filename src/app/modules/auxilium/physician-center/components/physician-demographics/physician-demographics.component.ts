import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { states } from 'app/shared/components/auxilium/states';
import { PhysicianDisplay } from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import { Observable, Subject, combineLatest, debounceTime, map, startWith, switchMap } from 'rxjs';
import { TranFormInputValues } from '../../../../../shared/components/auxilium/patient-checklists.enum';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { PhysicianCenterIndividualActions } from '../../actions/physician-center-individual.actions';
import { PhysicianCenterTableActions } from '../../actions/physician-center-table.actions';
import { PhysicianCenterIndividualSelectors, PhysicianCenterTableSelectors } from '../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgxMaskDirective } from 'ngx-mask';
import { NgFor, AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-physician-demographics',
    templateUrl: './physician-demographics.component.html',
    styleUrls: ['./physician-demographics.component.scss'],
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
        MatPrefix,
        MatInput,
        MatAutocompleteTrigger,
        MatSuffix,
        MatAutocomplete,
        MatOption,
        MatCheckbox,
        NgxMaskDirective,
        MatSelect,
        NgFor,
        AsyncPipe,
    ],
})
export class PhysicianDemographicsComponent implements OnInit {
    physicianForm: FormGroup;
    branchName = new FormControl();
    taxonomy = new FormControl();
    state = new FormControl();
    toolbarData: FuseNavigationItem[];
    usstates = states;
    taxonomyList: PhysicianDisplay[];
    physicianDetails: PhysicianDisplay;
    refresh = new Subject();
    filteredTaxonomy: Observable<any>;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    data$ = this.store.select(PhysicianCenterTableSelectors.selecttaxonomy);
    branch$ = this.store.select(PhysicianCenterIndividualSelectors.selectBranch);
    physicianData$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(PhysicianCenterTableSelectors.selectPhysicianById))
    );
    physicianCityState$ = this.store.select(PhysicianCenterIndividualSelectors.selectPatientCityState);

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    @ViewChild('autoInput', { read: MatAutocompleteTrigger }) taxAutocomplete: MatAutocompleteTrigger;

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
        this.store.dispatch(PhysicianCenterTableActions.LoadTaxonomy());
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
        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.taxonomyList = data;
        });
        this.physicianForm = this.fb.group({
            id: [0],
            phykey: [''],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            address1: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            fax: ['', [Validators.pattern(/^[0-9]{10}$/)]],
            email: [''],
            upin: [''],
            medicaid: [''],
            assignment: [this.pecosOptions[0].value],
            medicare: [''],
            groupid: [''],
            taxonomy: [''],
            stateid: [''],
            emplid: [''],
            otherid: [''],
            npi: [''],
            supervisor: [''],
            facility: [''],
            phoneextension: [''],
            credentials: [''],
            suffix: [''],
            branchid: [0],
            addDate: [''],
            addUserId: [''],
            isActive: [true],
            memo: [''],
        });

        // Filter Taxonomy
        this.filteredTaxonomy = this.physicianForm.get('taxonomy').valueChanges.pipe(
            startWith(''),
            map(val => this.filterTaxonomy(val))
        );

        this.physicianData$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.physicianDetails = result;
                this.physicianForm.patchValue(result, { emitEvent: false });
                this.state.setValue(result.state);
                combineLatest([
                    this.branch$,
                    this.physicianForm
                        .get('branchid')
                        .valueChanges.pipe(startWith(this.physicianForm.get('branchid').value)),
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

        this.physicianCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.physicianForm.get('state').setValue(result.state);
                this.physicianForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.physicianForm.get('state').setValue('');
                this.physicianForm.get('city').setValue('');
            }
        });

        this.actions$
            .pipe(ofType(PhysicianCenterIndividualActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        this.physicianForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(PhysicianCenterIndividualActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });
    }

    save() {
        if (this.physicianForm.invalid) {
            return;
        }
        let physician: PhysicianDisplay = this.physicianForm.value;
        // Transform inputs to uppercase
        physician = this.auxUtilService.transFormValuesToUpperCase(physician, [
            'phykey',
            'firstName',
            'lastName',
            'address1',
            'address2',
            'city',
            'state',
            'email',
            'facility',
            'memo',
        ]);

        physician = this.auxUtilService.transFormValues(physician, TranFormInputValues);
        this.store.dispatch(PhysicianCenterIndividualActions.AddPhysicianRep({ physician }));
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    filterTaxonomy(val: string) {
        return this.taxonomyList.filter((option: any) => option.code.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    taxhandler(event: MatAutocompleteSelectedEvent): void {
        this.taxonomy.setValue(event.option.value);
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
        const phoneNumber = this.physicianForm.get('phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.physicianForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
