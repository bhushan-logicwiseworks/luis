import { createAction, props } from '@ngrx/store';
import { PhysicianDisplay } from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import {
    GetValidationResponse,
    Validation,
} from 'app/shared/interfaces/auxilium/validation-center/validation.interface';

const ResetState = createAction('[ValidationCenter Table/API] Reset Validation State');

const LoadValidations = createAction('[ValidationCenter Table/API] Load Validation');
const LoadValidationsSuccess = createAction(
    '[ValidationCenter Table/API] Load Validation Success',
    props<{ validations: GetValidationResponse }>()
);
const LoadValidationsFailure = createAction(
    '[ValidationCenter Table/API] Load Validation Failure',
    props<{ error: Error }>()
);

const LoadTaxonomy = createAction('[ValidationCenter Table/API] Load Taxonomy ');
const LoadTaxonomySuccess = createAction(
    '[ValidationCenter Table/API] Load Taxonomy Success',
    props<{ taxonomy: PhysicianDisplay[] }>()
);
const LoadTaxonomyFailure = createAction(
    '[ValidationCenter Table/API] Load Taxonomy Failure',
    props<{ error: Error }>()
);

const LoadValidationById = createAction('[ValidationCenter API] Load Validation', props<{ id: string }>());
const LoadValidationByIdSuccess = createAction(
    '[ValidationCenter API] Load Validation Success',
    props<{ validation: Validation }>()
);
const LoadValidationByIdFailure = createAction(
    '[ValidationCenter API] Load Validation Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[ValidationCenter Table/API] Refresh');
const resetState = createAction('[ValidationCenter Table/API] Reset ValidationCenter');

export const ValidationCenterTableActions = {
    LoadValidations,
    LoadValidationsSuccess,
    LoadValidationsFailure,
    LoadTaxonomy,
    LoadTaxonomySuccess,
    LoadTaxonomyFailure,
    LoadValidationById,
    LoadValidationByIdSuccess,
    LoadValidationByIdFailure,
    Refresh,
    ResetState,
    resetState,
};
