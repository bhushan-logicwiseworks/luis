import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PatientCenterDiagnosiscodeActions } from '../../../actions/patient-center-diagnosiscode.action';
import { PatientDiagnosisCodesListComponent } from '../patient-diagnosis-codes-list/patient-diagnosis-codes-list.component';
import { AuxSelectDropdownComponent } from '../../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { MatFormField, MatLabel, MatError, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@UntilDestroy()
@Component({
    selector: 'app-patient-diagnosis-codes-add',
    templateUrl: './patient-diagnosis-codes-add.component.html',
    styleUrls: ['./patient-diagnosis-codes-add.component.scss'],
    imports: [
        ReactiveFormsModule,
        AuxSelectDropdownComponent,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatIcon,
        MatPrefix,
    ],
})
export class PatientDiagnosisCodesAddComponent {
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
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private matDialog: MatDialog,
        private _matDialogRef: MatDialogRef<any>
    ) {
        let id = Number(this.router.url.split('/')[3]);
        this.patientDiagnosisForm = this.fb.group({
            id: [0],
            patientId: [id],
            icdCodeId: [],
            order: [],
            addUserId: [''],
            addDate: [''],
            name: [],
        });
    }

    ngOnInit() {}

    submitCodes() {
        let diagnosiscode = this.patientDiagnosisForm.value;
        delete diagnosiscode.name;
        if (diagnosiscode.id == 0) {
            diagnosiscode.addDate = new Date();
        }
        this.store.dispatch(PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscode({ diagnosiscode }));
        this._matDialogRef.close();
    }

    onDateChange(event, formControlName) {
        this.patientDiagnosisForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.patientDiagnosisForm,
            formControlName
        );
    }

    openDiagnosisCode() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Diagnosis Code',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientDiagnosisCodesListComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '50%',
            minHeight: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    this.patientDiagnosisForm.get('icdCodeId').setValue(result.id);
                    this.patientDiagnosisForm.get('name').setValue(result.icd10code);
                }
            });
    }
}
