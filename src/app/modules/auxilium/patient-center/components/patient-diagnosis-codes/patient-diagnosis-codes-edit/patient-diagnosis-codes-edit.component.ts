import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { PatientDiagnosisCodes } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscodes.interface';
import { PatientCenterDiagnosiscodeActions } from '../../../actions/patient-center-diagnosiscode.action';
import { AuxSelectDropdownComponent } from '../../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';

@Component({
    selector: 'app-patient-diagnosis-codes-edit',
    templateUrl: './patient-diagnosis-codes-edit.component.html',
    styleUrls: ['./patient-diagnosis-codes-edit.component.scss'],
    imports: [ReactiveFormsModule, AuxSelectDropdownComponent],
})
export class PatientDiagnosisCodesEditComponent {
    diagnosisData: PatientDiagnosisCodes;
    dateFormat = constVariables.DATE_FORMAT;
    patientDiagnosisForm: FormGroup;
    order = [
        {
            name: 1,
            value: 1,
        },
        {
            name: 2,
            value: 2,
        },
        {
            name: 3,
            value: 3,
        },
        {
            name: 4,
            value: 4,
        },
        {
            name: 5,
            value: 5,
        },
        {
            name: 6,
            value: 6,
        },
        {
            name: 7,
            value: 7,
        },
        {
            name: 8,
            value: 8,
        },
        {
            name: 9,
            value: 9,
        },
        {
            name: 10,
            value: 10,
        },
    ];
    getPatientId;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private store: Store,
        private _matDialogRef: MatDialogRef<PatientDiagnosisCodesEditComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any
    ) {
        this.diagnosisData = data.dynamicComponentData;
        this.patientDiagnosisForm = this.fb.group({
            id: [0],
            patientId: [],
            order: [],
            addUserId: [''],
        });
    }

    ngOnInit() {
        this.getPatientId = Number(this.router.url.split('/')[3]);
        this.patientDiagnosisForm.get('patientId').setValue(this.getPatientId);
        this.patientDiagnosisForm.patchValue(this.diagnosisData);
    }

    submitCodes() {
        let diagnosiscode = this.patientDiagnosisForm.value;
        this.store.dispatch(PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscode({ diagnosiscode }));
        this._matDialogRef.close();
    }
}
