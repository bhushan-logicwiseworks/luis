import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { EventTrackingCreateEffects } from './effects/event-tracking-create.effects';
import { EventTrackingEmailEffects } from './effects/event-tracking-email.effects';
import { EventTrackingTableEffects } from './effects/event-tracking-table.effects';
import * as fromEventTracking from './reducers';

export default [
    provideState(fromEventTracking.featureKey, fromEventTracking.reducers),
    provideEffects([EventTrackingTableEffects, EventTrackingEmailEffects, EventTrackingCreateEffects]),
];
