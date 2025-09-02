import { AsyncPipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { map } from 'rxjs';
import { constVariables } from '../../../../../../common/constants/constVariables';
import { GetPatientPlaceOfServiceResponse } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-place-service.interface';
import { PayorCenterDeatilsActions } from '../../../../payor-center/actions/payor-details.action';
import { PayorCenterDetailSelectors } from '../../../../payor-center/reducers';
import { WorkOrderCenterIndividualActions } from '../../../../work-order-center/actions/work-order-center-individual.actions';
import { PatientCenterDeatilsActions } from '../../../actions/patient-details.action';
import { PatientInquiryChangesActions } from '../../../actions/patient-inquiry-changes.action';
import { PatientCenterDetailsSelectors, PatientInquiryChangesSelectors } from '../../../reducers';
import { PatientDiagnosisAssignCodesListComponent } from '../../patient-diagnosis-codes/patient-diagnosis-assign-codes-list/patient-diagnosis-assign-codes-list.component';
import { PatientAssignedPayorsListComponent } from '../../patient-payors/patient-assigned-payors-list/patient-assigned-payors-list.component';
import { PatientAssignedPhysicianListComponent } from '../../patient-physicians/patient-assigned-physician-list/patient-assigned-physician-list.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-group-edit-inquiry-changes',
    templateUrl: './patient-group-edit-inquiry-changes.component.html',
    styleUrls: ['./patient-group-edit-inquiry-changes.component.scss'],
    animations: fuseAnimations,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
    ],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatCheckbox,
        MatOption,
        MatSelect,
        MatSelectTrigger,
        AsyncPipe,
        MatIcon,
    ],
})
export class PatientGroupEditInquiryChangesComponent {
    isLinear = false;
    patientGroupEditForm: FormGroup;
    dateFormat: string = constVariables.DATE_FORMAT;
    patientid: number;
    patientGroupData: number[];
    placeOfServiceReps$ = this.store.select(PatientCenterDetailsSelectors.selectPlaceOfService);
    placeOfServiceDropdown: GetPatientPlaceOfServiceResponse = [];

    billType$ = this.store.select(PatientInquiryChangesSelectors.selectBillType);
    billTypeDropDown;

    tranTypeDropdown;
    tranType$ = this.store.select(PatientInquiryChangesSelectors.selectTranType).pipe(
        map(data =>
            data.map(result => ({
                // name: result.code,
                code: result.code,
                description: result.description || result.code,
            }))
        )
    );

    PrintStatusDropDown;
    PrintStatusDropDown$ = this.store.select(PatientInquiryChangesSelectors.selectPrintStatus).pipe(
        map(data =>
            data.map(result => ({
                // name: result.code,
                code: result.code,
                description: result.description || result.code,
            }))
        )
    );

    primaryBillFormdropdown;
    primaryBillForm$ = this.store.select(PayorCenterDetailSelectors.selectPayorPrimaryBillForm).pipe(
        map(data =>
            data.map(result => ({
                name: result.code,
                value: result.code,
                description: result.description || result.code,
            }))
        )
    );

    constructor(
        private fb: FormBuilder,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private auxUtilService: AuxUtilService,
        private store: Store,
        private matDialog: MatDialog,
        private router: Router,
        private dialogRef: MatDialogRef<PatientGroupEditInquiryChangesComponent>
    ) {
        this.patientid = Number(this.router.url.split('/')[3]);
        this.store.dispatch(PatientInquiryChangesActions.PrintStatusDropDown());
        this.store.dispatch(WorkOrderCenterIndividualActions.BillTypeDropdown());
        this.store.dispatch(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDown());
        this.store.dispatch(PatientInquiryChangesActions.TranTypeDropdown());
        this.store.dispatch(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDown());
        this.patientGroupData = data.dynamicComponentData;
    }

    ngOnInit(): void {
        this.patientGroupEditForm = this.fb.group({
            patientid: [this.patientid],
            printstatus: [],
            trantype: [],
            billform: [],
            mod1: [],
            mod2: [],
            mod3: [],
            mod4: [],
            payor1: [0],
            patientpayorid: [0],
            payorName: [],
            patienticdid1: [],
            diagnosis: [],
            physicianFullName: [],
            patientdoctorid1: [0],
            authno: [],
            pos: [],
            isPrintStatusClear: [false],
            isTranTypeClear: [false],
            isBillingFormClear: [false],
            isMode1Clear: [false],
            isMode2Clear: [false],
            isMode3Clear: [false],
            isMode4Clear: [false],
            isPayor1Clear: [false],
            isDiagnosisClear: [false],
            isPatientdoctorid1Clear: [false],
            isAuthnoClear: [false],
            isPosClear: [false],
            isApplyToChargesClear: [false],
        });

        this.billType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.billTypeDropDown = res;
        });
        this.PrintStatusDropDown$.pipe(untilDestroyed(this)).subscribe(res => {
            this.PrintStatusDropDown = res;
        });
        this.tranType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.tranTypeDropdown = res;
        });
        this.primaryBillForm$.pipe(untilDestroyed(this)).subscribe(res => {
            this.primaryBillFormdropdown = res;
        });
        this.placeOfServiceReps$.pipe(untilDestroyed(this)).subscribe(res => {
            this.placeOfServiceDropdown = res;
        });

        //   SalesRep Dropdown
    }

    get selectedPrintStatus() {
        return this.PrintStatusDropDown.find(res => res.code === this.patientGroupEditForm.get('printstatus')?.value)
            ?.code;
    }
    get selectedTranType() {
        return this.tranTypeDropdown.find(res => res.code === this.patientGroupEditForm.get('trantype')?.value)?.code;
    }

    get selectedPrimaryBillForm() {
        return this.primaryBillFormdropdown.find(res => res.value === this.patientGroupEditForm.get('billform')?.value)
            ?.name;
    }
    get selectedPlaceOfService() {
        return this.placeOfServiceDropdown.find(res => res.code === this.patientGroupEditForm.get('pos')?.value)?.code;
    }

    onDateChange(event, formControlName) {
        this.patientGroupEditForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.patientGroupEditForm,
            formControlName
        );
    }

    submit() {
        let patientData = this.patientGroupEditForm.value;
        patientData['numbers'] = this.patientGroupData;
        this.store.dispatch(PatientInquiryChangesActions.EditGroupInquiryChanges({ patientData }));
        this.dialogRef.close(true);
    }

    openPayorList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Assigned Payors',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAssignedPayorsListComponent,
            dynamicComponentData: this.patientGroupEditForm.get('patientid').value,
            submitFunction: 'selectRow',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '50%',
            height: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    this.patientGroupEditForm.get('payorName').setValue(result.billTo);
                    this.patientGroupEditForm.get('patientpayorid').setValue(result.id);
                    this.patientGroupEditForm.get('Payor1').setValue(result.payorId);
                }
            });
    }

    openPhysicianList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Assigned Physician',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAssignedPhysicianListComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: 'auto',
            height: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    this.patientGroupEditForm
                        .get('physicianFullName')
                        .setValue(result.firstName + ' ' + result.lastName);
                    this.patientGroupEditForm.get('patientdoctorid1').setValue(result.id);
                }
            });
    }

    openDiagnosisCodePopup() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Diagnosis Codes',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Select Diagnosis Codes',
            dynamicComponent: PatientDiagnosisAssignCodesListComponent,
            dynamicComponentData: null,
            submitFunction: 'submitSelectedCode',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '60%',
            minHeight: 'auto',
            data: popupData,
        });

        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    // Update both the ID and the display code
                    this.patientGroupEditForm.get('patienticdid1').setValue(result.id);
                    this.patientGroupEditForm.get('diagnosis').setValue(result.icd10code);
                }
            });
    }
}
