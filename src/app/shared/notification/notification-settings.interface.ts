import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationType } from './notification-type.enum';

export interface NotificationSettings {
    type: NotificationType;
    message: string;
    dismissable?: boolean;
    snackBarConfig?: MatSnackBarConfig;
}
