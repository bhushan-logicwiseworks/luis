import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NotificationSettings } from './notification-settings.interface';
import { NotificationType } from './notification-type.enum';
import { NotificationComponent } from './notification.component';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(
        private snackbar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    open(options: NotificationSettings) {
        return this.snackbar.openFromComponent(NotificationComponent, {
            data: options,
            ...(options.snackBarConfig || {}),
        });
    }

    success(message: string, options?: Partial<NotificationSettings>) {
        /* return this.open({
      dismissable: true,
      ...options,
      type: NotificationType.success,
      message
    }); */

        this._fuseConfirmationService.open({
            title: message,
            message: '',
            actions: {
                confirm: {
                    label: 'OK',
                },
                cancel: {
                    show: false,
                },
            },
            icon: {
                name: 'heroicons_outline:check-circle',
                color: 'success',
            },
        });
    }

    info(message: string, options?: Partial<NotificationSettings>) {
        return this.open({
            dismissable: true,
            ...options,
            type: NotificationType.info,
            message,
        });
    }

    error(message: string, options?: Partial<NotificationSettings>) {
        this._fuseConfirmationService.open({
            title: 'Oops...',
            message: message,
            actions: {
                confirm: {
                    label: 'OK',
                },
                cancel: {
                    show: false,
                },
            },
        });
    }

    warning(message: string, options?: Partial<NotificationSettings>) {
        return this.open({
            dismissable: true,
            ...options,
            type: NotificationType.warning,
            message,
        });
    }
}
