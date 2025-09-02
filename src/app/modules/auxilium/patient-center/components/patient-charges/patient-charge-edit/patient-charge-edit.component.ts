import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseHorizontalNavigationComponent, FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { PatientCenterDiagnosiscodeActions } from 'app/modules/auxilium/patient-center/actions/patient-center-diagnosiscode.action';
import { PatientCenterPhysiciansActions } from 'app/modules/auxilium/patient-center/actions/patient-center-physicians.action';
import { PatientCenterDeatilsActions } from 'app/modules/auxilium/patient-center/actions/patient-details.action';
import { PatientDiagnosisAssignCodesListComponent } from 'app/modules/auxilium/patient-center/components/patient-diagnosis-codes/patient-diagnosis-assign-codes-list/patient-diagnosis-assign-codes-list.component';
import { PatientAssignedPayorsListComponent } from 'app/modules/auxilium/patient-center/components/patient-payors/patient-assigned-payors-list/patient-assigned-payors-list.component';
import { PatientAssignedPhysicianListComponent } from 'app/modules/auxilium/patient-center/components/patient-physicians/patient-assigned-physician-list/patient-assigned-physician-list.component';
import {
    PatientCenterDetailsSelectors,
    PatientCenterDiagnosiscodesSelectors,
    PatientCenterPhysiciansSelectors,
    PatientChargesSelectors,
} from 'app/modules/auxilium/patient-center/reducers';
import { WorkOrderCenterIndividualActions } from 'app/modules/auxilium/work-order-center/actions/work-order-center-individual.actions';
import { InventoryItemsListComponent } from 'app/modules/auxilium/work-order-center/components/inventory-items-list/inventory-items-list.component';
import { WorkOrderCenterIndividualSelectors } from 'app/modules/auxilium/work-order-center/reducers';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { GetPatientPlaceOfServiceResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-place-service.interface';
import { combineLatest, startWith } from 'rxjs';

import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

import { AsyncPipe, NgFor } from '@angular/common';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import {
    AuxPopupComponent,
    PopupData,
} from '../../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { AuxReferralFromComponent } from '../../../../../../shared/components/auxilium/aux-referral-from/aux-referral-from.component';
import { AuxSelectDropdownOption } from '../../../../../../shared/components/auxilium/aux-select-dropdown/aux-select-dropdown-option.interface';
import {
    TranFormInputValues,
    TransFormDateValues,
} from '../../../../../../shared/components/auxilium/work-order-details.enum';
import { PatientChargesById } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-charges-by-id.interface';
import { PhysicianCenterTableActions } from '../../../../physician-center/actions/physician-center-table.actions';
import { PatientChargesActions } from '../../../actions/patient-charges.action';

@UntilDestroy()
@Component({
    selector: 'aux-patient-charge-edit',
    templateUrl: './patient-charge-edit.component.html',
    styleUrls: ['./patient-charge-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIcon,
        MatPrefix,
        FuseHorizontalNavigationComponent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatAutocompleteTrigger,
        MatAutocomplete,
        NgFor,
        MatOption,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        MatCheckbox,
        MatSelect,
        MatSelectTrigger,
        AsyncPipe,
    ],
})
export class PatientChargeEditComponent {
    chargeForm: UntypedFormGroup;
    chargeId = null;
    branchName = new FormControl();
    patientChargeDisp: PatientChargesById;
    salesrepList: AuxSelectDropdownOption[];
    PatientChargesById$ = this.store.select(PatientChargesSelectors.selectPatientChargesById);
    diagnosisCodeList$ = this.store.select(PatientCenterDiagnosiscodesSelectors.selectdiagnosiscodesList);
    salesrep$ = this.store.select(WorkOrderCenterIndividualSelectors.selectDropDownSalesrep);
    placeOfServiceReps$ = this.store.select(PatientCenterDetailsSelectors.selectPlaceOfService);
    billType$ = this.store.select(WorkOrderCenterIndividualSelectors.selectBillType);
    itemCode$ = this.store.select(WorkOrderCenterIndividualSelectors.selectItemCode);
    selectedPhysician$ = this.store.select(PatientCenterPhysiciansSelectors.selectPhysicians);
    selectedPayors$ = this.store.select(WorkOrderCenterIndividualSelectors.selectPayorsDetail);
    referCode$ = this.store.select(WorkOrderCenterIndividualSelectors.selectReferCode);
    branch$ = this.store.select(WorkOrderCenterIndividualSelectors.selectBranch);

    toolbarData: FuseNavigationItem[];
    dateFormat: string = constVariables.DATE_FORMAT;
    billTypeDropdown;
    placeOfServiceDropdown: GetPatientPlaceOfServiceResponse = [];

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private matDialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private auxUtilService: AuxUtilService,
        private searchService: AuxSearchService
    ) {
        let id = Number(this.router.url.split('/')[3]);
        this.store.dispatch(WorkOrderCenterIndividualActions.LoadworkSalesRep());
        this.store.dispatch(WorkOrderCenterIndividualActions.BillTypeDropdown());
        this.store.dispatch(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDown());
        this.toolbarData = [
            {
                title: 'Save',
                type: 'basic',
                icon: 'mat_outline:save',
                function: () => {
                    this.save();
                },
            },
        ];
    }

    ngOnInit(): void {
        this.chargeForm = this._formBuilder.group({
            payorName: [''],
            id: [0],
            patientid: [''],
            authcount: [''],
            authused: [''],
            authdate: [''],
            salesid: [''],
            branchid: [''],
            primkey: [''],
            invoiceno: [''],
            diag24e: [''],
            submitted: [''],
            allowed: [''],
            dueprimary: [''],
            prepaid: [''],
            mod1: [''],
            mod2: [''],
            mod3: [''],
            mod4: [''],
            isrollup: [false],
            notesexpiredate: [''],
            tos: [''],
            quantity: [''],
            stopdate: [''],
            nextbill: [''],
            lastdatebilled: [''],
            svcdate: [''],
            todate: [''],
            cmnreq: [''],
            cmnfreq: [''],
            shipstatus: [''],
            shipdate: [''],
            lotnumber: [''],
            diagnosis: [''],
            diagnos2: [''],
            diagnos3: [''],
            diagnos4: [''],
            diagnos5: [''],
            diagnos6: [''],
            diagnos7: [''],
            diagnos8: [''],
            confirm: [''],
            hcpcscode: [''],
            description: [''],
            itemid: [''],
            itemCode: [''],
            billtype: [''],
            quantityshipped: [''],
            assignment: [false],
            isoverride: [false],
            monthsrented: [''],
            followup: [''],
            patalpha: [''],
            pickupreason: [''],
            trackingno: [''],
            shipvia: [''],
            deliverytype: [''],
            cmnexpire: [''],
            duesecondary: [''],
            narrative: [''],
            paponumber: [''],
            referid: [''],
            referCode: [''],
            patientdoctorid1: [''],
            physicianFullName: [''],
            patientpayorid2: [''],
            coPayorsName: [''],
            patientpayorid1: [''],
            PrimaryPayorsName: [''],
            payorid1: [''],
            payorid2: [''],
            patienticdid1: [0],
            icdc10code1: [''],
            patienticdid2: [0],
            icdc10code2: [''],
            patienticdid3: [0],
            icdc10code3: [''],
            patienticdid4: [0],
            icdc10code4: [''],
            patienticdid5: [0],
            icdc10code5: [''],
            patienticdid6: [0],
            icdc10code6: [''],
            patienticdid7: [0],
            icdc10code7: [''],
            patienticdid8: [0],
            icdc10code8: [''],
            pos: [''],
            priceid: [''],
            inventoryvendorid: [0],
        });
        this.route.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
            this.chargeId = paramMap.get('id');
            if (this.chargeId) {
                this.store.dispatch(PatientChargesActions.LoadChargesById({ chargeId: this.chargeId }));
                this.chargeForm.get('id').setValue(this.chargeId);
                this.patchForm();
            }
        });
        this.billType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.billTypeDropdown = res;
        });
        this.placeOfServiceReps$.pipe(untilDestroyed(this)).subscribe(res => {
            this.placeOfServiceDropdown = res;
        });
        //   SalesRep Dropdown
        this.salesrep$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data) {
                this.salesrepList = data.map(result => {
                    return {
                        name: result.firstName + ' ' + result.lastName,
                        value: result.id,
                    };
                });
            }
        });
    }

    save() {
        //  if (this.chargeForm.invalid) {
        //   return
        // }
        // Populate the patients object from the screen
        let patientcharge = this.chargeForm.value;

        // Transform inputs to uppercase
        patientcharge = this.auxUtilService.transFormValues(patientcharge, TranFormInputValues);

        // Transform inputs to uppercase
        patientcharge = this.auxUtilService.transFormValuesToUpperCase(patientcharge, [
            'physician',
            'sourcetable',
            'invoiceno',
            'patalpha',
        ]);

        if (patientcharge.itemCode === '') {
            patientcharge.itemid = 0;
        }
        delete patientcharge.PrimaryPayorsName;
        delete patientcharge.coPayorsName;
        delete patientcharge.physicianFullName;
        delete patientcharge.referCode;
        delete patientcharge.icdc10code1;
        delete patientcharge.icdc10code2;
        delete patientcharge.icdc10code3;
        delete patientcharge.icdc10code4;

        patientcharge = this.auxUtilService.transformBankStringToDefaultDate(patientcharge, TransFormDateValues);

        patientcharge = this.auxUtilService.formatDateFields(patientcharge, TransFormDateValues);

        patientcharge = this.auxUtilService.cleanData(patientcharge);

        this.store.dispatch(PatientChargesActions.AddCharges({ charges: patientcharge }));
    }

    get selectedBillType() {
        return this.billTypeDropdown.find(res => res.billType === this.chargeForm.get('billtype')?.value)?.billType;
    }

    get selectedSalesRep() {
        return this.salesrepList.find(res => res.value === this.chargeForm.get('salesid')?.value)?.name;
    }

    get selectedPlaceOfService() {
        return this.placeOfServiceDropdown.find(res => res.code === this.chargeForm.get('pos')?.value)?.code;
    }

    patchForm() {
        this.PatientChargesById$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data != null) {
                const payorIds = [data.payorid1, data.payorid2];
                // const payorIds = [data.patientpayorid1, data.patientpayorid2];
                this.store.dispatch(WorkOrderCenterIndividualActions.getReferCode({ id: data.referid }));
                this.store.dispatch(PhysicianCenterTableActions.LoadPhysicianById({ id: data.doctorid1.toString() }));
                this.store.dispatch(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscode({ id: data.patientid }));
                this.store.dispatch(PatientCenterPhysiciansActions.LoadPatientPhysicians({ id: data.patientid }));
                this.store.dispatch(WorkOrderCenterIndividualActions.LoadPayorDetails({ id: payorIds }));
                this.referCode$.pipe(untilDestroyed(this)).subscribe(referral => {
                    if (referral) {
                        this.chargeForm.get('referCode').setValue(referral['desciption']);
                    }
                });

                this.selectedPhysician$.pipe(untilDestroyed(this)).subscribe(physican => {
                    if (physican) {
                        physican.forEach(element => {
                            if (element.id == data.patientdoctorid1) {
                                this.chargeForm
                                    .get('physicianFullName')
                                    .setValue(element.firstName + ' ' + element.lastName);
                                this.chargeForm.get('patientdoctorid1').setValue(element.id);
                            }
                        });
                    }
                });

                this.diagnosisCodeList$.pipe(untilDestroyed(this)).subscribe(codeList => {
                    const icdFields = ['icdc10code1', 'icdc10code2', 'icdc10code3', 'icdc10code4'];
                    const patientIdFields = ['patienticdid1', 'patienticdid2', 'patienticdid3', 'patienticdid4'];
                    // Clear the form fields before processing
                    icdFields.forEach(icdField => {
                        this.chargeForm.get(icdField).setValue('');
                    });
                    patientIdFields.forEach(patientIdField => {
                        this.chargeForm.get(patientIdField).setValue(0);
                    });

                    if (codeList && codeList.length > 0) {
                        codeList.forEach(code => {
                            patientIdFields.forEach((patientIdField, index) => {
                                if (data[patientIdField] && code.id === data[patientIdField]) {
                                    this.chargeForm.get(icdFields[index]).setValue(code.icd10code);
                                    this.chargeForm.get(patientIdField).setValue(code.id);
                                }
                            });
                        });
                    }
                });

                this.selectedPayors$.pipe(untilDestroyed(this)).subscribe(payors => {
                    if (payors && payors != null) {
                        if (payors.id === this.chargeForm.get('payorid1').value) {
                            this.chargeForm.get('PrimaryPayorsName').setValue(payors.billto);
                            this.chargeForm.get('payorid1').setValue(payors.id);
                        }
                        if (payors.id === this.chargeForm.get('payorid2').value) {
                            this.chargeForm.get('coPayorsName').setValue(payors.billto);
                            this.chargeForm.get('payorid2').setValue(payors.id);
                        }
                    }
                });
                this.patientChargeDisp = data;
                if (this.patientChargeDisp.itemid !== 0) {
                    this.itemCode$.pipe(untilDestroyed(this)).subscribe(itemcode => {
                        this.chargeForm.get('itemCode').setValue(itemcode['desciption']);
                    });
                    const itemId = this.patientChargeDisp.itemid;
                    this.store.dispatch(WorkOrderCenterIndividualActions.getItemCode({ id: itemId }));
                    // this.store.dispatch(WorkOrderCenterIndividualActions.resetState());
                } else {
                    this.chargeForm.get('itemCode').setValue('');
                }

                const workRepsDetails: Record<string, any> = {
                    ...this.patientChargeDisp,
                };
                workRepsDetails.branchid = this.patientChargeDisp.branchid.toString();
                workRepsDetails.description =
                    this.patientChargeDisp.description + '' + this.patientChargeDisp.description2;

                const defaultDate = '1900-01-01T00:00:00';
                const dateFields = [
                    'lastdatebilled',
                    'svcdate',
                    'todate',
                    'shipdate',
                    'stopdate',
                    'nextbill',
                    'authdate',
                    'notesexpiredate',
                    'cmnexpire',
                ];
                dateFields.forEach(field => {
                    if (workRepsDetails[field] === defaultDate) {
                        workRepsDetails[field] = '';
                    }
                });

                this.chargeForm.patchValue(workRepsDetails);

                combineLatest([
                    this.branch$,
                    this.chargeForm.get('branchid').valueChanges.pipe(startWith(this.chargeForm.get('branchid').value)),
                ])
                    .pipe(untilDestroyed(this))
                    .subscribe(([branches, branchid]) => {
                        if (branches && Number(branchid)) {
                            const selectedBranch = branches.find(branch => branch.id === Number(branchid));
                            if (selectedBranch) {
                                this.onBranchSelected(selectedBranch);
                            }
                        }
                    });
            }
        });
    }

    backToListing() {
        window.history.back();
    }

    openItemList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Item Code',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: InventoryItemsListComponent,
            dynamicComponentData: {
                itemCode: this.chargeForm.get('itemCode').value,
            },
            submitFunction: 'selectRowSubmit',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '70%',
            height: 'auto',
            data: popupData,
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //console.log('luicho',result);
                this.chargeForm.get('itemCode').setValue(result.itemcode);
                this.chargeForm.get('itemid').setValue(result.id);
                this.chargeForm.get('description').setValue(result.description);
                this.chargeForm.get('inventoryvendorid').setValue(result.inventoryvendorid);
            }
            this.searchService.saveFilterState({}, 'inventoryItemsList');
        });
    }

    onDateChange(event, formControlName) {
        this.chargeForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.chargeForm,
            formControlName
        );
    }

    openReferralList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Referral From',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: AuxReferralFromComponent,
            dynamicComponentData: null,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            width: '60%',
            height: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    this.chargeForm.get('referid').setValue(result.id);
                    this.chargeForm.get('referCode').setValue(result.referCode);
                }
            });
    }

    openAssignedPhysicianList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Assigned Physician',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAssignedPhysicianListComponent,
            dynamicComponentData: this.chargeForm.get('patientid').value,
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
                    this.chargeForm.get('physicianFullName').setValue(result.firstName + ' ' + result.lastName);
                    this.chargeForm.get('patientdoctorid1').setValue(result.id);
                }
            });
    }

    openPayorsList(fieldName: string) {
        let selectedPayorId = null;
        if (fieldName === 'Primary') {
            selectedPayorId = this.chargeForm.get('patientpayorid1').value;
        } else if (fieldName === 'Co-Pay') {
            selectedPayorId = this.chargeForm.get('patientpayorid2').value;
        }

        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Assigned Payors',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAssignedPayorsListComponent,
            dynamicComponentData: {
                patientId: this.chargeForm.get('patientid').value,
                selectedPayorId: selectedPayorId,
            },
            submitFunction: '',
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
                        this.chargeForm.get('PrimaryPayorsName').setValue(result.billTo);
                        this.chargeForm.get('patientpayorid1').setValue(result.id);
                    } else if (fieldName == 'Co-Pay') {
                        this.chargeForm.get('coPayorsName').setValue(result.billTo);
                        this.chargeForm.get('patientpayorid2').setValue(result.id);
                    }
                }
            });
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    openDiagnosisCodePopup(selectedCodeName: string) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Diagnosis Codes',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Select Diagnosis Codes',
            dynamicComponent: PatientDiagnosisAssignCodesListComponent, // Component you want to load dynamically
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
                    switch (selectedCodeName) {
                        case 'patienticdid1':
                            this.chargeForm.get('patienticdid1').setValue(result.id);
                            this.chargeForm.get('icdc10code1').setValue(result.icd10code);
                            break;
                        case 'patienticdid2':
                            this.chargeForm.get('patienticdid2').setValue(result.id);
                            this.chargeForm.get('icdc10code2').setValue(result.icd10code);
                            break;
                        case 'patienticdid3':
                            this.chargeForm.get('patienticdid3').setValue(result.id);
                            this.chargeForm.get('icdc10code3').setValue(result.icd10code);
                            break;
                        case 'patienticdid4':
                            this.chargeForm.get('patienticdid4').setValue(result.id);
                            this.chargeForm.get('icdc10code4').setValue(result.icd10code);
                            break;
                        default:
                            break;
                    }
                }
            });
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.chargeForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
