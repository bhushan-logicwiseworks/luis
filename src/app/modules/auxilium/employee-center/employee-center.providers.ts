import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { EmployeeDemographicsEffects } from './effects/employee-center-demographics.effects';
import { EmployeeCenterDetailsEffects } from './effects/employee-center-details.effects';
import { EmployeeCenterIndividualEffects } from './effects/employee-center-individualeffects';
import { EmployeeSecurityEffects } from './effects/employee-center-security.effects';
import { EmployeeCenterTableEffects } from './effects/employee-center-table.effects';
import * as fromEmployeeCenter from './reducers';

export default [
    provideState(fromEmployeeCenter.featureKey, fromEmployeeCenter.reducers),
    provideEffects([
        EmployeeCenterTableEffects,
        EmployeeCenterIndividualEffects,
        EmployeeCenterDetailsEffects,
        EmployeeDemographicsEffects,
        EmployeeSecurityEffects,
    ]),
];
