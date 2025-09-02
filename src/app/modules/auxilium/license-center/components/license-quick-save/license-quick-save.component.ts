import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { Categories } from 'app/shared/components/auxilium/categories';
import { states } from 'app/shared/components/auxilium/states';
import { LicenseInfo } from 'app/shared/interfaces/auxilium/license-center/license-info-interface';
import { map, Observable, startWith, Subject } from 'rxjs';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { LicenseCenterTableSelectors } from '../../reducers';
import { MatFormField, MatLabel, MatSuffix, MatPrefix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

@UntilDestroy()
@Component({
    selector: 'app-license-quick-save',
    templateUrl: './license-quick-save.component.html',
    styleUrls: ['./license-quick-save.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatAutocompleteTrigger,
        MatIcon,
        MatSuffix,
        MatAutocomplete,
        MatOption,
        MatPrefix,
        MatSelect,
        NgFor,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        MatError,
        AsyncPipe,
    ],
})
export class LicenseQuickSaveComponent implements OnInit {
    contactForm: UntypedFormGroup;
    categories = Categories;
    branchName = new FormControl('', Validators.required);
    usstates = states;
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    refresh = new Subject();
    filteredOptions: Observable<any>;
    filteredCategories: Observable<any>;
    licenseCityState$ = this.store.select(LicenseCenterTableSelectors.selectZipCode);
    branch$ = this.store.select(LicenseCenterTableSelectors.selectBranch);
    constructor(
        private dialogRef: MatDialogRef<any>,
        private _formBuilder: UntypedFormBuilder,
        private auxUtilService: AuxUtilService,
        private store: Store
    ) {}

    ngOnInit(): void {
        // Initialize the form group
        this.contactForm = this._formBuilder.group({
            id: [0],
            state: ['', [Validators.required]],
            category: ['', [Validators.required]],
            isLicenseRequired: ['', [Validators.required]],
            branchId: ['', [Validators.required]],
            licenseNumber: [''],
            expirationDate: [''],
            statrtDate: [''],
            note: [''],
        });
        // Now you can access 'this.contactForm.get('state')' safely
        this.filteredStates = this.contactForm.get('state').valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );

        this.licenseCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.contactForm.get('state').setValue(result.state);
            } else {
                this.contactForm.get('state').setValue('');
            }
        });

        this.filteredCategories = this.contactForm.get('category').valueChanges.pipe(
            startWith(''),
            map(val => this.CategoryFilter(val))
        );
    }

    stateFilter(val: string) {
        return this.usstates.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    CategoryFilter(val: string) {
        return this.categories.filter((option: any) => option.name.toLowerCase().indexOf(val?.toLowerCase()) === 0);
    }

    /**
     * Save the contact
     */
    saveQuickLicense(): void {
        if (this.contactForm.invalid) {
            return;
        }
        if (this.contactForm.get('statrtDate').value === '') {
            this.contactForm.patchValue({ statrtDate: '1900-01-01T00:00:00' });
        }
        const licenseInfo: LicenseInfo = this.contactForm.value;
        if (this.contactForm.get('expirationDate').value === '') {
            licenseInfo.expirationDate = '1900-01-01T00:00:00';
        }
        this.auxUtilService.transFormValuesToUpperCase(licenseInfo, ['state', 'category', 'licenseNumber', 'note']);
        if (!this.isInputValid(licenseInfo)) {
            return;
        }
        this.dialogRef.close(licenseInfo);
    }

    isInputValid(contact: LicenseInfo): boolean {
        if (contact.state == '') {
            return false;
        } else if (contact.category == '') {
            return false;
        } else if (contact.isLicenseRequired == null) {
            return false;
        } else if (contact.branchId == null) {
            return false;
        }
        return true;
    }

    private _filterStates(value: string): State[] {
        const filterValue = value.toLowerCase().replace(/\s+/g, ' ');
        return this.usstates.filter(
            state =>
                state.name.toLowerCase().replace(/\s+/g, ' ').includes(filterValue) ||
                state.abbreviation.toLowerCase().includes(filterValue)
        );
    }

    onDateChange(event, formControlName) {
        this.contactForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.contactForm,
            formControlName
        );
    }

    displayBranchCode(option: any): string {
        return option ? option.branchcode : '';
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.contactForm.get('branchId').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
