import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DrillDownTableEffects } from './effects/drilldown-table.effects';
import * as fromAccessList from './reducers';

export default [
    provideState(fromAccessList.featureKey, fromAccessList.reducers),
    provideEffects([DrillDownTableEffects]),
];
