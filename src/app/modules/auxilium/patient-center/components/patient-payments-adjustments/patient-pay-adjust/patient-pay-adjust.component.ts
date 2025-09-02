import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseHorizontalNavigationComponent, FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { combineLatest, map, startWith } from 'rxjs';
import { constVariables } from '../../../../../../common/constants/constVariables';
import { AuxSearchService } from '../../../../../../shared/aux-service/aux-search.service';
import { AuxUtilService } from '../../../../../../shared/aux-service/aux-utils.service';
import {
    AuxPopupComponent,
    PopupData,
} from '../../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { TranFormInputValues } from '../../../../../../shared/components/auxilium/work-order-details.enum';
import { PatientPaymentsAdjustmentsById } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-payments-adjustments-by-id.interface';
import { GetPatientPlaceOfServiceResponse } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-place-service.interface';
import { PayorCenterDeatilsActions } from '../../../../payor-center/actions/payor-details.action';
import { PayorCenterDetailSelectors } from '../../../../payor-center/reducers';
import { WorkOrderCenterIndividualActions } from '../../../../work-order-center/actions/work-order-center-individual.actions';
import { InventoryItemsListComponent } from '../../../../work-order-center/components/inventory-items-list/inventory-items-list.component';
import { WorkOrderCenterIndividualSelectors } from '../../../../work-order-center/reducers';
import { PatientArHistoryActions } from '../../../actions/patient-ar-history.action';
import { PatientCenterDeatilsActions } from '../../../actions/patient-details.action';
import { PatientInquiryChangesActions } from '../../../actions/patient-inquiry-changes.action';
import { PatientPaymentAdjustmentsActions } from '../../../actions/patient-payments-adjustments.action';
import {
    PatientArHistorySelectors,
    PatientCenterDetailsSelectors,
    PatientInquiryChangesSelectors,
    PatientPaymentAdjustmentsSelectors,
} from '../../../reducers';
import { AmtAdjustedCodeListComponent } from '../../patient-ar-history/AmtAdjusted-Code-list/AmtAdjusted-Code-list';
import { PatientPayorsListComponent } from '../../patient-payors/patient-payors-list/patient-payors-list.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-pay-adjust',
    templateUrl: './patient-pay-adjust.component.html',
    styleUrls: ['./patient-pay-adjust.component.scss'],
    imports: [
        MatIcon,
        MatPrefix,
        FuseHorizontalNavigationComponent,
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
        MatSelectTrigger,
        MatCheckbox,
        AsyncPipe,
    ],
})
export class PatientPayAdjustComponent {
    toolbarData: FuseNavigationItem[];
    PaymentAdjustmentId = null;
    PaymentAdjustmentDisp: PatientPaymentsAdjustmentsById;
    dateFormat: string = constVariables.DATE_FORMAT;
    PaymentAdjustmentForm: UntypedFormGroup;
    PaymentAdjustmentDetails$ = this.store.select(PatientPaymentAdjustmentsSelectors.selectPaymentAdjustmentById);
    itemCode$ = this.store.select(WorkOrderCenterIndividualSelectors.selectItemCode);
    branchName = new FormControl();
    branch$ = this.store.select(PatientArHistorySelectors.selectBranch);
    selectedPayors$ = this.store.select(WorkOrderCenterIndividualSelectors.selectPayorsDetail);
    placeOfServiceReps$ = this.store.select(PatientCenterDetailsSelectors.selectPlaceOfService);
    placeOfServiceDropdown: GetPatientPlaceOfServiceResponse = [];
    billType$ = this.store.select(PatientArHistorySelectors.selectArBillType);
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

    AmtAdjustedCodeDropdown;
    AmtAdjustedCodeDropdown$ = this.store.select(PatientArHistorySelectors.selectAmtAdjustedCode).pipe(
        map(data =>
            data.map(result => ({
                // name: result.code,
                code: result.code,
                // description: result.description || result.code,
            }))
        )
    );
    // Add this property
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

    paymentTypeDropDown;
    paymentTypeDropDown$ = this.store.select(PatientPaymentAdjustmentsSelectors.selectPaymentTypeDropdown).pipe(
        map(data =>
            data.map(result => ({
                // name: result.code,
                code: result.code,
                description: result.description || result.code,
            }))
        )
    );

    // Add this property
    toPatientDefault$ = this.store.select(PatientPaymentAdjustmentsSelectors.selectToPatientDefault);
    insuranceRank2$ = this.store.select(PatientPaymentAdjustmentsSelectors.selectInsuranceRank2);

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private formBuilder: UntypedFormBuilder,
        private auxUtilService: AuxUtilService,
        private router: Router,
        private matDialog: MatDialog,
        private searchService: AuxSearchService
    ) {
        let id = Number(this.router.url.split('/')[3]);
        this.store.dispatch(WorkOrderCenterIndividualActions.BillTypeDropdown());
        this.store.dispatch(PatientInquiryChangesActions.TranTypeDropdown());
        this.store.dispatch(PatientArHistoryActions.AmtAdjustedCodeDropdown());
        this.store.dispatch(PatientInquiryChangesActions.PrintStatusDropDown());
        this.store.dispatch(PatientPaymentAdjustmentsActions.PaymentTypeDropdown());
        this.store.dispatch(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDown());
        this.store.dispatch(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDown());
        this.store.dispatch(PatientArHistoryActions.BillTypeDropdown());
        this.store.dispatch(PatientPaymentAdjustmentsActions.LoadToPatientDefault());
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

    ngOnInit() {
        this.PaymentAdjustmentForm = this.formBuilder.group({
            id: [0],
            patientid: [''],
            patientpayorid: [''],
            svcdate: [''],
            editedBy: [''],
            deduct: [''],
            provpd: [''],
            billto: [''],
            billform: [''],
            itemid: [''],
            itemcode: [''],
            branchid: [''],
            hcpcscode: [''],
            epsdt: [''],
            billtype: [''],
            trantype: [''],
            paymenttype: [''],
            printstatus: [''],
            description: [''],
            pos: [''],
            batchno: [''],
            checkno: [''],
            checkdate: [''],
            postingdate: [''],
            postdate: [''],
            isincollections: [false],
            icn: [''],
            msg1: [''],
            msg2: [''],
            msg3: [''],
            msg4: [''],
            msg5: [''],
            submitted: [''],
            quantity: [''],
            allowed: [''],
            tranamount: [''],
            amountpaid: [''],
            amountadjusted1: [''],
            amountadjusted2: [''],
            amountadjusted3: [''],
            amountadjusted4: [''],
            amountadjusted5: [''],
            amountadjusted6: [''],
            adjustmentcode1: [''],
            adjustmentcode2: [''],
            adjustmentcode3: [''],
            adjustmentcode4: [''],
            adjustmentcode5: [''],
            adjustmentcode6: [''],
            balance: [''],
            adduserid: [''],
            collectionstatus: [''],
            datebilled1: [''],
            datebilled2: [''],
            datebilled3: [''],
            payorid: [''],
            toPatient: [''], // Add this field
            toOther: [''], // Add this field
            toPatientChecked: [false],
            toOtherChecked: [false],
            retainSamePayorChecked: [false],
        });

        // Set default dates for Post Date and Check Date
        const today = new Date();
        if (!this.PaymentAdjustmentId) {
            this.PaymentAdjustmentForm.patchValue({
                postdate: today,
                checkdate: today,
            });
        }

        // Handle route params and load data
        this.route.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
            this.PaymentAdjustmentId = paramMap.get('id');
            if (this.PaymentAdjustmentId) {
                this.store.dispatch(
                    PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsId({
                        PaymentAdjustmentId: this.PaymentAdjustmentId,
                    })
                );
                this.PaymentAdjustmentForm.get('id').setValue(this.PaymentAdjustmentId);
                this.patchForm();
            }
        });

        this.billType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.billTypeDropDown = res;
        });
        this.tranType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.tranTypeDropdown = res;
        });
        this.PrintStatusDropDown$.pipe(untilDestroyed(this)).subscribe(res => {
            this.PrintStatusDropDown = res;
        });
        this.paymentTypeDropDown$.pipe(untilDestroyed(this)).subscribe(res => {
            this.paymentTypeDropDown = res;
        });
        this.AmtAdjustedCodeDropdown$.pipe(untilDestroyed(this)).subscribe(res => {
            this.AmtAdjustedCodeDropdown = res;
        });
        this.primaryBillForm$.pipe(untilDestroyed(this)).subscribe(res => {
            this.primaryBillFormdropdown = res;
        });
        this.placeOfServiceReps$.pipe(untilDestroyed(this)).subscribe(res => {
            this.placeOfServiceDropdown = res;
        });

        // Add subscription for toPatientDefault
        this.toPatientDefault$.pipe(untilDestroyed(this)).subscribe(defaultValue => {
            console.log('toPatientDefault$ emitted:', defaultValue);
            if (defaultValue?.length > 0) {
                console.log('Patching form with:', defaultValue[0].name);
                this.PaymentAdjustmentForm.patchValue({
                    toPatient: defaultValue[0].name,
                });
            }
        });

        // Ensure patientId is being dispatched
        this.PaymentAdjustmentForm.get('patientid')
            .valueChanges.pipe(untilDestroyed(this))
            .subscribe(patientId => {
                if (patientId) {
                    this.store.dispatch(PatientPaymentAdjustmentsActions.LoadInsuranceRank2({ patientId }));
                }
            });
    }

    onCheckboxChange(checkboxName: string) {
        // Uncheck all checkboxes first
        this.PaymentAdjustmentForm.patchValue({
            toPatientChecked: false,
            toOtherChecked: false,
            retainSamePayorChecked: false,
        });

        // Check only the clicked checkbox
        this.PaymentAdjustmentForm.get(checkboxName).setValue(true);
    }

    save() {
        let payAdjust = this.PaymentAdjustmentForm.value;

        // Transform inputs to uppercase
        payAdjust = this.auxUtilService.transFormValues(payAdjust, TranFormInputValues);

        // Transform inputs to uppercase
        payAdjust = this.auxUtilService.transFormValuesToUpperCase(payAdjust, [
            'billto',
            'description',
            'icn',
            'msg1',
            'msg2',
            'msg3',
            'msg4',
            'msg5',
            'batchno',
            'checkno',
            'adduserid',
        ]);

        if (payAdjust.itemCode === '') {
            payAdjust.itemid = 0;
        }

        payAdjust = this.auxUtilService.transformBankStringToDefaultDate(payAdjust, [
            'svcdate',
            'checkdate',
            'postdate',
            'datebilled1',
            'datebilled2',
            'datebilled3',
        ]);

        payAdjust = this.auxUtilService.formatDateFields(payAdjust, [
            'svcdate',
            'checkdate',
            'postdate',
            'datebilled1',
            'datebilled2',
            'datebilled3',
        ]);

        payAdjust = this.auxUtilService.cleanData(payAdjust);

        this.store.dispatch(PatientPaymentAdjustmentsActions.AddPaymentAdjustment({ paymentAdjustment: payAdjust }));
    }

    get selectedBillType() {
        return this.billTypeDropDown.find(res => res.billType === this.PaymentAdjustmentForm.get('billtype')?.value)
            ?.billType;
    }
    get selectedTranType() {
        return this.tranTypeDropdown.find(res => res.code === this.PaymentAdjustmentForm.get('trantype')?.value)?.code;
    }
    get selectedPrintStatus() {
        return this.PrintStatusDropDown.find(res => res.code === this.PaymentAdjustmentForm.get('printstatus')?.value)
            ?.code;
    }
    get selectedPaymentType() {
        return this.paymentTypeDropDown.find(res => res.code === this.PaymentAdjustmentForm.get('paymenttype')?.value)
            ?.code;
    }
    get selectedAmtAdjustedCode() {
        return this.AmtAdjustedCodeDropdown.find(
            res => res.code === this.PaymentAdjustmentForm.get('adjustmentcode1')?.value
        )?.code;
    }
    get selectedPlaceOfService() {
        return this.placeOfServiceDropdown.find(res => res.code === this.PaymentAdjustmentForm.get('pos')?.value)?.code;
    }
    get selectedPrimaryBillForm() {
        return this.primaryBillFormdropdown.find(res => res.value === this.PaymentAdjustmentForm.get('billform')?.value)
            ?.name;
    }
    patchForm() {
        this.PaymentAdjustmentDetails$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data != null) {
                this.PaymentAdjustmentDisp = data[0];

                // Add insurance rank2 subscription here
                this.insuranceRank2$.pipe(untilDestroyed(this)).subscribe({
                    next: rank2 => {
                        if (rank2 && typeof rank2 === 'string' && rank2.trim() !== '') {
                            this.PaymentAdjustmentForm.patchValue({
                                toOther: rank2,
                            });
                        }
                    },
                    error: error => console.error('insuranceRank2$ error:', error),
                });

                if (this.PaymentAdjustmentDisp.itemid !== 0) {
                    this.itemCode$.pipe(untilDestroyed(this)).subscribe(itemcode => {
                        this.PaymentAdjustmentForm.get('itemcode').setValue(itemcode['desciption']);
                    });
                    const itemId = this.PaymentAdjustmentDisp.itemid;
                    this.store.dispatch(WorkOrderCenterIndividualActions.getItemCode({ id: itemId }));
                } else {
                    this.PaymentAdjustmentForm.get('itemcode').setValue('');
                }

                // this.selectedPayors$.pipe(untilDestroyed(this)).subscribe(payors => {
                //     if (payors && payors != null) {
                //         if (payors.id === this.PaymentAdjustmentForm.get('payorid1').value) {
                //             this.PaymentAdjustmentForm.get('PrimaryPayorsName').setValue(payors.billto);
                //             this.PaymentAdjustmentForm.get('payorid1').setValue(payors.id);
                //         }
                //         if (payors.id === this.PaymentAdjustmentForm.get('payorid2').value) {
                //             this.PaymentAdjustmentForm.get('coPayorsName').setValue(payors.billto);
                //             this.PaymentAdjustmentForm.get('payorid2').setValue(payors.id);
                //         }
                //     }
                // });

                const arHistoryDetails: Record<string, any> = {
                    ...this.PaymentAdjustmentDisp,
                };
                arHistoryDetails.branchid = this.PaymentAdjustmentDisp.branchid.toString();
                const defaultDate = '1900-01-01T00:00:00';
                const dateFields = ['checkdate', 'postdate', 'datebilled1', 'datebilled2', 'datebilled3', 'svcdate'];

                // Set today's date for empty checkdate and postdate
                const today = new Date();
                dateFields.forEach(field => {
                    if (arHistoryDetails[field] === defaultDate || !arHistoryDetails[field]) {
                        if (field === 'checkdate' || field === 'postdate') {
                            arHistoryDetails[field] = today;
                        } else {
                            arHistoryDetails[field] = '';
                        }
                    }
                });
                // arHistoryDetails.description = this.PaymentAdjustmentDisp.description + '' + this.PaymentAdjustmentDisp.description2;
                this.PaymentAdjustmentForm.patchValue(arHistoryDetails);

                // Handle branch selection
                combineLatest([
                    this.branch$,
                    this.PaymentAdjustmentForm.get('branchid').valueChanges.pipe(
                        startWith(this.PaymentAdjustmentForm.get('branchid').value)
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
                itemCode: this.PaymentAdjustmentForm.get('itemcode').value,
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
                this.PaymentAdjustmentForm.get('itemcode').setValue(result.itemcode);
                this.PaymentAdjustmentForm.get('description').setValue(result.description);
                this.PaymentAdjustmentForm.get('itemid').setValue(result.id);
            }
        });
    }

    onDateChange(event, formControlName) {
        this.PaymentAdjustmentForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.PaymentAdjustmentForm,
            formControlName
        );
    }

    openPayorList(field: 'toPatient' | 'toOther') {
        // Get the corresponding checkbox control name
        const checkboxName = field === 'toPatient' ? 'toPatientChecked' : 'toOtherChecked';

        // Check if the corresponding checkbox is selected
        if (!this.PaymentAdjustmentForm.get(checkboxName).value) {
            // If checkbox is not selected, show dialog and return
            return;
        }

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
                    // Only update form if the checkbox is still selected
                    if (this.PaymentAdjustmentForm.get(checkboxName).value) {
                        this.PaymentAdjustmentForm.get(field).setValue(result.billto);
                        // this.PaymentAdjustmentForm.get('patientpayorid').setValue(result.id);
                        this.PaymentAdjustmentForm.get('payorid').setValue(result.id);
                    }
                }
            });
    }

    // Add this method for adjustment code selection
    openAdjustmentCodeList(fieldName: string) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Adjustment Code',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: AmtAdjustedCodeListComponent,
            dynamicComponentData: {
                amtadjustedCode: this.PaymentAdjustmentForm.get(fieldName).value, // <-- pass as amtadjustedCode
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
                this.PaymentAdjustmentForm.get(fieldName).setValue(result.code);
            }
        });
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.PaymentAdjustmentForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
