import { createAction, props } from '@ngrx/store';
import { CompanyDisplay } from '../../../../shared/interfaces/auxilium/company-center/company.interface';
import { GetPatientZipCodeLookUp } from '../../../../shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';

const AddCompany = createAction('[CompanyCenter Create/API] Add Company', props<{ company: CompanyDisplay }>());
const AddCompanySuccess = createAction(
    '[CompanyCenter Create/API] Add Company Success',
    props<{ company: CompanyDisplay }>()
);
const AddCompanyFailure = createAction('[CompanyCenter Create/API] Add Company Failure', props<{ error: Error }>());

const LoadCityAndStateDropDown = createAction(
    '[CompanyCenter Table/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[CompanyCenter Table/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[CompanyCenter Table/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[CompanyCenter Table/API] Refresh');

export const CompanyCenterIndividualActions = {
    AddCompany,
    AddCompanySuccess,
    AddCompanyFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
    Refresh,
};
