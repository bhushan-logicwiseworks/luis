import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { Compliance } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance.interface';
import { map } from 'rxjs';
import { ComplianceActions } from '../../../actions/patient-compliance.action';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatSelect, MatOption } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { FuseAlertComponent } from '../../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-compliance-add-request',
    templateUrl: './patient-compliance-add-request.component.html',
    styleUrl: './patient-compliance-add-request.component.scss',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatSelect,
        NgFor,
        MatOption,
        NgIf,
        FuseAlertComponent,
    ],
})
export class PatientComplianceAddRequestComponent implements OnInit, AfterViewInit, OnDestroy {
    complianceForm: UntypedFormGroup;
    compliance: Compliance | null;
    issueTypes = ['CONCERN', 'COMPLAINT', 'HIPAA'];
    issueSubtypes: { [key: string]: { subType: string; subTypeDescription: string }[] } = {
        CONCERN: [
            { subType: 'CON1', subTypeDescription: 'PRODUCT ISSUE' },
            { subType: 'CON2', subTypeDescription: 'PRODUCT PERFORMANCE ISSUE' },
            { subType: 'CON3', subTypeDescription: 'POOR CUSTOMER SERVICE' },
            { subType: 'CON4', subTypeDescription: 'BILLING-RETURN ISSUE' },
            { subType: 'CON5', subTypeDescription: 'NO-FAULT ISSUE' },
            { subType: 'CON6', subTypeDescription: 'OTHER ISSUES' },
        ],
        COMPLAINT: [
            { subType: 'CMP1', subTypeDescription: 'ADVERSE EFFECT' },
            { subType: 'CMP2', subTypeDescription: 'UNETHICAL BEHAVIOR' },
            { subType: 'CMP3', subTypeDescription: 'UNRESOLVED' },
        ],
        HIPAA: [
            { subType: 'HIPAA1', subTypeDescription: 'AUTHORIZED DISCLOSURE' },
            { subType: 'HIPAA2', subTypeDescription: 'SECURITY INCIDENT' },
        ],
    };
    resolutions = ['RESOLVED', 'NOT RESOLVED'];
    alert: { type: string; message: string } | null = null;
    patientId: number;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: { dynamicComponentData?: { compliance: Compliance | null; addedBy: string; patientId: number } },
        private dialogRef: MatDialogRef<PatientComplianceAddRequestComponent>,
        private formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService
    ) {
        this.compliance = data.dynamicComponentData?.compliance;
        this.patientId = data.dynamicComponentData?.patientId;
    }

    ngOnInit(): void {
        this.complianceForm = this.formBuilder.group({
            dateOfOccurrence: ['', Validators.required],
            issueType: ['', Validators.required],
            subType: ['', Validators.required],
            createdBy: [{ value: this.data?.dynamicComponentData?.addedBy, disabled: true }],
            resolution: [''],
            resolutionDate: [''],
            contactNote: ['', Validators.required],
            patientId: [this.patientId],
        });

        if (this.compliance) {
            // Patch form with existing compliance data, including subType
            this.complianceForm.patchValue({
                ...this.compliance,
                subType: this.compliance.subType, // Will be handled in template as subType + subTypeDescription
                resolutionDate:
                    this.compliance.resolutionDate == '1900-01-01T00:00:00' ? '' : this.compliance.resolutionDate,
            });
            this.complianceForm.get('contactNote')?.clearValidators(); // Disable createdBy field if editing
        }

        this.complianceForm
            .get('issueType')
            ?.valueChanges.pipe(untilDestroyed(this))
            .subscribe(issueType => {
                this.complianceForm.get('subType')?.setValue('');
                this.complianceForm.get('subType')?.updateValueAndValidity();
            });

        this.complianceForm
            .get('resolution')
            ?.valueChanges.pipe(
                map(resolution => {
                    const resolutionDateControl = this.complianceForm.get('resolutionDate');
                    if (resolution === 'RESOLVED') {
                        resolutionDateControl?.setValidators(Validators.required);
                    } else {
                        resolutionDateControl?.clearValidators();
                        resolutionDateControl?.setValue('');
                    }
                    resolutionDateControl?.updateValueAndValidity();
                }),
                untilDestroyed(this)
            )
            .subscribe();
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {}

    getSubtypes(): { subType: string; subTypeDescription: string }[] {
        const issueType = this.complianceForm.get('issueType')?.value;
        return issueType ? this.issueSubtypes[issueType] || [] : [];
    }

    saveCompliance(): void {
        if (this.complianceForm.invalid) {
            console.log('this.complianceForm', this.complianceForm);

            this.alert = { type: 'error', message: 'Please fill all required fields.' };
            setTimeout(() => (this.alert = null), 6000);
            return;
        }

        let compliance: Compliance = {
            ...this.complianceForm.getRawValue(),
        };

        // Split subType into subType and subTypeDescription
        const selectedSubType = compliance.subType;
        const subTypeObj = this.getSubtypes().find(st => st.subType === selectedSubType);
        compliance.subType = subTypeObj ? subTypeObj.subType : '';
        compliance.subTypeDescription = subTypeObj ? subTypeObj.subTypeDescription : '';

        // Ensure resolutionDate is set to default if not provided
        if (!compliance.resolutionDate || compliance.resolution !== 'RESOLVED') {
            compliance.resolutionDate = '1900-01-01';
        }

        compliance = this.auxUtilService.transFormValuesToUpperCase(compliance, [
            'issueType',
            'subType',
            'resolution',
            'createdBy',
            'contactNote',
            'subTypeDescription',
        ]);

        compliance = {
            ...compliance,
            patientId: this.patientId,
            id: this.compliance?.id || 0,
        };

        const action = this.compliance?.id ? ComplianceActions.updateCompliance : ComplianceActions.addCompliance;
        this.store.dispatch(action({ compliance }));
        this.dialogRef.close({ success: true });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
