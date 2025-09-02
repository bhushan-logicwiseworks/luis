import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { DropDownOptions } from 'app/shared/components/auxilium/contactInfo';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import { PatientCenterTableActions } from '../../actions/patient-center-table.actions';
import { PatientCenterTableSelectors } from '../../reducers';
import { MatFormField, MatLabel, MatPrefix, MatSuffix, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { AuxSelectDropdownComponent } from '../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { NgClass } from '@angular/common';
import { MatDatepickerToggle, MatDatepickerInput, MatDatepicker } from '@angular/material/datepicker';
import { NgxMaskDirective } from 'ngx-mask';
import { Numbers } from '../../../../../shared/directives/auxilium/aux-numbers.directive';
import { AuxPhonePipe } from '../../../../../shared/pipes/auxilium/aux-phone.pipe';
@UntilDestroy()
@Component({
    selector: 'patient-quick-save-form',
    templateUrl: './patient-quick-save-form.component.html',
    styleUrls: ['./patient-quick-save-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        AuxSelectDropdownComponent,
        NgClass,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepickerInput,
        MatDatepicker,
        MatError,
        NgxMaskDirective,
        Numbers,
        AuxPhonePipe,
    ],
})
export class AddNewPatientFormComponent implements OnInit {
    patientId: number;
    addForm: FormGroup;
    dropDownOption = DropDownOptions;
    newPatientId$ = this.store.select(PatientCenterTableSelectors.selectPatient);
    dateFormat: string = constVariables.DATE_FORMAT;
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<PatientEntity>,
        private _formBuilder: UntypedFormBuilder,
        private router: Router,
        private auxUtilService: AuxUtilService,
        private store: Store
    ) {}

    ngOnInit(): void {
        // Create the form
        this.addForm = this._formBuilder.group({
            id: [0],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            phone: [''],
        });
        this.newPatientId$.pipe(untilDestroyed(this)).subscribe(id => {
            this.patientId = id;
        });
    }

    /**
     * Save the document
     */
    savePatient(): void {
        if (this.addForm.invalid) {
            return;
        }
        // Set default date when adding a new record
        if (this.addForm.value.id == 0) {
            this.addForm.value.addDate = new Date();

            const patient: any = this.addForm.value;

            // Transform inputs to uppercase
            patient.firstname = patient.firstname ? patient.firstname.toUpperCase() : '';
            patient.lastname = patient.lastname ? patient.lastname.toUpperCase() : '';

            this.store.dispatch(PatientCenterTableActions.AddPatientQuickSave({ patient }));
            this.matDialogRef.close();
        }
    }

    closeDocument(): void {
        this.matDialogRef.close();
    }

    onDateChange(event, formControlName) {
        this.addForm = this.auxUtilService.manuallyCheckDateValid(event.target.value, this.addForm, formControlName);
    }
}
