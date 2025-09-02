import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { PatientInquiryChangesActions } from 'app/modules/auxilium/patient-center/actions/patient-inquiry-changes.action';
import {
    PatientCenterDetailsSelectors,
    PatientCenterDiagnosiscodesSelectors,
    PatientCenterPhysiciansSelectors,
    PatientDemographicsSelectors,
    PatientInquiryChangesSelectors,
} from 'app/modules/auxilium/patient-center/reducers';
import { InventoryItemsListComponent } from 'app/modules/auxilium/work-order-center/components/inventory-items-list/inventory-items-list.component';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxReferralFromComponent } from 'app/shared/components/auxilium/aux-referral-from/aux-referral-from.component';
import { PatientArHistory } from 'app/shared/interfaces/auxilium/patient-center/patient-ar-history.interface';
import { combineLatest, filter, map, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import {
    AuxPopupComponent,
    PopupData,
} from '../../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { TranFormInputValues } from '../../../../../../shared/components/auxilium/work-order-details.enum';
import { GetPatientPlaceOfServiceResponse } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-place-service.interface';
import { PayorCenterDeatilsActions } from '../../../../payor-center/actions/payor-details.action';
import { PayorCenterDetailSelectors } from '../../../../payor-center/reducers';
import { WorkOrderCenterIndividualActions } from '../../../../work-order-center/actions/work-order-center-individual.actions';
import { WorkOrderCenterIndividualSelectors } from '../../../../work-order-center/reducers';
import { PatientCenterDiagnosiscodeActions } from '../../../actions/patient-center-diagnosiscode.action';
import { PatientCenterPhysiciansActions } from '../../../actions/patient-center-physicians.action';
import { PatientDemographicsActions } from '../../../actions/patient-demographics.action';
import { PatientCenterDeatilsActions } from '../../../actions/patient-details.action';
import { PatientDiagnosisAssignCodesListComponent } from '../../patient-diagnosis-codes/patient-diagnosis-assign-codes-list/patient-diagnosis-assign-codes-list.component';
import { PatientAssignedPayorsListComponent } from '../../patient-payors/patient-assigned-payors-list/patient-assigned-payors-list.component';
import { PatientAssignedPhysicianListComponent } from '../../patient-physicians/patient-assigned-physician-list/patient-assigned-physician-list.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-inquiry-changes-edit',
    templateUrl: './patient-inquiry-changes-edit.component.html',
    styleUrls: ['./patient-inquiry-changes-edit.component.scss'],
    imports: [
        MatIcon,
        MatPrefix,
        FuseHorizontalNavigationComponent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatAutocompleteTrigger,
        MatAutocomplete,
        NgFor,
        MatSelectTrigger,
        AsyncPipe,
    ],
})
export class PatientInquiryChangesEditComponent {
    InquiryChangesForm: UntypedFormGroup;
    workOrderId = null;
    workReps: PatientArHistory;
    branchName = new FormControl();
    workRepDetails$ = this.store.select(PatientInquiryChangesSelectors.selectInquiryChangesId);
    salesrep$ = this.store.select(PatientInquiryChangesSelectors.selectSalesRep).pipe(
        map(data =>
            data.map(result => ({
                name: result.firstName + ' ' + result.lastName,
                value: result.id,
            }))
        )
    );
    referralData: { company?: string; firstName?: string; lastName?: string } = {};
    toolbarData: FuseNavigationItem[];
    dateFormat: string = constVariables.DATE_FORMAT;
    printStatus$ = this.store.select(PatientInquiryChangesSelectors.selectPrintStatus);
    billType$ = this.store.select(PatientInquiryChangesSelectors.selectBillType);
    // billTo$ = this.store.select(PatientInquiryChangesSelectors.selectBillTo);
    icdCode$ = this.store.select(PatientInquiryChangesSelectors.selectIcdCode);
    diagnosisCodeList$ = this.store.select(PatientCenterDiagnosiscodesSelectors.selectdiagnosiscodesList);
    selectedPhysician$ = this.store.select(PatientCenterPhysiciansSelectors.selectPhysicians);
    selectedPayors$ = this.store.select(WorkOrderCenterIndividualSelectors.selectPayorsDetail);
    referCode$ = this.store.select(PatientDemographicsSelectors.selectReferCode);
    branch$ = this.store.select(PatientInquiryChangesSelectors.selectBranch);
    placeOfServiceReps$ = this.store.select(PatientCenterDetailsSelectors.selectPlaceOfService);
    placeOfServiceDropdown: GetPatientPlaceOfServiceResponse = [];
    billTypeDropDown;

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
    claimTypedropdown;
    claimType$ = this.store.select(PatientInquiryChangesSelectors.selectClaimType).pipe(
        map(data =>
            data.map(result => ({
                code: result.code,
                value: result.code,
                description: result.description || result.code,
            }))
        )
    );
    pwkTypeDropdown;
    pwkType$ = this.store.select(PatientInquiryChangesSelectors.selectPwkType).pipe(
        map(data =>
            data.map(result => ({
                code: result.code,
                value: result.code,
                description: result.description || result.code,
            }))
        )
    );
    pwkMethodDropdown;
    pwkMethod$ = this.store.select(PatientInquiryChangesSelectors.selectPwkMethod).pipe(
        map(data =>
            data.map(result => ({
                code: result.code,
                value: result.code,
                description: result.description || result.code,
            }))
        )
    );
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private matDialog: MatDialog,
        private route: ActivatedRoute,
        private auxUtilService: AuxUtilService,
        private router: Router
    ) {
        let id = Number(this.router.url.split('/')[3]);
        this.store.dispatch(WorkOrderCenterIndividualActions.LoadworkSalesRep());
        this.store.dispatch(WorkOrderCenterIndividualActions.BillTypeDropdown());
        this.store.dispatch(PatientInquiryChangesActions.TranTypeDropdown());
        this.store.dispatch(PatientInquiryChangesActions.ClaimTypeDropdown());
        this.store.dispatch(PatientInquiryChangesActions.PwkTypeDropdown());
        this.store.dispatch(PatientInquiryChangesActions.PwkMethodDropdown());
        this.store.dispatch(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDown());
        this.store.dispatch(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDown());
        this.store.dispatch(PatientInquiryChangesActions.PrintStatusDropDown());
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

    save() {
        if (this.InquiryChangesForm.invalid) {
            return;
        }
        // Populate the patients object from the screen
        let workrep = this.InquiryChangesForm.value;

        // Transform inputs to uppercase
        workrep = this.auxUtilService.transFormValues(workrep, TranFormInputValues);

        // Transform inputs to uppercase
        workrep = this.auxUtilService.transFormValuesToUpperCase(workrep, [
            'icn',
            'description',
            'mod1',
            'mod2',
            'mod3',
            'mod4',
        ]);

        if (workrep.itemCode === '') {
            workrep.itemid = 0;
        }
        workrep = this.auxUtilService.transformBankStringToDefaultDate(workrep, ['svcdate', 'servicedate', 'todate']);

        workrep = this.auxUtilService.formatDateFields(workrep, ['svcdate', 'todate', 'servicedate']);

        workrep = this.auxUtilService.cleanData(workrep);

        this.store.dispatch(PatientInquiryChangesActions.AddinquiryChanges({ inquirychanges: workrep }));
    }

    ngOnInit(): void {
        this.InquiryChangesForm = this._formBuilder.group({
            printstatus: [''],
            payorName: [''],
            billform: [''],
            id: [0],
            referCode: [''],
            trantype: [''],
            claimtype: [''],
            svcdate: [''],
            icn: [''],
            pos: [''],
            paponumber: [''],
            patienticdid1: [''],
            patientid: [''],
            referid: [''],
            patientdoctorid1: [''],
            icd10code: [''],
            pwktransmissioncode: [''],
            pwktypecode: [''],
            pwkattachmentcn: [''],
            pwkccn: [''],
            balance: [''],
            tranamount: [''],
            physician: [''],
            salesid: [''],
            branchid: [''],
            submitted: [''],
            allowed: [''],
            mod1: [''],
            mod2: [''],
            mod3: [''],
            mod4: [''],
            tos: [''],
            quantity: [''],
            servicedate: [''],
            todate: [''],
            hcpcscode: [''],
            description: [''],
            itemcode: [''],
            billtype: [''],
            physicianFullName: [''],
            itemid: [''],
            patientpayorid: [''],
            payorid: [''],
            fieldservicerepid: [''],
        });

        this.route.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
            this.workOrderId = paramMap.get('id');
            if (this.workOrderId) {
                this.store.dispatch(
                    PatientInquiryChangesActions.LoadInquiryChangesId({ arHistoryId: this.workOrderId })
                );
                this.InquiryChangesForm.get('id').setValue(this.workOrderId);
                this.patchForm();
            }
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
        this.claimType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.claimTypedropdown = res;
        });
        this.pwkType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.pwkTypeDropdown = res;
        });
        this.pwkMethod$.pipe(untilDestroyed(this)).subscribe(res => {
            this.pwkMethodDropdown = res;
        });
        this.placeOfServiceReps$.pipe(untilDestroyed(this)).subscribe(res => {
            this.placeOfServiceDropdown = res;
        });

        //   SalesRep Dropdown
    }

    patchForm() {
        this.workRepDetails$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data != null) {
                this.workReps = data[0];
                // const payorIds = data[0].patientpayorid;
                const payorIds = [data[0].payorid];
                this.store.dispatch(PatientCenterPhysiciansActions.LoadPatientPhysicians({ id: data[0].patientid }));
                this.store.dispatch(
                    PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscode({ id: data[0].patientid })
                );
                this.store.dispatch(WorkOrderCenterIndividualActions.LoadPayorDetails({ id: payorIds }));

                this.diagnosisCodeList$.pipe(untilDestroyed(this)).subscribe(code => {
                    if (code) {
                        code.forEach(element => {
                            if (element.id == this.workReps['patienticdid1']) {
                                // this.InquiryChangesForm.get(icdField)?.setValue(element.icd10code);
                                this.InquiryChangesForm.get('icd10code')?.setValue(element.icd10code);
                            }
                        });
                    }
                });
                if (this.workReps['referid'] !== 0 && this.workReps['referid']) {
                    this.store.dispatch(PatientCenterDeatilsActions.LoadPatientReferrals());
                    this.store.dispatch(PatientDemographicsActions.getReferCode({ id: this.workReps['referid'] }));

                    this.referCode$
                        .pipe(
                            untilDestroyed(this),
                            filter(referCode => referCode !== null && referCode !== undefined && referCode !== '')
                        )
                        .subscribe(referCode => {
                            this.store
                                .select(
                                    PatientCenterDetailsSelectors.selectReferralById(
                                        (referCode as unknown as { desciption: string }).desciption
                                    )
                                )
                                .pipe(untilDestroyed(this))
                                .subscribe(refereralRecord => {
                                    if (refereralRecord) {
                                        this.referralData.company = refereralRecord['company'] || '';
                                        this.referralData.firstName = refereralRecord['firstName'] || '';
                                        this.referralData.lastName = refereralRecord['lastName'] || '';

                                        const displayText = this.referralData.company
                                            ? `${this.workReps['referid']} - ${this.referralData.company}`
                                            : `${this.workReps['referid']} - ${this.referralData.firstName} ${this.referralData.lastName}`;
                                        this.InquiryChangesForm.get('referCode').setValue(displayText);
                                    }
                                });
                        });
                } else {
                    this.InquiryChangesForm.get('referCode').setValue('');
                }

                this.selectedPhysician$.pipe(untilDestroyed(this)).subscribe(physican => {
                    if (physican) {
                        physican.forEach(element => {
                            if (element.id == this.workReps.patientdoctorid1) {
                                const displayText = element.doctorId
                                    ? `${element.doctorId} - ${element.firstName} ${element.lastName}`
                                    : `${element.firstName} ${element.lastName}`;
                                this.InquiryChangesForm.get('physician').setValue(displayText);
                                this.InquiryChangesForm.get('patientdoctorid1').setValue(element.id);
                            }
                        });
                    }
                });

                this.selectedPayors$.pipe(untilDestroyed(this)).subscribe(payors => {
                    if (payors && payors != null) {
                        if (payors.id === this.InquiryChangesForm.get('payorid').value) {
                            const displayText = payors.billto ? `${payors.id} - ${payors.billto}` : `${payors.billto} `;
                            this.InquiryChangesForm.get('payorName').setValue(displayText);
                            this.InquiryChangesForm.get('payorid').setValue(payors.id);
                        }
                    }
                });

                const workRepsDetails: Record<string, any> = {
                    ...this.workReps,
                };
                workRepsDetails.branchid = this.workReps.branchid.toString();
                const defaultDate = '1900-01-01T00:00:00';
                const dateFields = ['servicedate', 'todate', 'svcdate'];
                dateFields.forEach(field => {
                    if (workRepsDetails[field] === defaultDate) {
                        workRepsDetails[field] = '';
                    }
                });
                this.InquiryChangesForm.patchValue(workRepsDetails);
                combineLatest([
                    this.branch$,
                    this.InquiryChangesForm.get('branchid').valueChanges.pipe(
                        startWith(this.InquiryChangesForm.get('branchid').value)
                    ),
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

    get selectedBillType() {
        return this.billTypeDropDown.find(res => res.billType === this.InquiryChangesForm.get('billtype')?.value)
            ?.billType;
    }
    get selectedPrintStatus() {
        return this.PrintStatusDropDown.find(res => res.code === this.InquiryChangesForm.get('printstatus')?.value)
            ?.code;
    }

    get selectedTranType() {
        return this.tranTypeDropdown.find(res => res.code === this.InquiryChangesForm.get('trantype')?.value)?.code;
    }

    get selectedPrimaryBillForm() {
        return this.primaryBillFormdropdown.find(res => res.value === this.InquiryChangesForm.get('billform')?.value)
            ?.name;
    }
    get selectedClaimType() {
        return this.claimTypedropdown?.find(res => res.code === this.InquiryChangesForm.get('claimtype')?.value)?.code;
    }
    get selectedPwkType() {
        return this.pwkTypeDropdown.find(res => res.code === this.InquiryChangesForm.get('pwktypecode')?.value)?.code;
    }
    get selectedPwkMethod() {
        return this.pwkMethodDropdown.find(
            res => res.code === this.InquiryChangesForm.get('pwktransmissioncode')?.value
        )?.code;
    }
    get selectedPlaceOfService() {
        return this.placeOfServiceDropdown.find(res => res.code === this.InquiryChangesForm.get('pos')?.value)?.code;
    }
    // get selectedSalesRep() {
    //     const salesId = this.InquiryChangesForm.get('salesid')?.value;
    //     return this.salesrep$.pipe(map(salesReps => salesReps.find(rep => rep.value === salesId)?.name ?? ''));
    // }

    openDiagnosisCodePopup() {
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
                    // Update both the ID and the display code
                    this.InquiryChangesForm.get('patienticdid1').setValue(result.id);
                    this.InquiryChangesForm.get('icd10code').setValue(result.icd10code);
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
            dynamicComponentData: this.InquiryChangesForm.get('patientid').value,
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
                    const displayText = result.doctorId
                        ? `${result.doctorId} - ${result.firstName} ${result.lastName}`
                        : `${result.firstName} ${result.lastName}`;
                    this.InquiryChangesForm.get('physician').setValue(displayText);
                    this.InquiryChangesForm.get('patientdoctorid1').setValue(result.id);
                }
            });
    }

    openPayorsList() {
        const selectedPayorId = this.InquiryChangesForm.get('patientpayorid').value;
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Assigned Payors',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAssignedPayorsListComponent,
            dynamicComponentData: {
                patientId: this.InquiryChangesForm.get('patientid').value,
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
                    const displayText = result.billTo ? `${result.payorId} - ${result.billTo}` : `${result.billTo} `;
                    this.InquiryChangesForm.get('payorName').setValue(displayText);
                    this.InquiryChangesForm.get('patientpayorid').setValue(result.id);
                    this.InquiryChangesForm.get('payorid').setValue(result.payorId);
                }
            });
    }

    openReferralList() {
        // const dialogRef = this.matDialog.open(AuxReferralFromComponent,{
        //     data: null,
        //     width: '70%'
        // });
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Referral From',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: AuxReferralFromComponent, // Component you want to load dynamically
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
                    // Update the cached referral data
                    this.referralData.company = result.company || '';
                    this.referralData.firstName = result.firstName || '';
                    this.referralData.lastName = result.lastName || '';

                    const displayText = this.referralData.company
                        ? `${result.id} - ${this.referralData.company}`
                        : `${result.id} - ${this.referralData.firstName} ${this.referralData.lastName}`;
                    this.InquiryChangesForm.get('referCode').setValue(displayText);
                    this.InquiryChangesForm.get('referid').setValue(result.id);
                    this.InquiryChangesForm.get('salesid').setValue(result.salesId);
                    this.InquiryChangesForm.get('fieldservicerepid').setValue(result.salesId);
                    this.save();
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
                itemCode: this.InquiryChangesForm.get('itemcode').value,
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
                this.InquiryChangesForm.get('itemcode').setValue(result.itemcode);
                this.InquiryChangesForm.get('description').setValue(result.description);
                this.InquiryChangesForm.get('itemid').setValue(result.id);
            }
        });
    }

    onDateChange(event, formControlName) {
        this.InquiryChangesForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.InquiryChangesForm,
            formControlName
        );
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.InquiryChangesForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
