import { SchemaConfig } from 'angular-odata';

//#region ODataApi Imports
import { PatientEntityEntityConfig } from './patiententity.entity.config';
//#endregion

//#region ODataApi SchemaConfig
export const EntitiesSchema = {
    namespace: 'MedicalAnswersAPI.Entities',
    enums: [],
    entities: [PatientEntityEntityConfig],
    callables: [],
    containers: [],
} as SchemaConfig;
//#endregion
