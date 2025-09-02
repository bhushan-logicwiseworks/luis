import { Injectable } from '@angular/core';

import { ODataClient, ODataEntitySetService } from 'angular-odata';
import { PatientEntity } from './patiententity.entity';

//#region ODataApi Imports

//#endregion

@Injectable()
export class PatientsOdataService extends ODataEntitySetService<PatientEntity> {
    constructor(protected client: ODataClient) {
        super(client, 'PatientsOdata', 'MedicalAnswersAPI.Entities.PatientEntity');
    }

    //#region ODataApi Actions
    //#endregion
    //#region ODataApi Functions
    //#endregion
    //#region ODataApi Navigations
    //#endregion
}
