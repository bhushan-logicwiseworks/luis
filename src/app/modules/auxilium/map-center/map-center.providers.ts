import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MapListTableEffects } from './effects/map-center-table.effects';
import * as fromMapList from './reducers';

export default [provideState(fromMapList.featureKey, fromMapList.reducers), provideEffects([MapListTableEffects])];
