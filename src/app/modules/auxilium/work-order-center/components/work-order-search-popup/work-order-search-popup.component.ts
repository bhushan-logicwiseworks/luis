import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { InventoryCenterTableActions } from 'app/modules/auxilium/inventory-center/actions/inventory-center-table.actions';
import { PatientCenterPayorsActions } from 'app/modules/auxilium/patient-center/actions/patient-center-payors.action';
import { PatientPayorsListComponent } from 'app/modules/auxilium/patient-center/components/patient-payors/patient-payors-list/patient-payors-list.component';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { SearchCriteria } from 'app/shared/interfaces/auxilium/work-order-center/search-criteria.interface';
import { InventoryItemsListComponent } from '../inventory-items-list/inventory-items-list.component';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatSuffix, MatError, MatPrefix } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@UntilDestroy()
@Component({
    selector: 'ac-work-order-search-popup',
    templateUrl: './work-order-search-popup.component.html',
    styleUrls: ['./work-order-search-popup.component.scss'],
    imports: [
        ReactiveFormsModule,
        CdkScrollable,
        MatDialogContent,
        MatFormField,
        NgClass,
        MatLabel,
        MatInput,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        MatIcon,
        MatPrefix,
        MatDialogActions,
        MatButton,
    ],
})
export class WorkOrderSearchPopupComponent {
    searchForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<WorkOrderSearchPopupComponent>,
        private matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: { filter: string; title: string },
        private fb: FormBuilder,
        private auxUtilService: AuxUtilService,
        private searchService: AuxSearchService,
        private store: Store
    ) {
        this.searchForm = this.fb.group({
            nextBill: ['', Validators.required],
            itemCode: ['', Validators.required],
            description: ['', Validators.required],
            state: ['', Validators.required],
            payor: ['', Validators.required],
        });
    }

    onDateChange(event, formControlName: string) {
        this.searchForm = this.auxUtilService.manuallyCheckDateValid(
            event.target.value,
            this.searchForm,
            formControlName
        );
    }

    openItemList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Item for Work Order Search',
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
                    this.searchForm.get('itemCode').setValue(result.itemcode);
                    this.searchForm.get('description').setValue(result.description);
                    this.searchForm.markAsDirty();
                }
                this.searchService.saveFilterState({}, 'inventoryItemsList');
            });

        this.store.dispatch(InventoryCenterTableActions.LoadInventory({ filter: 'active' }));
    }

    openPayorList() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Payor for Work Order Search',
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
                    this.searchForm.get('payor').setValue(result.name);
                    this.searchForm.markAsDirty();
                }
            });

        this.store.dispatch(PatientCenterPayorsActions.LoadPatientPayorsList());
    }

    onSubmit(): void {
        const criteria: SearchCriteria = this.searchForm.value;
        const hasValidCriteria = Object.values(criteria).some(value => {
            if (typeof value === 'string') {
                return value.trim() !== '';
            } else if (value instanceof Date) {
                return !isNaN(value.getTime());
            } else {
                return value !== null && value !== undefined;
            }
        });
        // return undefined if no criteria is selected
        const dialogResult = hasValidCriteria ? criteria : undefined;
        if (dialogResult && dialogResult.nextBill) {
            dialogResult.nextBill = (dialogResult.nextBill as unknown as Date).toISOString();
        }
        this.dialogRef.close(dialogResult);
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
