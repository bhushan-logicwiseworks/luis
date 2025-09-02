import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AnalyticsDataEffects } from './analytics-data.effects';

describe('AnalyticsDataEffects', () => {
    let actions$: Observable<any>;
    let effects: AnalyticsDataEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AnalyticsDataEffects, provideMockActions(() => actions$)],
        });

        effects = TestBed.inject(AnalyticsDataEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
