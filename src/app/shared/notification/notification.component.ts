import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@abhinavakhil/iconify-angular';
import icCheck from '@iconify/icons-ic/twotone-check';
import icClose from '@iconify/icons-ic/twotone-close';
import icError from '@iconify/icons-ic/twotone-error';
import icInfo from '@iconify/icons-ic/twotone-info';
import icWarning from '@iconify/icons-ic/twotone-warning';
import { NotificationSettings } from './notification-settings.interface';
import { NotificationType } from './notification-type.enum';

@Component({
    selector: 'ac-notification',
    templateUrl: './notification.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        IconModule
    ],
})
export class NotificationComponent implements OnInit {
    type = NotificationType;

    icCheck = icCheck;
    icWarning = icWarning;
    icError = icError;
    icInfo = icInfo;
    icClose = icClose;

    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: NotificationSettings,
        private snackbarRef: MatSnackBarRef<NotificationComponent>
    ) {}

    ngOnInit() {}

    dismiss() {
        this.snackbarRef.dismiss();
    }
}
