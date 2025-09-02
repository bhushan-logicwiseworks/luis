import { AsyncPipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatError,
    MatFormField,
    MatLabel,
    MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { TitleService } from 'app/modules/auxilium/patient-center/services/title.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { Categories } from 'app/shared/components/auxilium/categories';
import { TransFormDateValues } from 'app/shared/components/auxilium/patient-demographics.enum';
import { states } from 'app/shared/components/auxilium/states';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { Observable, Subscription, debounceTime, map, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxPhonePipe } from '../../../../../shared/pipes/auxilium/aux-phone.pipe';
import { EmployeeDemographicsActions } from '../../actions/employee-center-demographics.action';
import { EmployeeCenterDeatilsActions } from '../../actions/employee-center-details.action';
import { EmployeeCenterDetailsSelectors, EmployeeDemographicsSelectors } from '../../reducers';

interface State {
    name: string;
    abbreviation: string;
}
@UntilDestroy()
@Component({
    selector: 'ac-employee-demographics',
    templateUrl: './employee-demographics.component.html',
    styleUrls: ['./employee-demographics.component.scss'],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
        provideNativeDateAdapter(),
        DateTimeFormatPipe,
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
        NgClass,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        MatError,
        NgxMaskDirective,
        MatCheckbox,
        AsyncPipe,
        AuxPhonePipe,
    ],
})
export class EmployeeDemographicsComponent implements OnInit, AfterViewInit, OnDestroy {
    toolbarData: FuseNavigationItem[];
    dateFormat = constVariables.DATE_FORMAT;
    employeeForm: FormGroup;
    @Input() item: any;
    title: string;
    state = new FormControl();
    employeecategory = new FormControl();
    filteredCategories: Observable<any>;
    usstates = states;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    employee: any;
    categories = Categories;
    employee$ = this.store.select(EmployeeCenterDetailsSelectors.selectEmployeeDetails);
    stateCity$ = this.store.select(EmployeeCenterDetailsSelectors.selectEmployeeCityState);
    demographics$ = this.store.select(EmployeeDemographicsSelectors.selectdemographics);
    subscription: Subscription;

    @ViewChild('autoInput', { read: MatAutocompleteTrigger }) categoryAutocomplete: MatAutocompleteTrigger;

    constructor(
        private fb: FormBuilder,
        private dateTimeFormate: DateTimeFormatPipe,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private router: Router,
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

        this.filteredStates = this.state.valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );
    }

    ngOnInit(): void {
        const id = Number(this.router.url.split('/')[3]);
        this.store.dispatch(EmployeeCenterDeatilsActions.LoadEmployeeDetails({ id: id }));
        this.employeeForm = this.fb.group({
            id: [0],
            username: [''],
            firstname: [''],
            lastname: [''],
            email: ['', Validators.required],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            displayname: [''],
            dob: [''],
            phone: [''],
            fax: [''],
            cell: [''],
            isactive: [''],
            addedby: [''],
            addeddate: [''],
            modifiedby: [''],
            modifieddate: [''],
            jobtitle: [''],
            jobcode: [''],
            role: [''],
            employmentdate: [''],
            terminationdate: [''],
        });

        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        this.employee$.pipe(untilDestroyed(this)).subscribe(data => {
            this.employee = data;
            this.employeeForm.patchValue(
                {
                    ...this.employee,
                    employmentdate:
                        this.employee.employmentdate !== '1900-01-01T00:00:00' ? this.employee.employmentdate : '',
                    terminationdate:
                        this.employee.terminationdate !== '1900-01-01T00:00:00' ? this.employee.terminationdate : '',
                },
                { emitEvent: false }
            );
            this.state.setValue(this.employee.state);
            if (this.employee.state === '') {
                this.employeeForm.get('state').setValue(null);
            }
            if (this.employee.addeddate !== '') {
                const formatedDate = this.dateTimeFormate.transform(this.employee.addeddate);
                this.employeeForm.get('addeddate').setValue(formatedDate);
            }
            if (this.employee.modifieddate !== '') {
                const formatedDate = this.dateTimeFormate.transform(this.employee.modifieddate);
                this.employeeForm.get('modifieddate').setValue(formatedDate);
            }
            const disabledFields = ['username', 'addedby', 'addeddate', 'modifiedby', 'modifieddate'];
            disabledFields.forEach(fieldName => {
                this.employeeForm.get(fieldName).disable();
            });
        });

        this.stateCity$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.employeeForm.get('state').setValue(result.state);
                this.employeeForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.employeeForm.get('state').setValue('');
                this.employeeForm.get('city').setValue('');
            }
        });

        this.employeeForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(1000))
            .subscribe(result => {
                //console.log(result);
                if (result !== '') {
                    this.store.dispatch(EmployeeCenterDeatilsActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });
    }

    ngAfterViewInit() {}

    CategoryFilter(val: string) {
        return this.categories.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    save() {
        // Populate the patients object from the screen
        let patient: any = this.employeeForm.value;
        patient.state = this.state.value;
        // Transform inputs to uppercase
        patient = this.auxUtilService.transFormValuesToUpperCase(patient, [
            'firstname',
            'username',
            'lastname',
            'address',
            'address2',
            'city',
            'state',
            'county',
            'email',
            'jobcode',
            'jobtitle',
            'role',
        ]);
        patient = this.auxUtilService.formatDateFields(patient, TransFormDateValues);
        patient.isactive = !!patient.isactive;

        //console.log(patient);

        // Save changes
        this.store.dispatch(EmployeeDemographicsActions.AddEmployeeDemographics({ patient }));
    }

    onDateChange(event, formControlName) {
        this.employeeForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.employeeForm,
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
    makeCall(type: string): void {
        const phoneNumber = this.employeeForm.get(type == 'Cell' ? 'cell' : 'phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }

    ngOnDestroy() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }
}
