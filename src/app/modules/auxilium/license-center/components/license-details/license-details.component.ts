import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError } from '@angular/material/form-field';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { Categories } from 'app/shared/components/auxilium/categories';
import { LicenseInfo } from 'app/shared/interfaces/auxilium/license-center/license-info-interface';
import { Observable, Subject, Subscription, combineLatest, map, of, startWith } from 'rxjs';
import { LicenseCenterIndividualActions } from '../../actions/license-center-individual.actions';
import { LicenseCenterTableSelectors } from '../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

@UntilDestroy()
@Component({
    selector: 'app-license-details',
    templateUrl: './license-details.component.html',
    styleUrls: ['./license-details.component.scss'],
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
        MatPrefix,
        MatInput,
        MatAutocompleteTrigger,
        MatAutocomplete,
        NgFor,
        MatOption,
        MatSelect,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        AsyncPipe,
    ],
})
export class LicenseDetailsComponent {
    category = new FormControl();
    branchName = new FormControl();
    licenseDetails: any;
    branchCode: string;
    categories = Categories;
    licenseForm: FormGroup;
    toolbarData: FuseNavigationItem[];
    refresh = new Subject();
    filteredCategories: Observable<any>;
    licenseCityState$ = this.store.select(LicenseCenterTableSelectors.selectZipCode);
    licenseBranch$ = this.store.select(LicenseCenterTableSelectors.selectBranch);
    licenseData$ = this.store.select(LicenseCenterTableSelectors.selectLicenseById);
    subscription: Subscription;

    constructor(
        private fb: FormBuilder,
        private store: Store,
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
        // Initialize the form group
        this.licenseForm = this.fb.group({
            id: [0],
            state: ['', [Validators.required]],
            category: ['', [Validators.required]],
            isLicenseRequired: ['', [Validators.required]],
            branchId: [''],
            licenseNumber: [''],
            statrtDate: [],
            expirationDate: [''],
            note: [''],
            addedBy: [''],
            addedDate: [''],
            modifiedBy: [''],
            modifiedDate: [''],
        });

        // Subscribe to the store data for license details
        this.licenseData$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.licenseDetails = result;
                this.licenseForm.patchValue({
                    id: this.licenseDetails.id,
                    state: this.licenseDetails.state,
                    category: this.licenseDetails.category,
                    isLicenseRequired: this.licenseDetails.islicenserequired,
                    branchId: this.licenseDetails.branchid,
                    licenseNumber: this.licenseDetails.licensenumber,
                    statrtDate:
                        this.licenseDetails.startdate == '1900-01-01T00:00:00' ? '' : this.licenseDetails.startdate,
                    expirationDate:
                        this.licenseDetails.expirationdate == '1900-01-01T00:00:00'
                            ? ''
                            : this.licenseDetails.expirationdate,
                    note: this.licenseDetails.note,
                    addedBy: this.licenseDetails.addedby,
                    addedDate: this.licenseDetails.addeddate,
                    modifiedBy: this.licenseDetails.modifiedby,
                    modifiedDate: this.licenseDetails.modifieddate,
                });
            }
        });

        this.licenseCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.licenseForm.get('state').setValue(result.state);
            } else {
            }
        });

        combineLatest([
            this.licenseBranch$,
            this.licenseForm.get('branchId').valueChanges.pipe(startWith(this.licenseForm.get('branchId').value)),
        ])
            .pipe(untilDestroyed(this))
            .subscribe(([branches, branchId]) => {
                if (branches && branchId) {
                    const selectedBranch = branches.find(branch => branch.id === branchId);
                    if (selectedBranch) {
                        this.onBranchSelected(selectedBranch);
                    }
                }
            });

        this.filteredCategories = of(this.categories);

        this.category.valueChanges
            .pipe(
                startWith(''),
                map(val => this.CategoryFilter(val || ''))
            )
            .subscribe(filtered => {
                this.filteredCategories = of(filtered);
            });
    }

    CategoryFilter(val: string) {
        return this.categories.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    save() {
        if (this.licenseForm.invalid) {
            return;
        }

        if (this.licenseForm.get('statrtDate').value === '') {
            this.licenseForm.value.statrtDate = '1900-01-01T00:00:00';
        }
        let licenseInfo: LicenseInfo = this.licenseForm.value;
        if (this.licenseForm.get('expirationDate').value === '') {
            licenseInfo.expirationDate = '1900-01-01T00:00:00';
        }
        licenseInfo = this.auxUtilService.transFormValuesToUpperCase(licenseInfo, [
            'state',
            'category',
            'licenseNumber',
            'note',
            'addedBy',
            'modifiedBy',
            'branchId',
            'addedDate',
            'modifiedDate',
            'id',
            'branchId',
        ]);
        this.store.dispatch(
            LicenseCenterIndividualActions.UpdateLicense({
                licenses: licenseInfo,
            })
        );
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    categoryhandler(event: MatAutocompleteSelectedEvent): void {
        this.category.setValue(event.option.value);
    }

    onDateChange(event, formControlName) {
        this.licenseForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.licenseForm,
            formControlName
        );
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.licenseForm.get('branchId').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
