import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatOption,
} from '@angular/material/autocomplete';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { states } from 'app/shared/components/auxilium/states';

import { Observable, Subject, debounceTime, map, startWith, switchMap } from 'rxjs';
import { TranFormInputValues } from '../../../../../shared/components/auxilium/patient-checklists.enum';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';

import { AsyncPipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxPopupComponent, PopupData } from '../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { CompanyDisplay } from '../../../../../shared/interfaces/auxilium/company-center/company.interface';
import { PatientPayorsListComponent } from '../../../patient-center/components/patient-payors/patient-payors-list/patient-payors-list.component';
import { PhysicianCenterIndividualSelectors } from '../../../physician-center/reducers';
import { CompanyCenterIndividualActions } from '../../actions/company-center-individualeffects';
import { CompanyCenterTableActions } from '../../actions/company-center-table.actions';
import { CompanyCenterIndividualSelectors, CompanyCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-company-demographics',
    templateUrl: './company-demographics.component.html',
    styleUrls: ['./company-demographics.component.scss'],
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
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FuseHorizontalNavigationComponent,
        MatFormField,
        MatInput,
        MatCheckbox,
        MatIcon,
        // MatSuffix,
        MatOption,
        MatAutocomplete,
        MatAutocompleteTrigger,
        AsyncPipe,
    ],
})
export class CompanyDemographicsComponent implements OnInit {
    companyForm: FormGroup;
    branchName = new FormControl();
    taxonomy = new FormControl();
    state = new FormControl();
    toolbarData: FuseNavigationItem[];
    usstates = states;
    taxonomyList: CompanyDisplay[];
    companyDetails: CompanyDisplay;
    refresh = new Subject();
    filteredTaxonomy: Observable<any>;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    data$ = this.store.select(CompanyCenterTableSelectors.selectTaxonomy);
    branch$ = this.store.select(PhysicianCenterIndividualSelectors.selectBranch);
    companyData$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(CompanyCenterTableSelectors.selectCompanyById))
    );
    companyCityState$ = this.store.select(CompanyCenterIndividualSelectors.selectCompanyCityState);

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    @ViewChild('autoInput', { read: MatAutocompleteTrigger }) taxAutocomplete: MatAutocompleteTrigger;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private matDialog: MatDialog,
        private auxUtilService: AuxUtilService
    ) {
        this.store.dispatch(CompanyCenterTableActions.LoadTaxonomy());
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
        this.companyForm = this.fb.group({
            id: [0],
            type: [''],
            name: [''],
            address: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: [''],
            fax: [''],
            taxonomy: [''],
            multibranch: [false],
            participat: [''],
            dmerc: [''],
            defaultadjustmentcode: [''],
            email: [''],
            website: [''],
            sqlserver: [''],
            npi: [''],
            npionly: [false],
            amountpaid: [''], // this is not in the interface but added for form control
            fedid: [''],
            kct: [''],
            tax: [0],
            specialpfx: [''],
            rxinitials: [''],
            diabcoaccount: [''],
            medicaidexportpath: [''],
            payorName: [''],
            patientid: [''],
        });

        // Filter Taxonomy
        this.filteredTaxonomy = this.companyForm.get('taxonomy').valueChanges.pipe(
            startWith(''),
            map(val => this.filterTaxonomy(val))
        );

        // Sync state FormControl with form
        this.state.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
            this.companyForm.get('state').setValue(value, { emitEvent: false });
        });

        this.companyData$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.companyDetails = result;
                this.companyForm.patchValue(result, { emitEvent: false });
                this.state.setValue(result.state); // Set state control value
                // this.state.setValue(result.state);
                // combineLatest([
                //     this.branch$,
                //     this.companyForm
                //         .get('branchid')
                //         .valueChanges.pipe(startWith(this.companyForm.get('branchid').value)),
                // ])
                //     .pipe(untilDestroyed(this))
                //     .subscribe(([branches, branchid]) => {
                //         if (branches && branchid) {
                //             // const selectedBranch = branches.find(branch => branch.id === branchid);
                //             // if (selectedBranch) {
                //             //     this.onBranchSelected(selectedBranch);
                //             // }
                //         }
                //     });
            }
        });

        this.companyCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.state.setValue(result.state);
                this.companyForm.get('state').setValue(result.state);
                this.companyForm.get('city').setValue(result.city);
            } else {
                this.state.setValue('');
                this.companyForm.get('state').setValue('');
                this.companyForm.get('city').setValue('');
            }
        });

        this.actions$
            .pipe(ofType(CompanyCenterIndividualActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        this.companyForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(CompanyCenterIndividualActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });
    }

    save() {
        if (this.companyForm.invalid) {
            return;
        }
        let company: CompanyDisplay = this.companyForm.value;
        // Transform inputs to uppercase
        company = this.auxUtilService.transFormValuesToUpperCase(company, [
            'type',
            'name',
            'address',
            'city',
            'zip',
            'phone',
            'fax',
            'taxonomy',
            'email',
            'website',
            'sqlserver',
            'npi',
            'fedid',
            'tax',
            'specialpfx',
            'rxinitials',
            'diabcoaccount',
            'medicaidexportpath',
        ]);

        company = this.auxUtilService.transFormValues(company, TranFormInputValues);
        this.store.dispatch(CompanyCenterIndividualActions.AddCompany({ company }));
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
        const phoneNumber = this.companyForm.get('phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }

    openPayorList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Payor',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Select Payor',
            dynamicComponent: PatientPayorsListComponent,
            dynamicComponentData: null,
            submitFunction: 'selectRow',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '70%',
            height: 'auto',
            data: popupData,
        });

        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    this.companyForm.get('payorName').setValue(result.name);
                    this.companyForm.get('payorId').setValue(result.id);
                }
            });
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.companyForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
