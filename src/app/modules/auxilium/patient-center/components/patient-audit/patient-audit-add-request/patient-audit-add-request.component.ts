import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { map } from 'rxjs';
import { FuseAlertComponent } from '../../../../../../../@fuse/components/alert/alert.component';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { Audit } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-audit.interface';
import { AuditActions } from '../../../actions/patient-audit.action';
import { PatientCareManagementActions } from '../../../actions/patient-caremanagement.action';
import { PatientCareManagementSelectors } from '../../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-patient-audit-add-request',
    templateUrl: './patient-audit-add-request.component.html',
    styleUrls: ['./patient-audit-add-request.component.scss'],
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
        AsyncPipe,
        LoadingOverlayComponent,
    ],
})
export class PatientAuditAddRequestComponent implements OnInit, AfterViewInit, OnDestroy {
    auditForm: UntypedFormGroup;
    audit: Audit | null;
    auditTypes = ['SERVICE', 'ADMIN'];
    issueSubtypes: { [key: string]: { subType: string; subTypeDescription: string }[] } = {
        SERVICE: [
            { subType: 'SERVICE1 ', subTypeDescription: 'No print, No ship' },
            { subType: 'SERVICE2', subTypeDescription: 'Product' },
            { subType: 'SERVICE3 ', subTypeDescription: 'Communication' },
        ],
        ADMIN: [
            { subType: 'ADMIN1', subTypeDescription: 'Medical Records' },
            { subType: 'ADMIN2', subTypeDescription: 'Documentation Error' },
            { subType: 'ADMIN3', subTypeDescription: 'Eligibility' },
            { subType: 'ADMIN4', subTypeDescription: 'Wound Assessment' },
            { subType: 'ADMIN5', subTypeDescription: 'Improper Shipment' },
            // { subType: 'ADMIN6', subTypeDescription: 'UNAUTHORIZED USE' },
            // { subType: 'ADMIN7', subTypeDescription: 'OTHER COMPLAINTS' },
            { subType: 'ADMIN8', subTypeDescription: 'Signature Hold' },
            { subType: 'ADMIN9', subTypeDescription: 'Dressing Size' },
        ],
    };
    resolutions = ['RESOLVED', 'NOT RESOLVED'];
    alert: { type: string; message: string } | null = null;
    patientId: number;
    owners$ = this.store.select(PatientCareManagementSelectors.selectOwners);
    loadingOwners$ = this.store.select(PatientCareManagementSelectors.selectOwnersLoading);

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: { dynamicComponentData?: { audit: Audit | null; addedBy: string; patientId: number } },
        private dialogRef: MatDialogRef<PatientAuditAddRequestComponent>,
        private formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService
    ) {
        this.audit = data.dynamicComponentData?.audit;
        this.patientId = data.dynamicComponentData?.patientId;
        this.store.dispatch(PatientCareManagementActions.LoadOwners());
    }

    ngOnInit(): void {
        this.auditForm = this.formBuilder.group({
            dateOfAudit: ['', Validators.required],
            subType: ['', Validators.required],
            auditType: ['', Validators.required],
            assignedTo: ['', Validators.required],
            auditor: ['', Validators.required],
            createdBy: [{ value: this.data?.dynamicComponentData?.addedBy, disabled: true }],
            resolution: [''],
            resolutionDate: [''],
            contactNote: ['', Validators.required],
            patientId: [this.patientId],
        });

        if (this.audit) {
            // Patch form with existing audit data, including auditType
            this.auditForm.patchValue({
                ...this.audit,
                subType: this.audit.subType, // Will be handled in template as subType + subTypeDescription
                resolutionDate: this.audit.resolutionDate == '1900-01-01T00:00:00' ? '' : this.audit.resolutionDate,
            });
            this.auditForm.get('contactNote')?.clearValidators(); // Disable createdBy field if editing
        }

        this.auditForm
            .get('auditType')
            ?.valueChanges.pipe(untilDestroyed(this))
            .subscribe(auditType => {
                this.auditForm.get('subType')?.setValue('');
                this.auditForm.get('subType')?.updateValueAndValidity();
            });

        this.auditForm
            .get('resolution')
            ?.valueChanges.pipe(
                map(resolution => {
                    const resolutionDateControl = this.auditForm.get('resolutionDate');
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
        const auditType = this.auditForm.get('auditType')?.value;
        return auditType ? this.issueSubtypes[auditType] || [] : [];
    }

    saveAudit(): void {
        if (this.auditForm.invalid) {
            console.log('this.auditForm', this.auditForm);

            this.alert = { type: 'error', message: 'Please fill all required fields.' };
            setTimeout(() => (this.alert = null), 6000);
            return;
        }

        let audit: Audit = {
            ...this.auditForm.getRawValue(),
        };

        // Split subType into subType and subTypeDescription
        const selectedSubType = audit.subType;
        const subTypeObj = this.getSubtypes().find(st => st.subType === selectedSubType);
        audit.subType = subTypeObj ? subTypeObj.subType : '';
        audit.subTypeDescription = subTypeObj ? subTypeObj.subTypeDescription : '';

        // Ensure resolutionDate is set to default if not provided
        if (!audit.resolutionDate || audit.resolution !== 'RESOLVED') {
            audit.resolutionDate = '1900-01-01';
        }

        audit = this.auxUtilService.transFormValuesToUpperCase(audit, [
            'auditType',
            'subType',
            'subTypeDescription',
            'assignedTo',
            'auditor',
            'createdBy',
            'resolution',
            'contactNote',
        ]);

        audit = {
            ...audit,
            patientId: this.patientId,
            id: this.audit?.id || 0,
        };

        const action = this.audit?.id ? AuditActions.updateAudit : AuditActions.addAudit;
        this.store.dispatch(action({ audit }));
        this.dialogRef.close({ success: true });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
