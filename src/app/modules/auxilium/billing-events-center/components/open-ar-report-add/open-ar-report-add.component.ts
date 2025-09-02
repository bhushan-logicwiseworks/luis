import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert';
import { AuxPopupComponent, PopupData } from '../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { BillingEventsCenterDisplay } from '../../../../../shared/interfaces/auxilium/billing-events-center/billing-events-center.interfface';
import { PatientPayorsListComponent } from '../../../patient-center/components/patient-payors/patient-payors-list/patient-payors-list.component';
import { BillingEventsCenterCreateActions } from '../../actions/billing-events-center-create.actions';
import { BillingEventsCenterCreateSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-open-ar-report-add',
    templateUrl: './open-ar-report-add.component.html',
    styleUrl: './open-ar-report-add.component.scss',
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
        MatOption,
        NgFor,
        NgIf,
        FuseAlertComponent,
        MatIcon,
        AsyncPipe,
    ],
})
export class OpenARReportAddComponent implements OnInit, AfterViewInit, OnDestroy {
    billingForm: UntypedFormGroup;
    billingevents: BillingEventsCenterDisplay | null;
    alert: { type: string; message: string } | null = null;
    patientId: number;
    primaryOrSecondaryOptions = ['PRIMARY', 'SECONDARY'];

    appealOutcomeOptions: { value: string; description: string }[] = [
        { value: 'LOCATED EOB', description: 'Located EOB' },
        { value: 'CORRECTED', description: 'Resubmitted Claim' },
        { value: 'NO CLAIM FOUND', description: 'No Errors Found Resubmitted Claim' },
    ];
    owners$ = this.store.select(BillingEventsCenterCreateSelectors.selectOwners);
    loadingOwners$ = this.store.select(BillingEventsCenterCreateSelectors.selectLoadingOwners);
    // payorRank1$ = this.store.select(PatientCareManagementSelectors.selectPayorRank1);

    showUpdatedByUser: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: {
            dynamicComponentData?: {
                billingevents: BillingEventsCenterDisplay | null;
                addedBy: string;
                null;
                patientId: number;
            };
        },
        private dialogRef: MatDialogRef<OpenARReportAddComponent>,
        private formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private matDialog: MatDialog
    ) {
        this.billingevents = data.dynamicComponentData?.billingevents;
        this.patientId = data.dynamicComponentData?.patientId;
        this.store.dispatch(BillingEventsCenterCreateActions.LoadOwners());
    }

    ngOnInit(): void {
        this.billingForm = this.formBuilder.group({
            id: [this.billingevents?.id || 0],
            patientId: [this.patientId],
            todaysDate: [{ value: new Date(), disabled: true }, Validators.required],
            claimDateOfService: ['', Validators.required],
            owner: ['', Validators.required],
            primaryOrSecondary: ['', Validators.required],
            insuranceId: ['', Validators.required],
            outcome: ['', Validators.required],
            contactNote: ['', Validators.required],
        });

        if (this.billingevents) {
            this.billingForm.patchValue({
                ...this.billingevents,
            });
            this.billingForm.get('contactNote')?.clearValidators();
        }
    }

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {}

    saveOpenARReport(): void {
        if (this.billingForm.invalid) {
            this.alert = { type: 'error', message: 'Please fill all required fields.' };
            setTimeout(() => (this.alert = null), 6000);
            return;
        }

        let billingevents: BillingEventsCenterDisplay = {
            ...this.billingForm.getRawValue(),
        };

        billingevents = this.auxUtilService.transFormValuesToUpperCase(billingevents, [
            'primaryOrSecondary',
            'contactNote',
            'outcome',
            'owner',
        ]);

        billingevents = {
            ...billingevents,
            patientId: this.patientId,
            id: this.billingevents?.id || 0,
        };

        // Dispatch action to save the care management record
        this.store.dispatch(
            BillingEventsCenterCreateActions.SaveBillingEvent({ data: billingevents, filter: 'openarreport' })
        );
        this.dialogRef.close({ success: true });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    openPayorList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Payor',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Select Payor',
            dynamicComponent: PatientPayorsListComponent,
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
                    this.billingForm.get('insuranceId').setValue(result.id);
                }
            });
    }
}
