import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { NotificationService } from '../../shared/notification';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AngularFireAuth,
        private _fuseConfirmationService: FuseConfirmationService,
        private dialog: MatDialog,
        private readonly notificationService: NotificationService
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.auth.idToken.pipe(
            take(1),
            switchMap(idToken => {
                if (idToken) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${idToken}`,
                        },
                    });
                }

                return next.handle(request).pipe(catchError(error => this.handleAuthError(error)));
            })
        );
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.errorMessage();
        } else if (err.status === 0) {
            this.notificationService.error(err.message);
        }
        return throwError(err);
    }
    errorMessage() {
        this.dialog.closeAll();
        this._fuseConfirmationService.open({
            title: 'Oops...',
            message: "You don't have access to this module!",
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
}
