import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import icNotification from '@iconify/icons-ic/twotone-add-alert';
import icCancel from '@iconify/icons-ic/twotone-cancel';
import icSave from '@iconify/icons-ic/twotone-save';
import { Store } from '@ngrx/store';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { Notification } from 'app/shared/interfaces/user/vault-api.interface';
import * as fromFileActions from '../actions/file.actions';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatSelect, MatOption } from '@angular/material/select';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ac-edit-notification',
    templateUrl: './edit-notification.component.html',
    styleUrls: ['./edit-notification.component.scss'],
    imports: [
        IconModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        NgClass,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        MatDatepicker,
        MatError,
        MatSelect,
        MatOption,
        CdkTextareaAutosize,
        MatButton,
    ],
})
export class EditNotificationComponent implements OnInit {
    icNotification = icNotification;
    icSave = icSave;
    icCancel = icCancel;
    dateFormat = constVariables.DATE_FORMAT;

    form: UntypedFormGroup = this.fb.group({
        fileId: [null, Validators.required],
        title: [null, Validators.required],
        deliveryMethod: ['Email', Validators.required],
        message: [null, Validators.required],
        when: [null, Validators.required],
        isCompleted: [null, Validators.required],
    });

    constructor(
        private fb: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Notification,
        private store: Store,
        private ref: MatDialogRef<EditNotificationComponent>,
        private auxUtilService: AuxUtilService
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.form.patchValue(this.data);
        }
    }

    saveData() {
        let saveNotifactionData = this.form.value;

        // Transform inputs to uppercase
        saveNotifactionData = this.auxUtilService.transFormValuesToUpperCase(saveNotifactionData, ['title', 'message']);

        this.store.dispatch(fromFileActions.addNotification({ notification: saveNotifactionData }));
        this.ref.close();
    }

    deleteNotification() {
        this.store.dispatch(fromFileActions.rmNotification({ notification: this.form.value }));
        this.ref.close();
    }

    close() {
        this.ref.close();
    }

    onDateChange(event, formControlName) {
        this.form = this.auxUtilService.manuallyCheckDateValid(event.target.value, this.form, formControlName);
    }
}
