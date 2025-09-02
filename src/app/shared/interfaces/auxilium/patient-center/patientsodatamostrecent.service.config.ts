import { EntitySetConfig } from 'angular-odata';

//#region ODataApi Imports
import { PatientsOdataMostRecentService } from './patientsodatamostrecent.service';
//#endregion

//#region ODataApi EntitySetConfig
export const PatientsOdataMostRecentServiceEntitySetConfig = {
    name: 'PatientsOdataMostRecent',
    entityType: 'MedicalAnswersAPI.Entities.PatientEntity',
    service: PatientsOdataMostRecentService,
    annotations: [],
} as EntitySetConfig;
//#endregion
