import { createAction, props } from '@ngrx/store';
import {
    CompanyDisplay,
    GetCompaniesResponse,
} from '../../../../shared/interfaces/auxilium/company-center/company.interface';

const ResetState = createAction('[CompanyCenter Table/API] Reset Company State');
const LoadCompany = createAction('[CompanyCenter Table/API] Load Company');
const LoadCompanySuccess = createAction(
    '[CompanyCenter Table/API] Load Company Success',
    props<{ company: GetCompaniesResponse }>()
);
const LoadCompanyFailure = createAction('[CompanyCenter Table/API] Load Company Failure', props<{ error: Error }>());

const LoadCompanyById = createAction('[CompanyCenter API] Load Company', props<{ companyid: number }>());
const LoadCompanyByIdSuccess = createAction(
    '[CompanyCenter API] Load Company Success',
    props<{ companyData: CompanyDisplay }>()
);
const LoadCompanyByIdFailure = createAction('[CompanyCenter API] Load Company Failure', props<{ error: Error }>());

const LoadTaxonomy = createAction('[CompanyCenter API] Load Taxonomy');
const LoadTaxonomySuccess = createAction(
    '[CompanyCenter API] Load Taxonomy Success',
    props<{ taxonomy: CompanyDisplay[] }>()
);
const LoadTaxonomyFailure = createAction('[CompanyCenter API] Load Taxonomy Failure', props<{ error: Error }>());

const Refresh = createAction('[CompanyCenter Table/API] Refresh');

export const CompanyCenterTableActions = {
    LoadCompany,
    LoadCompanySuccess,
    LoadCompanyFailure,
    Refresh,
    ResetState,
    LoadCompanyById,
    LoadCompanyByIdSuccess,
    LoadCompanyByIdFailure,
    LoadTaxonomy,
    LoadTaxonomySuccess,
    LoadTaxonomyFailure,
};
