import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { Analytics } from 'app/shared/interfaces/auxilium/analytics-center/analytics.interface';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as fromAnalyticsActions from '../actions/analytics-data.actions';
import { AnalyticsSelectors } from '../reducers';

const rows = [
    { key: 'totalActive', value: 'TOTAL ACTIVE PATIENTS IN THESE PRIMARY CATEGORIES' },
    // {key: null, value: 'TOTAL ACTIVE PATIENTS USING THESE PRODUCTS'},
    { key: 'age20', value: 'AGE 0-20' },
    { key: 'age64', value: 'AGE 21-64' },
    { key: 'age65', value: 'AGE 65+' },
    { key: 'male', value: 'MALE' },
    { key: 'female', value: 'FEMALE' },
    { key: 'english', value: 'ENGLISH PREFERENCE (%)', percentage: true },
    { key: 'spanish', value: 'SPANISH PREFERENCE (%)', percentage: true },
    { key: 'emailOnFile', value: 'EMAIL ADDRESSES ON FILE (%)', percentage: true },
];

function createTableData(analytics: Analytics[]) {
    return rows.map(row => {
        if (!row.key) {
            return {};
        }
        return {
            id: row.key,
            name: row.value,
            percentage: row.percentage,
            ...Object.fromEntries(
                analytics.reduce(
                    (a, b) => a.set(b.category, row.percentage ? (b[row.key] / b.totalActive) * 100 : b[row.key]),
                    new Map()
                )
            ),
        };
    });
}

@Injectable()
export class AnalyticsDataEffects {
    loadAnalyticsData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAnalyticsActions.loadAnalyticsDatas),
            withLatestFrom(this.store.select(AnalyticsSelectors.selectLoaded)),
            switchMap(([_, loaded]) => {
                if (loaded) {
                    return of(fromAnalyticsActions.setLoading({ loading: false }));
                }
                return this.apiService.getAnalytics().pipe(
                    map(analytics => fromAnalyticsActions.loadAnalyticsDataSuccess({ analyticsData: analytics })),
                    catchError(error => of(fromAnalyticsActions.loadAnalyticsDataFailure({ error })))
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
