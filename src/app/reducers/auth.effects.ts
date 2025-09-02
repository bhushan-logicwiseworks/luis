import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { from, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthActions } from './auth.actions';
import { RouterActions } from './router.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthEffects {
    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.Logout),
            switchMap(() => from(this.auth.signOut()).pipe(map(() => RouterActions.NavigateLogin())))
        )
    );

    getLoggedInUserID$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.GetLoggedInUserID),
                tap(() =>
                    this.apiService
                        .getEmployeeId()
                        .pipe(take(1))
                        .subscribe(
                            (response: { id: number }) => {
                                this.store.dispatch(AuthActions.GetLoggedInUserDetails(response));
                                this.store.dispatch(AuthActions.GetLoggedInUserPic(response));
                            },
                            error => {
                                const dummyResponse = {
                                    id: 21,
                                };
                                this.store.dispatch(AuthActions.GetLoggedInUserDetails(dummyResponse));
                                this.store.dispatch(AuthActions.GetLoggedInUserPic(dummyResponse));
                            }
                        )
                )
            ),
        {
            dispatch: false,
        }
    );

    getLoggedInUserDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.GetLoggedInUserDetails),
            switchMap(action => {
                return this.apiService.getEmployeeDetails(action.id).pipe(
                    map(loggedInUser => AuthActions.GetLoggedInUserDetailsSuccess({ loggedInUser })),
                    catchError(() => of(AuthActions.GetLoggedInUserDetailsFailure(null)))
                );
            })
        )
    );

    GetLoggedInUserPic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.GetLoggedInUserPic),
            switchMap(action => {
                return this.apiService.getEmployeePic(action.id).pipe(
                    map(loggedInUserPic => AuthActions.GetLoggedInUserPicSuccess({ loggedInUserPic })),
                    catchError(() => of(AuthActions.GetLoggedInUserPicFailure(null)))
                );
            })
        )
    );

    updateLoggedInUserDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.UpdateLoggedInUserDetails),
            switchMap(action => {
                return this.apiService.addEmployeeDetails(action.loggedInUser).pipe(
                    // need to send action payload because api returns id in the response
                    map(loggedInUser => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Account details has been updated successfully.',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        return AuthActions.UpdateLoggedInUserDetailsSuccess({ loggedInUser: action.loggedInUser });
                    }),
                    catchError(() => of(AuthActions.UpdateLoggedInUserDetailsFailure(null)))
                );
            })
        )
    );

    uploadEmployeePic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.UploadEmployeePic),
            switchMap(action => {
                return this.apiService.uploadEmployeePic(action.uploadPic).pipe(
                    map(loggedInUser => {
                        const data = [
                            {
                                documentfile: action.documentfile,
                            },
                            {
                                documentfile: action.backgroundProfileFile,
                            },
                        ];
                        return AuthActions.UploadEmployeePicSuccess({ loggedInUserPic: data });
                    }),
                    catchError(error => of(AuthActions.UploadEmployeePicFailure(null)))
                );
            })
        )
    );

    forgotPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.ForgotPassword),
            switchMap(action => {
                return this.apiService.resetPassword(action.ForgotPassword).pipe(
                    map(message => AuthActions.ForgotPasswordSuccess({ message: message })),
                    catchError(error => of(AuthActions.ForgotPasswordFailure({ error: error })))
                );
            })
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup => AuthActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })),
                    catchError(error => of(AuthActions.LoadCityAndStateDropDownFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private auth: AngularFireAuth,
        private apiService: ApiService,
        private store: Store
    ) {}
}
