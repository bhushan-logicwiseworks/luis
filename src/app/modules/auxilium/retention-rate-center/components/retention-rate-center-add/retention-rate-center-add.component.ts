import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RetentionRate } from 'app/shared/interfaces/auxilium/retention-rate-center/retention-rate.interface';
import { RetentionRateCenterFormComponent } from '../retention-rate-center-form/retention-rate-center-form.component';

@Component({
    selector: 'app-retention-rate-center-add',
    templateUrl: './retention-rate-center-add.component.html',
    styleUrls: ['./retention-rate-center-add.component.scss'],
    imports: [RetentionRateCenterFormComponent],
})
export class RetentionRateCenterAddComponent {
    focused: boolean;
    isreadonly: boolean = false;
    retention: RetentionRate;
    contactForm: UntypedFormGroup;
    editMode: boolean = false;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: RetentionRate,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<RetentionRateCenterAddComponent>
    ) {
        this.retention = data;
    }

    cancelRetention(editMode: boolean | null = null): void {
        this.dialogRef.close();
    }

    /**
     * Save the retention
     */
    saveRetention(): void {
        this.dialogRef.close();
    }
}
