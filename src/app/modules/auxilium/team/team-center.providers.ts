import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { TeamCenterTableEffects } from './effects/team-center.effects';
import * as fromTeamCenter from './reducers';

export default [
    provideState(fromTeamCenter.featureKey, fromTeamCenter.reducers),
    provideEffects([TeamCenterTableEffects]),
];
