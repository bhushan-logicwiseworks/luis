import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { PatientArHistoryActions } from 'app/modules/auxilium/patient-center/actions/patient-ar-history.action';
import {
    PatientArHistorySelectors,
    PatientCenterDetailsSelectors,
    PatientInquiryChangesSelectors,
} from 'app/modules/auxilium/patient-center/reducers';
import { WorkOrderCenterIndividualActions } from 'app/modules/auxilium/work-order-center/actions/work-order-center-individual.actions';
import { InventoryItemsListComponent } from 'app/modules/auxilium/work-order-center/components/inventory-items-list/inventory-items-list.component';
import { WorkOrderCenterIndividualSelectors } from 'app/modules/auxilium/work-order-center/reducers';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { combineLatest, map, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxSearchService } from '../../../../../../../shared/aux-service/aux-search.service';
import {
    AuxPopupComponent,
    PopupData,
} from '../../../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { TranFormInputValues } from '../../../../../../../shared/components/auxilium/work-order-details.enum';
import { PatientArHistoryById } from '../../../../../../../shared/interfaces/auxilium/patient-center/patient-ar-history-by-id.interface';
import { GetPatientPlaceOfServiceResponse } from '../../../../../../../shared/interfaces/auxilium/patient-center/patient-place-service.interface';
import { PayorCenterDeatilsActions } from '../../../../../payor-center/actions/payor-details.action';
import { PayorCenterDetailSelectors } from '../../../../../payor-center/reducers';
import { PatientCenterDeatilsActions } from '../../../../actions/patient-details.action';
import { PatientInquiryChangesActions } from '../../../../actions/patient-inquiry-changes.action';
import { PatientAssignedPayorsListComponent } from '../../../patient-payors/patient-assigned-payors-list/patient-assigned-payors-list.component';
import { AmtAdjustedCodeListComponent } from '../../AmtAdjusted-Code-list/AmtAdjusted-Code-list';

@UntilDestroy()
@Component({
    selector: 'app-patient-ar-history-edit',
    templateUrl: './patient-ar-history-edit.component.html',
    styleUrls: ['./patient-ar-history-edit.component.scss'],
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
        MatAutocompleteTrigger,
        MatAutocomplete,
        NgFor,
        MatSelectTrigger,
        MatCheckbox,
        AsyncPipe,
    ],
})
export class PatientArHistoryEditComponent {
    toolbarData: FuseNavigationItem[];
    arHistoryId = null;
    arHistoryDisp: PatientArHistoryById;
    dateFormat: string = constVariables.DATE_FORMAT;
    arHistoryForm: UntypedFormGroup;
    arHistoryById$ = this.store.select(PatientArHistorySelectors.selectArHistoryById);
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
        this.store.dispatch(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDown());
        this.store.dispatch(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDown());
        this.store.dispatch(PatientArHistoryActions.BillTypeDropdown());
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
        this.arHistoryForm = this.formBuilder.group({
            id: [0],
            patientid: [''],
            patientpayorid: [''],
            payorid: [],
            payorName: [''],
            svcdate: [''],
            billform: [''],
            itemid: [''],
            itemcode: [''],
            branchid: [''],
            hcpcscode: [''],
            epsdt: [''],
            billtype: [''],
            trantype: [''],
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
            collectionstatus: [''],
            datebilled1: [''],
            datebilled2: [''],
            datebilled3: [''], // Add this line
        });

        // Handle route params and load data
        this.route.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
            this.arHistoryId = paramMap.get('id');
            if (this.arHistoryId) {
                this.store.dispatch(PatientArHistoryActions.LoadHistoryById({ arHistoryId: this.arHistoryId }));
                this.arHistoryForm.get('id').setValue(this.arHistoryId);
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
        this.AmtAdjustedCodeDropdown$.pipe(untilDestroyed(this)).subscribe(res => {
            this.AmtAdjustedCodeDropdown = res;
        });
        this.primaryBillForm$.pipe(untilDestroyed(this)).subscribe(res => {
            this.primaryBillFormdropdown = res;
        });
        this.placeOfServiceReps$.pipe(untilDestroyed(this)).subscribe(res => {
            this.placeOfServiceDropdown = res;
        });
    }

    save() {
        let arHistory = this.arHistoryForm.value;

        // Transform inputs to uppercase
        arHistory = this.auxUtilService.transFormValues(arHistory, TranFormInputValues);

        // Transform inputs to uppercase
        arHistory = this.auxUtilService.transFormValuesToUpperCase(arHistory, [
            'description',
            'icn',
            'msg1',
            'msg2',
            'msg3',
            'msg4',
            'msg5',
            'batchno',
            'checkno',
        ]);

        if (arHistory.itemCode === '') {
            arHistory.itemid = 0;
        }

        arHistory = this.auxUtilService.transformBankStringToDefaultDate(arHistory, [
            'svcdate',
            'checkdate',
            'postdate',
            'datebilled1',
            'datebilled2',
            'datebilled3',
        ]);

        arHistory = this.auxUtilService.formatDateFields(arHistory, [
            'svcdate',
            'checkdate',
            'postdate',
            'datebilled1',
            'datebilled2',
            'datebilled3',
        ]);

        arHistory = this.auxUtilService.cleanData(arHistory);

        this.store.dispatch(PatientArHistoryActions.saveArHistory({ arHistory }));
    }

    get selectedBillType() {
        return this.billTypeDropDown.find(res => res.billType === this.arHistoryForm.get('billtype')?.value)?.billType;
    }
    get selectedTranType() {
        return this.tranTypeDropdown.find(res => res.code === this.arHistoryForm.get('trantype')?.value)?.code;
    }
    get selectedPrintStatus() {
        return this.PrintStatusDropDown.find(res => res.code === this.arHistoryForm.get('printstatus')?.value)?.code;
    }
    get selectedAmtAdjustedCode() {
        return this.AmtAdjustedCodeDropdown.find(res => res.code === this.arHistoryForm.get('adjustmentcode1')?.value)
            ?.code;
    }
    get selectedPlaceOfService() {
        return this.placeOfServiceDropdown.find(res => res.code === this.arHistoryForm.get('pos')?.value)?.code;
    }
    get selectedPrimaryBillForm() {
        return this.primaryBillFormdropdown.find(res => res.value === this.arHistoryForm.get('billform')?.value)?.name;
    }
    patchForm() {
        this.arHistoryById$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data != null) {
                this.arHistoryDisp = data[0];
                const payorIds = [data[0].payorid];
                this.store.dispatch(WorkOrderCenterIndividualActions.LoadPayorDetails({ id: payorIds }));
                if (this.arHistoryDisp.itemid !== 0) {
                    this.itemCode$.pipe(untilDestroyed(this)).subscribe(itemcode => {
                        this.arHistoryForm.get('itemcode').setValue(itemcode['desciption']);
                    });
                    const itemId = this.arHistoryDisp.itemid;
                    this.store.dispatch(WorkOrderCenterIndividualActions.getItemCode({ id: itemId }));
                } else {
                    this.arHistoryForm.get('itemcode').setValue('');
                }

                this.selectedPayors$.pipe(untilDestroyed(this)).subscribe(payors => {
                    if (payors && payors != null) {
                        if (payors.id === this.arHistoryForm.get('payorid').value) {
                            const displayText = payors.billto ? `${payors.id} - ${payors.billto}` : `${payors.billto} `;
                            this.arHistoryForm.get('payorName').setValue(displayText);
                            this.arHistoryForm.get('payorid').setValue(payors.id);
                        }
                    }
                });
                const arHistoryDetails: Record<string, any> = {
                    ...this.arHistoryDisp,
                };
                arHistoryDetails.branchid = this.arHistoryDisp.branchid.toString();

                const defaultDate = '1900-01-01T00:00:00';
                const dateFields = ['checkdate', 'postdate', 'datebilled1', 'datebilled2', 'datebilled3', 'svcdate'];
                dateFields.forEach(field => {
                    if (arHistoryDetails[field] === defaultDate) {
                        arHistoryDetails[field] = '';
                    }
                });
                // arHistoryDetails.description = this.arHistoryDisp.description + '' + this.arHistoryDisp.description2;
                this.arHistoryForm.patchValue(arHistoryDetails);

                // Handle branch selection
                combineLatest([
                    this.branch$,
                    this.arHistoryForm
                        .get('branchid')
                        .valueChanges.pipe(startWith(this.arHistoryForm.get('branchid').value)),
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
                itemCode: this.arHistoryForm.get('itemcode').value,
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
                this.arHistoryForm.get('itemcode').setValue(result.itemcode);
                this.arHistoryForm.get('description').setValue(result.description);
                this.arHistoryForm.get('itemid').setValue(result.id);
            }
        });
    }

    onDateChange(event, formControlName) {
        this.arHistoryForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.arHistoryForm,
            formControlName
        );
    }

    openPayorList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Assigned Payors',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientAssignedPayorsListComponent,
            dynamicComponentData: this.arHistoryForm.get('patientid').value,
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
                    this.arHistoryForm.get('payorName').setValue(displayText);
                    this.arHistoryForm.get('patientpayorid').setValue(result.id);
                    this.arHistoryForm.get('payorid').setValue(result.payorId);
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
                amtadjustedCode: this.arHistoryForm.get(fieldName).value, // <-- pass as amtadjustedCode
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
                this.arHistoryForm.get(fieldName).setValue(result.code);
            }
        });
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    onBranchSelected(event: any): void {
        const selectedBranch = event;
        this.arHistoryForm.get('branchid').setValue(selectedBranch.id, { emitEvent: false });
        this.branchName.setValue(selectedBranch.branchcode);
    }
}
