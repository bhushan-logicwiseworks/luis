import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { WorkOrderCenterIndividualActions } from '../../actions/work-order-center-individual.actions';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-batch-eligibility-popup',
    templateUrl: './batch-eligibility-popup.component.html',
    styleUrls: ['./batch-eligibility-popup.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        NgIf,
        MatError,
        MatButton,
    ],
})
export class BatchEligibilityPopupComponent {
    form: UntypedFormGroup;

    constructor(
        private fb: UntypedFormBuilder,
        private store: Store,
        public dialogRef: MatDialogRef<BatchEligibilityPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.form = this.fb.group({
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.form.valid) {
            const { startDate, endDate } = this.form.value;
            this.store.dispatch(WorkOrderCenterIndividualActions.FilterBatchEligibilityRecords({ startDate, endDate }));
            this.dialogRef.close('confirmed');
        }
    }

    onCancel() {
        this.dialogRef.close('cancelled');
    }
}
