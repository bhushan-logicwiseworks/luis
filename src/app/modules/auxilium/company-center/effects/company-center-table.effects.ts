import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CompanyCenterIndividualActions } from '../actions/company-center-individualeffects';
import { CompanyCenterTableActions } from '../actions/company-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class CompanyCenterTableEffects {
    loadCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyCenterTableActions.LoadCompany),
            switchMap(action =>
                this.apiService.getCompany().pipe(
                    map(company => CompanyCenterTableActions.LoadCompanySuccess({ company })),
                    catchError(error => of(CompanyCenterTableActions.LoadCompanyFailure({ error: error.error })))
                )
            )
        )
    );

    loadCompanyById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyCenterTableActions.LoadCompanyById),
            switchMap(action =>
                this.apiService.getCompanyById(action.companyid).pipe(
                    map(companyData => CompanyCenterTableActions.LoadCompanyByIdSuccess({ companyData })),
                    catchError(error => of(CompanyCenterTableActions.LoadCompanyByIdFailure({ error: error.error })))
                )
            )
        )
    );

    loadTax$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyCenterTableActions.LoadTaxonomy),
            switchMap(action =>
                this.apiService.getTaxonomycity().pipe(
                    map(taxonomy => CompanyCenterTableActions.LoadTaxonomySuccess({ taxonomy })),
                    catchError(error => of(CompanyCenterTableActions.LoadTaxonomyFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyCenterIndividualActions.AddCompanySuccess),
            map(() => CompanyCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
