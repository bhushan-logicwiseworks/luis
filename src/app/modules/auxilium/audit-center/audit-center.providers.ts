import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AuditCenterTableEffects } from './effects/audit-center-table.effects';
import * as fromAuditList from './reducers';

export default [
    provideState(fromAuditList.featureKey, fromAuditList.reducers),
    provideEffects(AuditCenterTableEffects),
];
