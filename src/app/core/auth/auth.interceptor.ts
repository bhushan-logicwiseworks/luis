import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const auth = inject(AngularFireAuth);
    const fuseConfirmationService = inject(FuseConfirmationService);
    const dialog = inject(MatDialog);

    return auth.idToken.pipe(
        take(1),
        switchMap(idToken => {
            let newReq = req.clone();
            if (idToken) {
                newReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });
            }

            return next(newReq).pipe(catchError(error => handleAuthError(error, fuseConfirmationService, dialog)));
        })
    );
};

const handleAuthError = (
    error: HttpErrorResponse,
    fuseConfirmationService: FuseConfirmationService,
    dialog: MatDialog
): Observable<never> => {
    if (error.status === 401 || error.status === 403) {
        noAccessMessage(fuseConfirmationService, dialog);
    } else if (error.status === 400 || error.status === 409) {
        const serverMessage = extractErrorMessagesFromErrorResponse(error);
        const message = Array.isArray(serverMessage) ? serverMessage.join(' ') : serverMessage.toString();
        if (message) {
            apiErrorMessage(message, fuseConfirmationService, dialog);
        }
    }
    return throwError(() => error);
};

const noAccessMessage = (fuseConfirmationService: FuseConfirmationService, dialog: MatDialog): void => {
    dialog.closeAll();
    fuseConfirmationService.open({
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
};

const extractErrorMessagesFromErrorResponse = (errorResponse: HttpErrorResponse): any => {
    const errors: any[] = [];

    if (errorResponse.error) {
        if (typeof errorResponse.error === 'string') {
            errors.push(errorResponse.error);
        }
        if (errorResponse.error.errors) {
            if (typeof errorResponse.error.errors === 'object') {
                for (const property in errorResponse.error.errors) {
                    if (errorResponse.error.errors.hasOwnProperty(property)) {
                        if (typeof errorResponse.error.errors[property] === 'string') {
                            return errorResponse.error.errors[property];
                        } else {
                            const propertyErrors: string[] = errorResponse.error.errors[property];
                            propertyErrors.forEach(error => errors.push(error));
                        }
                    }
                }
            } else if (typeof errorResponse.error.errors === 'string') {
                errors.push(errorResponse.error.errors);
            } else {
                errors.push('Something went wrong.');
            }
        }
    }
    return errors;
};

const apiErrorMessage = (error: string, fuseConfirmationService: FuseConfirmationService, dialog: MatDialog): void => {
    dialog.closeAll();
    fuseConfirmationService.open({
        title: 'Oops...',
        message: error,
        actions: {
            confirm: {
                label: 'OK',
            },
            cancel: {
                show: false,
            },
        },
    });
};
