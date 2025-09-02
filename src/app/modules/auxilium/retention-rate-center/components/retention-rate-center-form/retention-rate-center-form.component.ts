import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { RetentionRate } from 'app/shared/interfaces/auxilium/retention-rate-center/retention-rate.interface';
import { RetentionRateTableActions } from '../../actions/retention-rate-table.actions';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'ac-retention-rate-center-form',
    templateUrl: './retention-rate-center-form.component.html',
    styleUrls: ['./retention-rate-center-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        FuseAlertComponent,
    ],
})
export class RetentionRateCenterFormComponent {
    @Input() retention: RetentionRate;
    @Input() showDeleteButton: boolean = false;
    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    state = new FormControl();
    dateFormat: string = constVariables.DATE_FORMAT;
    data: RetentionRate;
    retentionRateForm: UntypedFormGroup;
    alert: any;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService
    ) {}

    ngOnInit(): void {
        // Create the Retention Rate form
        this.retentionRateForm = this._formBuilder.group({
            id: [0],
            year: ['', [Validators.required]],
            month: ['', [Validators.required]],
            initial: ['', [Validators.required]],
            new: ['', [Validators.required]],
            total: ['', [Validators.required]],
            /* createdDate: [''],
        createdBy: [''],
        modifiedDate: [''],
        modifiedBy: [''] */
        });

        // Patch values to the form
        this.retentionRateForm.patchValue(this.retention);

        /* this.retentionRateForm.controls['createdDate'].disable();
    this.retentionRateForm.controls['createdBy'].disable();
    this.retentionRateForm.controls['modifiedDate'].disable();
    this.retentionRateForm.controls['modifiedBy'].disable(); */
    }

    saveRetentionRate() {
        // Populate the object from the screen
        const retention: RetentionRate = this.retentionRateForm.value;

        this.store.dispatch(RetentionRateTableActions.AddRetention({ retention }));

        // trigger save event
        this.save.emit();
    }

    onDateChange(event, formControlName) {
        this.retentionRateForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.retentionRateForm,
            formControlName
        );
    }
}
