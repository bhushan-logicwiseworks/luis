import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { RouterActions } from '../../../../reducers/router.actions';
import { LoginActions } from '../actions/login.actions';

@Injectable({
    providedIn: 'root',
})
export class LoginEffects {
    auth = inject(Auth);
    actions$ = inject(Actions);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.Login),
            switchMap(action =>
                from(signInWithEmailAndPassword(this.auth, action.credentials.email, action.credentials.password)).pipe(
                    mergeMap(user => [LoginActions.LoginSuccess({ user }), LoginActions.RedirectAfterLogin()]),
                    catchError(error => of(LoginActions.LoginFailure({ error })))
                )
            )
        )
    );

    redirectAfterLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.RedirectAfterLogin),
            map(() => RouterActions.NavigateHome())
        )
    );
}
