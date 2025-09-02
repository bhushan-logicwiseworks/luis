import { createAction, props } from '@ngrx/store';
import { LicenseFolder } from 'app/shared/interfaces/auxilium/license-center/license-folder-interface';
import { LicenseInfo } from 'app/shared/interfaces/auxilium/license-center/license-info-interface';

const UpdateLicense = createAction('[LicenseCenter Update/API] Update Licenses', props<{ licenses: LicenseInfo }>());
const UpdateLicenseSuccess = createAction(
    '[LicenseCenter Update/API] Update Licenses Success',
    props<{ licenses: LicenseInfo }>()
);
const UpdateLicenseFailure = createAction(
    '[LicenseCenter Update/API] Update Licenses Failure',
    props<{ error: Error }>()
);

const AddLicenseFolder = createAction('[LicenseCenter Add/API] Add License Folder', props<{ id: string }>());
const AddLicenseFolderSuccess = createAction(
    '[LicenseCenter Add/API] Update License Folder Success',
    props<{ licenseFolder: LicenseFolder }>()
);
const AddLicenseFolderFailure = createAction(
    '[LicenseCenter Add/API] Update License Folder Failure',
    props<{ error: Error }>()
);

export const LicenseCenterIndividualActions = {
    AddLicenseFolder,
    AddLicenseFolderSuccess,
    AddLicenseFolderFailure,
    UpdateLicense,
    UpdateLicenseFailure,
    UpdateLicenseSuccess,
};
