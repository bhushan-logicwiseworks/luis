import { NgClass } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatError,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/select';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PatientAssignedPayorsListComponent } from '../../../patient-center/components/patient-payors/patient-assigned-payors-list/patient-assigned-payors-list.component';
import { PatientAssignedPhysicianListComponent } from '../../../patient-center/components/patient-physicians/patient-assigned-physician-list/patient-assigned-physician-list.component';
import { WorkOrderCenterTableActions } from '../../actions/work-order-center-table.actions';
@UntilDestroy()
@Component({
    selector: 'app-work-order-group-edit',
    templateUrl: './work-order-group-edit.component.html',
    styleUrls: ['./work-order-group-edit.component.scss'],
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
        MatStepper,
        MatStep,
        ReactiveFormsModule,
        MatFormField,
        NgClass,
        MatLabel,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        MatCheckbox,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatOption,
        MatIcon,
        MatPrefix,
    ],
})
export class WorkOrderGroupEditComponent {
    isLinear = false;
    patientGroupEditForm: FormGroup;
    patientId: number;

    filteredOptions = [
        {
            name: 'E',
        },
        {
            name: 'F',
        },
    ];

    confirmOptions = [
        {
            name: 'Yes',
        },
        {
            name: 'No',
        },
    ];
    patientGroupData: number[];

    constructor(
        private fb: FormBuilder,
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private auxUtilService: AuxUtilService,
        private store: Store,
        private matDialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private dialogRef: MatDialogRef<WorkOrderGroupEditComponent>
    ) {
        let id = Number(this.router.url.split('/')[3]);
        this.patientGroupData = data.dynamicComponentData;
        this.patientGroupEditForm = this.fb.group({
            patientid: [id],
            svcdate: [],
            todate: [],
            nextbill: [],
            cmnexpire: [],
            notesexpiredate: [],
            shipdate: [],
            authdate: [],
            shipstatus: [],
            invoiceno: [],
            authno: [],
            narrative: [],
            mod1: [],
            mod2: [],
            mod3: [],
            mod4: [],
            physicianFullName: [''],
            patientdoctorid1: [0],
            doctorId: [''],
            PrimaryPayorsName: [''],
            Payor1: [0],
            Payor2: [0],
            patientpayorid1: [0],
            patientpayorid2: [0],
            CoPayorsName: [''],
            isSvsdateClear: [false],
            isTodateClear: [false],
            isNextbillClear: [false],
            isCmnexpireClear: [false],
            isNotesexpiredateClear: [false],
            isShipdateClear: [false],
            isAuthdateClear: [false],
            isShipstatusClear: [false],
            isInvoicenoClear: [false],
            isAuthnoClear: [false],
            isNarrativeClear: [false],
            isMode1Clear: [false],
            isMode2Clear: [false],
            isMode3Clear: [false],
            isMode4Clear: [false],
            IsPayor1Clear: [false],
            IsPayor2Clear: [false],
        });
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
        this.store.dispatch(WorkOrderCenterTableActions.WOGroupEdit({ patientData }));
        this.dialogRef.close(true);
    }

    openPayorsList(fieldName: string) {
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
                    if (fieldName == 'Primary') {
                        this.patientGroupEditForm.get('PrimaryPayorsName').setValue(result.billTo);
                        this.patientGroupEditForm.get('patientpayorid1').setValue(result.id);
                        this.patientGroupEditForm.get('Payor1').setValue(result.payorId);
                    } else if (fieldName == 'Co-Pay') {
                        this.patientGroupEditForm.get('CoPayorsName').setValue(result.billTo);
                        this.patientGroupEditForm.get('patientpayorid2').setValue(result.id);
                        this.patientGroupEditForm.get('Payor2').setValue(result.payorId);
                    }
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
}
