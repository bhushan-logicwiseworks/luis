import { EntityContainerConfig } from 'angular-odata';

//#region ODataApi Imports
import { PatientsOdataServiceEntitySetConfig } from './patientsodata.service.config';
import { PatientsOdataMostRecentServiceEntitySetConfig } from './patientsodatamostrecent.service.config';
//#endregion

//#region ODataApi EntityContainerConfig
export const ContainerContainer = {
    name: 'Container',
    annotations: [],
    entitySets: [PatientsOdataServiceEntitySetConfig, PatientsOdataMostRecentServiceEntitySetConfig],
} as EntityContainerConfig;
//#endregion
