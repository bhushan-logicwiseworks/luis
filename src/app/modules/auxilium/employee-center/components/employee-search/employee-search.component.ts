import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { TranFormSerarchInputValues } from 'app/shared/components/auxilium/patient-search.enum';
import { EmployeeDisplay } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import Swal from 'sweetalert2';
import { EmployeeCenterTableActions } from '../../actions/employee-center-table.actions';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
    selector: 'app-employee-search',
    templateUrl: './employee-search.component.html',
    styleUrls: ['./employee-search.component.scss'],
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
        MatFormField,
        MatLabel,
        MatInput,
        NgClass,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        NgxMaskDirective,
    ],
})
export class EmployeeSearchComponent {
    searchForm: FormGroup;

    dateFormat: string = constVariables.DATE_FORMAT;
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<EmployeeDisplay>,
        private _formBuilder: UntypedFormBuilder,
        private auxUtilService: AuxUtilService,
        private store: Store
    ) {}

    ngOnInit(): void {
        // Create the form
        this.searchForm = this._formBuilder.group({
            id: [],
            firstName: [''],
            lastName: [''],
            dob: [],
            address: [],
            city: [''],
            zip: [''],
            phone: [''],
            cell: [''],
            email: [''],
        });
    }

    /**
     * Save the document
     */
    searchEmployee(): void {
        if (this.searchForm.invalid) {
            return;
        }
        if (this.auxUtilService.objFilled(this.searchForm.value)) {
            let employeeSearch = this.searchForm.value;
            // Transform inputs
            employeeSearch = this.auxUtilService.transFormValues(employeeSearch, TranFormSerarchInputValues);

            if (this.searchForm.get('dob').value) {
                employeeSearch = this.auxUtilService.formatDateFields(employeeSearch, ['dob']);
            }
            this.store.dispatch(EmployeeCenterTableActions.EmployeeSearch({ employeeSearch }));
            this.matDialogRef.close();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter search criteria',
            });
            return;
        }
    }

    closeDocument(): void {
        this.matDialogRef.close();
    }

    onDateChange(event, formControlName) {
        this.searchForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.searchForm,
            formControlName
        );
    }
}
