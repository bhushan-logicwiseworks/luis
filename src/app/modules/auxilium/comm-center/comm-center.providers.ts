import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CommCenterCreateEffects } from './effects/comm-center-create.effects';
import { CommCenterEmailEffects } from './effects/comm-center-email.effects';
import { CommCenterTableEffects } from './effects/comm-center-table.effects';
import * as fromCommCenter from './reducers';

export default [
    provideState(fromCommCenter.featureKey, fromCommCenter.reducers),
    provideEffects([CommCenterTableEffects, CommCenterEmailEffects, CommCenterCreateEffects]),
];
