import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { LicenseCenterIndividualEffects } from './effects/license-center-individual.effects';
import { LicenseCenterTableEffects } from './effects/license-center-table.effects';
import { LicenseFileEffects } from './effects/license-file.effects';
import { LicenseFolderTreeEffects } from './effects/license-folder-tree.effects';
import { LicenseFolderEffects } from './effects/license-folder.effects';
import * as fromLicenseCenter from './reducers';

export default [
    provideState(fromLicenseCenter.featureKey, fromLicenseCenter.reducers),
    provideEffects([
        LicenseCenterTableEffects,
        LicenseCenterIndividualEffects,
        LicenseFolderEffects,
        LicenseFileEffects,
        LicenseFolderTreeEffects,
    ]),
];
