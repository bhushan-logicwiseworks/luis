import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { PatientCareManagement } from 'app/shared/interfaces/auxilium/patient-center/patient-caremanagement.interface';
import { FuseAlertComponent } from '../../../../../../../@fuse/components/alert/alert.component';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { PatientCareManagementActions } from '../../../actions/patient-caremanagement.action';
import { PatientCareManagementSelectors } from '../../../reducers';
@UntilDestroy()
@Component({
    selector: 'app-patient-caremanagement-add-request',
    templateUrl: './patient-caremanagement-add-request.component.html',
    styleUrl: './patient-caremanagement-add-request.component.scss',
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
        MatError,
        MatSelect,
        MatOption,
        LoadingOverlayComponent,
        NgFor,
        MatCheckbox,
        NgIf,
        FuseAlertComponent,
        AsyncPipe,
    ],
})
export class PatientCaremanagementAddRequestComponent implements OnInit, AfterViewInit, OnDestroy {
    careForm: UntypedFormGroup;
    patientCareManagement: PatientCareManagement | null;
    alert: { type: string; message: string } | null = null;
    patientId: number;
    billingCodeOptions = [
        { code: 'A4239', selected: false },
        { code: 'E2103', selected: false },
        { code: 'A9276', selected: false },
        { code: 'A9278', selected: false },
    ];
    billingDetailsOptions = [
        'AUTH APPROVED',
        'AUTH DENIED',
        'AUTH SUBMITTED',
        'AUTH NOT REQUIRED',
        'PRISM IS OUT OF NETWORK',
        'MISSING NOTES',
        'DEDUCTIBLE IS NOT MET',
        'PHARMACY ONLY BENEFIT',
        'PATIENT DOES NOT QUALIFY FOR CGM',
        'PCP REFERRAL SUBMITTED',
        'PCP REFERRAL APPROVED',
        'UNABLE TO OBTAIN PCP REFERRAL',
        'CANCELLED BY FACILITY',
        'CANCELLED BY PATIENT',
        'MISSING INSURANCE',
        'TITLEXIX',
        'LIBRE ONLY',
    ];
    owners$ = this.store.select(PatientCareManagementSelectors.selectOwners);
    loadingOwners$ = this.store.select(PatientCareManagementSelectors.selectOwnersLoading);
    payorRank1$ = this.store.select(PatientCareManagementSelectors.selectPayorRank1);

    labelOptions = [
        { name: 'AUTH', selected: false },
        { name: 'VERIFY', selected: false },
        { name: 'NOTES', selected: false },
    ];

    showUpdatedByUser: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: {
            dynamicComponentData?: {
                patientCareManagement: PatientCareManagement | null;
                addedBy: string;
                null;
                patientId: number;
            };
        },
        private dialogRef: MatDialogRef<PatientCaremanagementAddRequestComponent>,
        private formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService
    ) {
        this.patientCareManagement = data.dynamicComponentData?.patientCareManagement;
        this.patientId = data.dynamicComponentData?.patientId;
        this.store.dispatch(PatientCareManagementActions.LoadOwners());

        // Only fetch insurance ID when adding a new record
        if (this.patientId && !this.patientCareManagement) {
            this.store.dispatch(PatientCareManagementActions.LoadPayorRank1({ patientId: this.patientId }));

            this.payorRank1$.pipe(untilDestroyed(this)).subscribe(payorRank1 => {
                if (payorRank1?.[0]?.billTo) {
                    this.careForm.patchValue({
                        insuranceId: payorRank1[0].billTo,
                    });
                    this.careForm.get('insuranceId').disable();
                }
            });
        }
    }

    ngOnInit(): void {
        this.careForm = this.formBuilder.group({
            dateAssigned: [''],
            dueDate: ['', Validators.required],
            assignedTo: ['', Validators.required],
            servicedBy: ['', Validators.required],
            insuranceId: [{ value: '', disabled: true }, Validators.required],
            insuranceUpdated: [false, Validators.required],
            billingCode: ['', Validators.required],
            billingDetails: ['', Validators.required],
            sentForShipment: ['N'],
            shipmentDate: ['', ''],
            contactNote: ['', Validators.required],
            patientId: [this.patientId],
            createdBy: [{ value: this.data?.dynamicComponentData?.addedBy, disabled: true }],
            label: ['', Validators.required],
            nobleId: [''],
            updatedByUser: [''],
        });

        if (this.patientCareManagement) {
            this.careForm.patchValue({
                ...this.patientCareManagement,
                shipmentDate:
                    this.patientCareManagement.shipmentDate !== '1900-01-01T00:00:00'
                        ? this.patientCareManagement.shipmentDate
                        : '',
                dueDate:
                    this.patientCareManagement.dueDate !== '1900-01-01T00:00:00'
                        ? this.patientCareManagement.dueDate
                        : '',
            });
            this.careForm.get('contactNote')?.clearValidators();

            // Set billing code checkboxes based on existing value
            const existingCodes = this.patientCareManagement.billingCode?.split(',') || [];
            this.billingCodeOptions.forEach(option => {
                option.selected = existingCodes.includes(option.code);
            });

            // Set label checkboxes based on existing value
            const existingLabels = this.patientCareManagement.label?.split('/') || [];
            this.labelOptions.forEach(option => {
                option.selected = existingLabels.includes(option.name);
            });
        }

        const billingCtrl = this.careForm.get('billingDetails')!;

        // 1) subscribe
        billingCtrl.valueChanges.subscribe(value => {
            this.updateShowFlag(value);
        });

        // 2) run once with current value
        this.updateShowFlag(billingCtrl.value);
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {}

    saveCareManagement(): void {
        if (this.careForm.invalid) {
            this.alert = { type: 'error', message: 'Please fill all required fields.' };
            setTimeout(() => (this.alert = null), 6000);
            return;
        }

        let patientCareManagement: PatientCareManagement = {
            ...this.careForm.getRawValue(),
        };

        // Transform specific fields to uppercase
        patientCareManagement = this.auxUtilService.transFormValuesToUpperCase(patientCareManagement, [
            'assignedTo',
            'servicedBy',
            'billingCode',
            'billingDetails',
            'contactNote',
            'createdBy',
            'nobleId',
            'updatedByUser',
        ]);

        patientCareManagement = {
            ...patientCareManagement,
            patientId: this.patientId,
            id: this.patientCareManagement?.id || 0,
        };

        if (!patientCareManagement.shipmentDate) {
            patientCareManagement.shipmentDate = '1900-01-01T00:00:00';
        }

        if (!patientCareManagement.dueDate) {
            patientCareManagement.dueDate = '1900-01-01T00:00:00';
        }

        //console.log(patientCareManagement);

        // Dispatch action to save the care management record
        this.store.dispatch(PatientCareManagementActions.AddPatientCareManagement({ record: patientCareManagement }));
        this.dialogRef.close({ success: true });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    onBillingCodeChecked(option: { code: string; selected: boolean }): void {
        option.selected = !option.selected;
        const selectedCodes = this.billingCodeOptions.filter(opt => opt.selected).map(opt => opt.code);
        this.careForm.get('billingCode').setValue(selectedCodes.join(','));
    }

    onSentForShipmentChange(event: any): void {
        const shipmentDateControl = this.careForm.get('shipmentDate');
        const sentForShipmentControl = this.careForm.get('sentForShipment');

        if (event.checked) {
            sentForShipmentControl?.setValue('Y');
            //shipmentDateControl?.setValidators([Validators.required, this.auxUtilService.pastDateValidator()]);
        } else {
            sentForShipmentControl?.setValue('N');
            shipmentDateControl?.clearValidators();
            shipmentDateControl?.setValue(null);
        }
        shipmentDateControl?.updateValueAndValidity();
    }

    onLabelOptionChecked(option: { name: string; selected: boolean }): void {
        this.labelOptions.forEach(opt => (opt.selected = false)); // Uncheck all checkboxes
        option.selected = true; // Check the selected checkbox
        this.careForm.get('label').setValue(option.name); // Update the LABEL field
    }

    /** Helper to show/hide and reset when hidden */
    private updateShowFlag(value: string) {
        this.showUpdatedByUser =
            value === 'AUTH APPROVED' ||
            value === 'AUTH DENIED' ||
            value === 'PCP REFERRAL APPROVED' ||
            value === 'UNABLE TO OBTAIN PCP REFERRAL' ||
            value === 'CANCELLED BY FACILITY' ||
            value === 'CANCELLED BY PATIENT' ||
            value === 'MISSING INSURANCE' ||
            value === 'TITLEXIX' ||
            value === 'LIBRE ONLY';
        if (!this.showUpdatedByUser) {
            this.careForm.get('updatedByUser')!.reset();
        }
    }
}
