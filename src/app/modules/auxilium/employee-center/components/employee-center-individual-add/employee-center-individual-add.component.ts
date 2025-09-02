import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { EmployeeCenterIndividualActions } from '../../actions/employee-center-individual.actions';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@UntilDestroy()
@Component({
    selector: 'ac-employee-center-individual-add',
    templateUrl: './employee-center-individual-add.component.html',
    styleUrls: ['./employee-center-individual-add.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
    ],
})
export class EmployeeCenterIndividualAddComponent implements OnInit {
    addForm: FormGroup;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private dialogRef: MatDialogRef<EmployeeCenterIndividualAddComponent>,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.addForm = this._formBuilder.group({
            id: [0],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required]],
        });
    }

    saveEmployee(): void {
        if (this.addForm.invalid) {
            return;
        }

        if (this.addForm.value.id == 0) {
            const employee: any = this.addForm.value;

            // Transform inputs to uppercase
            employee.firstname = employee.firstname ? employee.firstname.toUpperCase() : '';
            employee.lastname = employee.lastname ? employee.lastname.toUpperCase() : '';

            this.store.dispatch(EmployeeCenterIndividualActions.AddEmployee({ employee }));
            this.dialogRef.close();
        }
    }

    closeDocument(): void {
        this.dialogRef.close();
    }
}
