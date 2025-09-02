import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ShortcutsTableSelectors } from 'app/modules/auxilium/shortcut-center/reducer';
import { InventoryItemsListComponent } from 'app/modules/auxilium/work-order-center/components/inventory-items-list/inventory-items-list.component';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ShortcutCenterTableActions } from '../../action/shortcut-center-table.action';
import { MatFormField, MatLabel, MatError, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSelect, MatSelectTrigger, MatOption } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-add-new-shortcute-component',
    templateUrl: './add-new-shortcute-component.component.html',
    styleUrls: ['./add-new-shortcute-component.component.scss'],
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
export class AddNewShortcuteComponentComponent {
    addShortcutForm: FormGroup;
    itemCode$ = this.store.select(ShortcutsTableSelectors.selectItemCode);
    billType$ = this.store.select(ShortcutsTableSelectors.selectBillType);
    billTypeDropDown;

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private matDialog: MatDialog,
        public matDialogRef: MatDialogRef<any>
    ) {
        this.store.dispatch(ShortcutCenterTableActions.BillTypeDropdown());
        this.addShortcutForm = this.fb.group({
            id: [0],
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],

            itemcode1: ['', [Validators.required]],
            itemId1: [0, [Validators.required]],
            description1: ['', [Validators.required]],
            quantity1: [0, [Validators.required]],
            billType1: ['', [Validators.required]],

            itemcode2: [''],
            itemId2: [0],
            description2: [''],
            quantity2: [0],
            billType2: [''],

            itemcode3: [''],
            itemId3: [0],
            description3: [''],
            quantity3: [0],
            billType3: [''],

            itemcode4: [''],
            itemId4: [0],
            description4: [''],
            quantity4: [0],
            billType4: [''],

            itemcode5: [''],
            itemId5: [0],
            description5: [''],
            quantity5: [0],
            billType5: [''],

            itemcode6: [''],
            itemId6: [0],
            description6: [''],
            quantity6: [0],
            billType6: [''],

            itemcode7: [''],
            itemId7: [0],
            description7: [''],
            quantity7: [0],
            billType7: [''],
        });
    }

    ngOnInit() {
        this.billType$.pipe(untilDestroyed(this)).subscribe(res => {
            this.billTypeDropDown = res;
        });
    }

    save() {
        if (this.addShortcutForm.invalid) {
            return;
        }
        try {
            let shortcuts = this.auxUtilService.convertObjToUppercase(this.addShortcutForm.value);
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
        const dialogRef = this.matDialog.open(AuxPopupComponent, {
            data: popupData,
            width: '70%',
            height: 'auto',
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result && itemId >= 1 && itemId <= 7) {
                    const fields = ['itemId', 'itemcode', 'description', 'quantity'];
                    for (let i = 1; i <= 7; i++) {
                        if (itemId === i) {
                            fields.forEach(field => {
                                if (field === 'quantity') {
                                    this.addShortcutForm.get(`${field}${i}`).setValue(parseInt(result.defaultquantity));
                                } else {
                                    this.addShortcutForm
                                        .get(`${field}${i}`)
                                        .setValue(field == 'itemId' ? result.id : result[field]);
                                }
                            });
                            break;
                        }
                    }
                }
            });
    }

    handleOnclickClearField(fieldNumber: number) {
        const fieldsToClear = ['itemId', 'itemcode', 'description', 'quantity', 'billType'];
        for (let i = 1; i <= 7; i++) {
            if (fieldNumber === i) {
                fieldsToClear.forEach(field => {
                    if (field === 'itemId') {
                        this.addShortcutForm.get(`${field}${i}`).setValue(0);
                    } else if (field === 'quantity') {
                        this.addShortcutForm.get(`${field}${i}`).setValue(0);
                    } else {
                        this.addShortcutForm.get(`${field}${i}`).setValue('');
                    }
                });
                break;
            }
        }
    }
}
