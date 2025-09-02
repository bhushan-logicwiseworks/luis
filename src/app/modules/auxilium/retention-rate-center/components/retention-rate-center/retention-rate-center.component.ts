import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogClose } from '@angular/material/dialog';
import { RetentionRate } from 'app/shared/interfaces/auxilium/retention-rate-center/retention-rate.interface';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { RetentionRateCenterFormComponent } from '../retention-rate-center-form/retention-rate-center-form.component';
import { DateTimeFormatPipe } from '../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

@Component({
    selector: 'app-retention-rate-center',
    templateUrl: './retention-rate-center.component.html',
    styleUrls: ['./retention-rate-center.component.scss'],
    imports: [
        MatDialogTitle,
        MatIcon,
        MatIconButton,
        MatTooltip,
        MatDialogClose,
        MatButton,
        RetentionRateCenterFormComponent,
        DateTimeFormatPipe,
    ],
})
export class RetentionRateCenterComponent {
    focused: boolean;
    isreadonly: boolean = false;
    retentionRate: RetentionRate;
    retentionRateForm: UntypedFormGroup;
    editMode: boolean = false;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: RetentionRate,
        private _formBuilder: UntypedFormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialogRef: MatDialogRef<RetentionRateCenterComponent>
    ) {
        this.retentionRate = data;
    }

    ngOnInit(): void {
        // Create the Retention Rate form
        this.retentionRateForm = this._formBuilder.group({
            id: [0],
            year: [''],
            month: [''],
            initial: [''],
            new: [''],
            total: [''],
            createdDate: [''],
            createdBy: [''],
            modifiedDate: [''],
            modifiedBy: [''],
        });

        this.retentionRateForm.patchValue(this.retentionRate);
    }

    ngAfterViewInit() {}

    onFocus() {}

    onBlur() {
        this.focused = false;
        this._changeDetectorRef.markForCheck();
    }

    ngOnDestroy() {}

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        } else {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete the Retention Rate
     */
    deleteRetentionRate(): void {
        this.dialogRef.close();
    }

    /**
     * Update the Retention Rate
     */
    updateRetentionRate(): void {
        this.dialogRef.close();
    }
}
