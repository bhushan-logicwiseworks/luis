import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { PatientPayors } from 'app/shared/interfaces/auxilium/patient-center/patient-payors.interface';
import { take } from 'rxjs/operators';
import { AuxSelectDropdownComponent } from '../../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { PatientCenterPayorsActions } from '../../../actions/patient-center-payors.action';
import { PatientCenterPayorsSelectors } from '../../../reducers';
@UntilDestroy()
@Component({
    selector: 'app-patient-payors-edit',
    templateUrl: './patient-payors-edit.component.html',
    styleUrls: ['./patient-payors-edit.component.scss'],
    imports: [ReactiveFormsModule, AuxSelectDropdownComponent, MatFormField, MatLabel, MatInput],
})
export class PatientPayorsEditComponent {
    payorData: PatientPayors;
    payorForm: FormGroup;
    rank = [
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

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private fb: FormBuilder,
        private store: Store,
        private _matDialogRef: MatDialogRef<PatientPayorsEditComponent>,
        private auxUtilService: AuxUtilService,
        private route: Router
    ) {
        this.payorData = data.dynamicComponentData;
        this.payorForm = this.fb.group({
            id: [''],
            rank: [1],
            policy: [''],
            payorId: [''],
            patientId: [''],
        });
    }

    ngOnInit(): void {
        if (this.payorData) {
            this.payorForm.patchValue(this.payorData);
            this.payorForm.get('patientId').setValue(Number(this.route.url.split('/')[3]));

            this.store
                .select(PatientCenterPayorsSelectors.selectPayors)
                .pipe(take(1), untilDestroyed(this))
                .subscribe(payors => {
                    const usedRanks = payors
                        .filter(payor => payor.id !== this.payorData.id)
                        .map(payor => payor.rank)
                        .filter(rank => rank !== 9);
                    this.rank = this.rank.filter(option => !usedRanks.includes(option.value) || option.value === 9);
                });
        }
    }

    close(): void {
        this._matDialogRef.close();
        this.payorForm.patchValue(this.payorData);
    }

    update() {
        if (this.payorForm.invalid) {
            return;
        }

        let payors = this.payorForm.value;
        payors = this.auxUtilService.transFormValuesToUpperCase(payors, ['policy']);
        this.store.dispatch(PatientCenterPayorsActions.AddPatientPayors({ payors }));
        this.close();
    }
}
