import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { RouterActions } from './router.actions';

@Injectable({
    providedIn: 'root',
})
export class RouterEffects {
    navigate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.Navigate),
                tap(action => this.router.navigate(action.commands, action.extras))
            ),
        { dispatch: false }
    );

    navigateHome$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RouterActions.NavigateHome),
            map(() =>
                RouterActions.Navigate({
                    commands: ['/dashboards/project'],
                })
            )
        )
    );

    // navigateLogin$ = createEffect(() => this.actions$.pipe(
    //   ofType(RouterActions.NavigateLogin),
    //   map(() => RouterActions.Navigate({
    //     commands: ['/sign-in']
    //   }))
    // ));

    constructor(
        private actions$: Actions,
        private router: Router
    ) {}
}
