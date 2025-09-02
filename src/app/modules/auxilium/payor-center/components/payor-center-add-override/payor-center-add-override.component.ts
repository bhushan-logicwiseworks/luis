import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatError,
    MatFormField,
    MatLabel,
    MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { InventoryCenterTableActions } from 'app/modules/auxilium/inventory-center/actions/inventory-center-table.actions';
import { PatientCenterPayorsActions } from 'app/modules/auxilium/patient-center/actions/patient-center-payors.action';
import { PatientPayorsListComponent } from 'app/modules/auxilium/patient-center/components/patient-payors/patient-payors-list/patient-payors-list.component';
import { InventoryItemsListComponent } from 'app/modules/auxilium/work-order-center/components/inventory-items-list/inventory-items-list.component';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { TransformPayorOverrideInputValues } from 'app/shared/components/auxilium/payor-override-enum';
import { PayorOverride } from 'app/shared/interfaces/auxilium/payor-center/payor-override.interface';
import { PayorCenterTableActions } from '../../actions/payor-center-table.actions';

@UntilDestroy()
@Component({
    selector: 'app-payor-center-add-override',
    templateUrl: './payor-center-add-override.component.html',
    styleUrls: ['./payor-center-add-override.component.scss'],
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
        MatError,
        MatIcon,
        MatPrefix,
        MatSelect,
        NgFor,
        MatOption,
    ],
})
export class PayorCenterAddOverrideComponent {
    payorOverrideForm: FormGroup;
    billTypes = ['P', 'M', 'Q'];
    confirmOptions = ['Y', 'P'];
    payorOverride: PayorOverride | null;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        public matDialogRef: MatDialogRef<any>,
        private matDialog: MatDialog,
        private route: Router,
        private searchService: AuxSearchService,
        @Inject(MAT_DIALOG_DATA) private data: { dynamicComponentData?: { payorOverride: PayorOverride | null } }
    ) {
        this.payorOverride = data?.dynamicComponentData?.payorOverride || null;

        this.payorOverrideForm = this.fb.group({
            payorId: ['', Validators.required],
            billto: ['', Validators.required],
            itemId: ['', Validators.required],
            itemCode: ['', Validators.required],
            description: ['', Validators.required],
            billType: ['', Validators.required],
            confirm: ['', Validators.required],
            quantity: ['', [Validators.required]],
            hcpc: ['', Validators.required],
            submitted: ['', [Validators.required, Validators.min(1)]],
            allowed: ['', [Validators.required, Validators.min(1)]],
            duePrimary: ['', [Validators.required, Validators.min(1)]],
        });

        if (this.payorOverride) {
            this.payorOverrideForm.patchValue({
                ...this.payorOverride,
            });
        }
    }

    ngOnInit(): void {}

    save() {
        if (this.payorOverrideForm.invalid) {
            return;
        }

        let payorOverride = this.payorOverrideForm.value;

        payorOverride = this.auxUtilService.transFormValues(payorOverride, TransformPayorOverrideInputValues);

        payorOverride = this.auxUtilService.transFormValuesToUpperCase(payorOverride, [
            'billto',
            'itemCode',
            'description',
            'billType',
            'confirm',
            'hcpc',
        ]);

        payorOverride = this.auxUtilService.cleanData(payorOverride);

        payorOverride = {
            ...payorOverride,
            id: this.payorOverride?.id || 0,
        };

        this.store.dispatch(PayorCenterTableActions.SavePayorOverride({ payorOverride }));
        this.matDialogRef.close({ success: true });
    }

    openPayorList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Payor for Payor Override',
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
                    this.payorOverrideForm.get('payorId').setValue(result.id);
                    this.payorOverrideForm.get('billto').setValue(result.billto);
                }
            });

        this.store.dispatch(PatientCenterPayorsActions.LoadPatientPayorsList());
    }

    openItemList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Item for Payor Override',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Select Item',
            dynamicComponent: InventoryItemsListComponent,
            dynamicComponentData: null,
            submitFunction: 'selectRowSubmit',
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
                    this.payorOverrideForm.get('itemId').setValue(result.id);
                    this.payorOverrideForm.get('itemCode').setValue(result.itemcode);
                    this.payorOverrideForm.get('description').setValue(result.description);
                }
                this.searchService.saveFilterState({}, 'inventoryItemsList');
            });

        this.store.dispatch(InventoryCenterTableActions.LoadInventory({ filter: 'active' }));
    }
}
