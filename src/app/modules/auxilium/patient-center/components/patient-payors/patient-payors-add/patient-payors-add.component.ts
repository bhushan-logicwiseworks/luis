import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PatientPayorsAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-payors-add.interface';
import { take } from 'rxjs';
import { AuxSelectDropdownComponent } from '../../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown.component';
import { PatientCenterPayorsActions } from '../../../actions/patient-center-payors.action';
import { PatientCenterPayorsSelectors } from '../../../reducers';
import { PatientPayorsListComponent } from '../patient-payors-list/patient-payors-list.component';
@UntilDestroy()
@Component({
    selector: 'app-patient-payors-add',
    templateUrl: './patient-payors-add.component.html',
    styleUrls: ['./patient-payors-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class PatientPayorsAddComponent {
    payorsForm: FormGroup;
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
    dropDownOption = [
        {
            name: 'SELF',
            value: 8,
        },
    ];
    getPatientId;

    constructor(
        private fb: FormBuilder,
        private _matDialogRef: MatDialogRef<PatientPayorsAddComponent>,
        private matDialog: MatDialog,
        private route: Router,
        private store: Store,
        private auxUtilService: AuxUtilService
    ) {
        this.payorsForm = this.fb.group({
            id: [0],
            rank: [1],
            patientId: [''],
            payorId: [''],
            payorName: ['', [Validators.required]],
            policy: [''],
        });
    }

    ngOnInit(): void {
        this.getPatientId = Number(this.route.url.split('/')[3]);
        this.payorsForm.get('patientId').setValue(this.getPatientId);
        this.store
            .select(PatientCenterPayorsSelectors.selectPayors)
            .pipe(take(1), untilDestroyed(this))
            .subscribe(payors => {
                const usedRanks = payors.map(payor => payor.rank).filter(rank => rank !== 9);
                this.rank = this.rank.filter(option => !usedRanks.includes(option.value) || option.value === 9);

                // Set default rank to the first available option
                if (this.rank.length > 0) {
                    this.payorsForm.get('rank').setValue(this.rank[0].value);
                }
            });
    }

    close(): void {
        this._matDialogRef.close();
    }

    save() {
        if (this.payorsForm.invalid) {
            return;
        }
        let payors: PatientPayorsAdd | any = this.payorsForm.value;
        payors = this.auxUtilService.transFormValuesToUpperCase(payors, ['policy']);
        delete payors.payorName;
        this.store.dispatch(PatientCenterPayorsActions.AddPatientPayors({ payors }));
        this._matDialogRef.close();
    }

    openPayorList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Payor for patient:' + this.getPatientId,
            cancelButtonText: 'Cancel',
            saveButtonText: 'Select Payor',
            dynamicComponent: PatientPayorsListComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'selectRow',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '70%',
            height: 'auto',
            data: popupData,
        });

        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    this.payorsForm.get('payorName').setValue(result.name);
                    this.payorsForm.get('payorId').setValue(result.id);
                }
            });
    }
}
