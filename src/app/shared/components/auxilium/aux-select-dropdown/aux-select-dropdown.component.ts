import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatFormFieldControl, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';
import { AuxSelectDropdownOption } from './aux-select-dropdown-option.interface';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
    selector: 'aux-select-dropdown',
    templateUrl: './aux-select-dropdown.component.html',
    styleUrls: ['./aux-select-dropdown.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: AuxSelectDropdownComponent }],
    imports: [
        MatFormField,
        ReactiveFormsModule,
        MatLabel,
        NgIf,
        MatInput,
        MatAutocompleteTrigger,
        MatIcon,
        MatSuffix,
        MatAutocomplete,
        NgFor,
        MatOption,
        MatSelect,
        AsyncPipe,
    ],
})
export class AuxSelectDropdownComponent {
    @Input() public selectOption: Array<AuxSelectDropdownOption> = [];
    @Input() public className: string;
    @Input() public controlName: string;
    @Input() public label: string;
    @Input() public matForm: FormGroup;
    @Input() public tabindex: number;
    @Input() public enableAutocomplete: boolean = false;
    filteredOptions: Observable<AuxSelectDropdownOption[]>;
    @ViewChild(MatAutocompleteTrigger) matAutocomplete: MatAutocompleteTrigger; // Ensure correct import and usage
    constructor() {}

    ngOnInit() {
        if (this.enableAutocomplete) {
            this.filteredOptions = this.matForm.get(this.controlName).valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        }
    }

    private _filter(value: string): AuxSelectDropdownOption[] {
        const filterValue = value.toLowerCase();
        return this.selectOption.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    openAutocomplete(): void {
        if (this.matAutocomplete) {
            this.matAutocomplete.openPanel();
        }
    }

    trackByIndex(index: number) {
        return index;
    }
}
