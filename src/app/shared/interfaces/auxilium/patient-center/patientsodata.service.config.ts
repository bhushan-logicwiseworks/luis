import { EntitySetConfig } from 'angular-odata';

//#region ODataApi Imports
import { PatientsOdataService } from './patientsodata.service';
//#endregion

//#region ODataApi EntitySetConfig
export const PatientsOdataServiceEntitySetConfig = {
    name: 'PatientsOdata',
    entityType: 'MedicalAnswersAPI.Entities.PatientEntity',
    service: PatientsOdataService,
    annotations: [],
} as EntitySetConfig;
//#endregion
