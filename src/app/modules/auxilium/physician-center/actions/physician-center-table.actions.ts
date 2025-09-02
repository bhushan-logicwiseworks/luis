import { createAction, props } from '@ngrx/store';
import {
    GetPhysicianResponse,
    PhysicianDisplay,
} from 'app/shared/interfaces/auxilium/physician-center/physician.interface';

const ResetState = createAction('[PhysicianCenter Table/API] Reset Physician State');

const LoadPhysicians = createAction('[PhysicianCenter Table/API] Load Physician', props<{ filter: string }>());
const LoadPhysiciansSuccess = createAction(
    '[PhysicianCenter Table/API] Load Physician Success',
    props<{ physicians: GetPhysicianResponse }>()
);
const LoadPhysiciansFailure = createAction(
    '[PhysicianCenter Table/API] Load Physician Failure',
    props<{ error: Error }>()
);

const LoadTaxonomy = createAction('[Patient ContactType/API] Load Taxonomy');
const LoadTaxonomySuccess = createAction(
    '[Patient ContactType/API] Load Taxonomy Success',
    props<{ taxonomy: PhysicianDisplay[] }>()
);
const LoadTaxonomyFailure = createAction('[Patient ContactType/API] Load Taxonomy Failure', props<{ error: Error }>());

const LoadPhysicianById = createAction('[PhysicianCenter API] Load Physician', props<{ id: string }>());
const LoadPhysicianByIdSuccess = createAction(
    '[PhysicianCenter API] Load Physician Success',
    props<{ physician: PhysicianDisplay }>()
);
const LoadPhysicianByIdFailure = createAction(
    '[PhysicianCenter API] Load Physician Failure',
    props<{ error: Error }>()
);

const QuickAddPhysician = createAction(
    '[PhysicianCenter Create/API] Quick Add Physician',
    props<{ physician: PhysicianDisplay }>()
);
const QuickAddPhysicianSuccess = createAction(
    '[PhysicianCenter Create/API] Quick Add Physician Success',
    props<{ id: PhysicianDisplay['id'] }>()
);
const QuickAddPhysicianFailure = createAction(
    '[PhysicianCenter Create/API] Quick Add Physician Failure',
    props<{ error: Error }>()
);
const RedirectPhysicianCenter = createAction('[Router] Redirect PhysicianCenter');

const Refresh = createAction('[PhysicianCenter Table/API] Refresh');
const resetState = createAction('[PhysicianCenter Table/API] Reset PhysicianCenter');
const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());

export const PhysicianCenterTableActions = {
    LoadPhysicians,
    LoadPhysiciansSuccess,
    LoadPhysiciansFailure,
    LoadTaxonomy,
    LoadTaxonomySuccess,
    LoadTaxonomyFailure,
    LoadPhysicianById,
    LoadPhysicianByIdSuccess,
    LoadPhysicianByIdFailure,
    QuickAddPhysician,
    QuickAddPhysicianSuccess,
    QuickAddPhysicianFailure,
    RedirectPhysicianCenter,
    Refresh,
    ResetState,
    resetState,
    Navigate,
};
