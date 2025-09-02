import { Component, Inject, Input, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { PatientPhysicianAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians-add.interface';
import { PatientPhysicians } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians.interface';
import { PatientCenterPhysiciansActions } from '../../../actions/patient-center-physicians.action';
import { AuxSelectDropdownComponent } from '../../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';

@Component({
    selector: 'app-patient-physician-edit',
    templateUrl: './patient-physician-edit.component.html',
    styleUrls: ['./patient-physician-edit.component.scss'],
    imports: [ReactiveFormsModule, AuxSelectDropdownComponent],
})
export class PatientPhysicianEditComponent {
    @Input() physicianData: PatientPhysicians;
    physicianForm: FormGroup;
    orderList = [
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
    ];

    typeList = [
        {
            name: 'RENDERING',
            value: 'RENDERING',
        },
        {
            name: 'REFERRING',
            value: 'REFERRING',
        },
        {
            name: 'BOTH',
            value: 'BOTH',
        },
    ];
    getPatientId;

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private matDialog: MatDialog,
        private auxUtilService: AuxUtilService,
        private _matDialogRef: MatDialogRef<PatientPhysicianEditComponent>,
        private route: Router,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any
    ) {
        this.physicianData = data.dynamicComponentData;
        this.physicianForm = this.fb.group({
            patientId: [''],
            id: [0],
            order: [1],
            addUserId: [''],
        });
    }

    ngOnInit(): void {
        this.getPatientId = Number(this.route.url.split('/')[3]);
        this.physicianForm.get('patientId').setValue(this.getPatientId);
        this.physicianForm.patchValue(this.physicianData);
    }

    save() {
        if (this.physicianForm.invalid) {
            return;
        }
        let physicians: PatientPhysicianAdd | any = this.physicianForm.value;
        physicians = this.auxUtilService.transFormValuesToUpperCase(physicians, ['type']);
        delete physicians.physicianame;
        this.store.dispatch(PatientCenterPhysiciansActions.AddPatientPhysicians({ physicians }));
        this._matDialogRef.close();
    }
}
