import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { InventoryItemsListComponent } from 'app/modules/auxilium/work-order-center/components/inventory-items-list/inventory-items-list.component';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ShortcutDisplay } from 'app/shared/interfaces/auxilium/shortcut-center/shortcut.interface';
import { filter } from 'rxjs';
import { ShortcutCenterTableActions } from '../../action/shortcut-center-table.action';
import { ShortcutsTableSelectors } from '../../reducer';
import { MatFormField, MatLabel, MatError, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSelect, MatSelectTrigger, MatOption } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-edit-selected-shortcute-component',
    templateUrl: './edit-selected-shortcute-component.component.html',
    styleUrls: ['./edit-selected-shortcute-component.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatIcon,
        MatPrefix,
        MatSelect,
        MatSelectTrigger,
        MatOption,
        AsyncPipe,
    ],
})
export class EditSelectedShortcuteComponentComponent {
    selectedShortcutDetails: ShortcutDisplay;
    editShortcutForm: FormGroup;
    itemCode$ = this.store.select(ShortcutsTableSelectors.selectItemCode);
    billType$ = this.store.select(ShortcutsTableSelectors.selectBillType);
    selectedShortcuts$ = this.store.select(ShortcutsTableSelectors.selectEditShortcuts);
    selectedShortcutItemCodes$ = this.store.select(ShortcutsTableSelectors.selectShortcutItemCodes);
    billTypeDropDown;
    itemCodedata;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private fb: FormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private matDialog: MatDialog,
        public matDialogRef: MatDialogRef<any>
    ) {
        this.selectedShortcutDetails = data.dynamicComponentData as ShortcutDisplay;
        this.store.dispatch(ShortcutCenterTableActions.BillTypeDropdown());
        this.store.dispatch(
            ShortcutCenterTableActions.LoadSelectedShortcutDetails({ id: this.selectedShortcutDetails.id })
        );

        this.editShortcutForm = this.fb.group({
            id: [0],
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],

            itemCode1: ['', [Validators.required]],
            itemId1: [0, [Validators.required]],
            description1: ['', [Validators.required]],
            quantity1: [0, [Validators.required]],
            billType1: ['', [Validators.required]],

            itemCode2: [''],
            itemId2: [0],
            description2: [''],
            quantity2: [0],
            billType2: [''],

            itemCode3: [''],
            itemId3: [0],
            description3: [''],
            quantity3: [0],
            billType3: [''],

            itemCode4: [''],
            itemId4: [0],
            description4: [''],
            quantity4: [0],
            billType4: [''],

            itemCode5: [''],
            itemId5: [0],
            description5: [''],
            quantity5: [0],
            billType5: [''],

            itemCode6: [''],
            itemId6: [0],
            description6: [''],
            quantity6: [0],
            billType6: [''],

            itemCode7: [''],
            itemId7: [0],
            description7: [''],
            quantity7: [0],
            billType7: [''],
        });
    }

    ngOnInit() {
        this.selectedShortcuts$
            .pipe(
                untilDestroyed(this),
                filter(res => res !== null) // Filter out null values
            )
            .subscribe(res => {
                if (res) {
                    this.editShortcutForm.patchValue(res);
                }
            });
        this.billType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.billTypeDropDown = res;
        });
    }

    updateSelectedShortcutsDetails() {
        if (this.editShortcutForm.invalid) {
            return;
        }
        let shortcuts = this.auxUtilService.convertObjToUppercase(this.editShortcutForm.value);
        try {
            this.store.dispatch(ShortcutCenterTableActions.SaveShortcuts({ shortcuts }));
            this.matDialog.closeAll();
        } catch (error) {}
    }

    openItemList(itemId: number) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Select Item Code',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: InventoryItemsListComponent,
            dynamicComponentData: null,
            submitFunction: 'selectRowSubmit',
            enterKeyEnabled: true,
        };
        const modalRef = this.matDialog.open(AuxPopupComponent, {
            width: '100%',
            height: 'auto',
            data: popupData,
        });
        modalRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result) {
                    const control = this.editShortcutForm.get(`itemId${itemId}`);
                    if (control) {
                        // Check if control exists
                        control.setValue(result.id);
                        this.editShortcutForm.get(`itemCode${itemId}`).setValue(result.itemcode);
                        this.editShortcutForm.get(`description${itemId}`).setValue(result.description);
                        this.editShortcutForm.get(`quantity${itemId}`).setValue(result.defaultquantity);
                    }
                }
            });
    }

    handleOnclickClearField(itemId: number) {
        const fieldsToClear = ['itemId', 'itemCode', 'description', 'quantity', 'billType'];
        for (let i = 1; i <= 7; i++) {
            if (itemId === i) {
                fieldsToClear.forEach(field => {
                    const control = this.editShortcutForm.get(`${field}${i}`);
                    if (control) {
                        // Check if control exists
                        if (field == 'itemId') {
                            control.setValue(0);
                        } else if (field == 'quantity') {
                            control.setValue(0);
                        } else {
                            control.setValue('');
                        }
                    }
                });
                break;
            }
        }
    }
}
