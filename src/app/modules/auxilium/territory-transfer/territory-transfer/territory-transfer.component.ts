import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { AuxSelectDropdownOption } from 'app/shared/components/auxilium/aux-select-dropdown/aux-select-dropdown-option.interface';
import { states } from 'app/shared/components/auxilium/states';
import { map, Observable, startWith } from 'rxjs';
import { AuxSelectDropdownComponent } from '../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { State } from '../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { TerritoryTransferActions } from '../actions/territory-transfer.actions';
import { TerritoryTransferSelectors } from '../reducers';

@Component({
    selector: 'app-territory-transfer',
    templateUrl: './territory-transfer.component.html',
    styleUrls: ['./territory-transfer.component.scss'],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatStepper,
        MatStep,
        MatStepLabel,
        MatFormField,
        MatSelect,
        MatOption,
        MatButton,
        MatStepperNext,
        MatRadioGroup,
        MatRadioButton,
        MatStepperPrevious,
        MatInput,
        MatLabel,
        MatAutocompleteTrigger,
        MatIcon,
        MatSuffix,
        MatAutocomplete,
        AuxSelectDropdownComponent,
        AsyncPipe,
    ],
})
export class TerritoryTransferComponent {
    isLinear = false;
    salesId = new FormControl();
    state = new FormControl();
    salesRepList: AuxSelectDropdownOption[];
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;
    salesRep$ = this.store.select(TerritoryTransferSelectors.selectSalesResp);
    usStates = states;
    selectedSalesRep;
    TerritoryTransfer = {
        salesIdTerritoryOwner: 0,
        transferType: '',
        transferValue: '',
        category: '',
        isCompleted: true,
    };

    // Patient Category Drop Down
    patientCategoryList$ = this.store.select(TerritoryTransferSelectors.selectPatientCategory).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
            }))
        )
    );

    firstFormGroup;
    secondFormGroup;
    thirdFormGroup;
    fourFormGroup;
    fiveFormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private store: Store
    ) {
        this.filteredStates = this.state.valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usStates.slice()))
        );
    }

    ngOnInit(): void {
        this.firstFormGroup = this._formBuilder.group({
            salesId: [''],
        });
        this.secondFormGroup = this._formBuilder.group({
            transferType: [''],
        });
        this.thirdFormGroup = this._formBuilder.group({
            patientCategory: [''],
        });
        this.fourFormGroup = this._formBuilder.group({
            transferValues: [''],
        });
        // SalesRep Dropdown
        this.salesRep$.pipe().subscribe(data => {
            if (data) {
                this.salesRepList = data.map(result => {
                    return {
                        name: result.firstName + ' ' + result.lastName,
                        value: result.id,
                    };
                });
            }
        });
        this.firstFormGroup.valueChanges.subscribe(data => {
            this.selectedSalesRep = this.salesRepList.find(res => res.value === data.salesId);
        });
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    saveTerritoryTransfer() {
        this.TerritoryTransfer.salesIdTerritoryOwner = parseInt(this.firstFormGroup.get('salesId').value, 10);
        this.TerritoryTransfer.category = this.thirdFormGroup.get('patientCategory').value;
        this.TerritoryTransfer.transferType = this.secondFormGroup.get('transferType').value;

        const transferVal = this.fourFormGroup.get('transferValues').value;
        this.TerritoryTransfer.transferValue =
            transferVal !== null && transferVal !== undefined ? String(transferVal) : '';

        this.TerritoryTransfer.isCompleted = false;
        this.store.dispatch(
            TerritoryTransferActions.AddTerritoryTransfer({ TerritoryTransfer: this.TerritoryTransfer })
        );
    }

    private _filterStates(value: string): State[] {
        const filterValue = value.toLowerCase().replace(/\s+/g, ' ');
        return this.usStates.filter(
            state =>
                state.name.toLowerCase().replace(/\s+/g, ' ').includes(filterValue) ||
                state.abbreviation.toLowerCase().includes(filterValue)
        );
    }
}
