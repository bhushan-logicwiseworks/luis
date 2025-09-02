import { createAction, props } from '@ngrx/store';
import { PatientChargesById } from '../../../../shared/interfaces/auxilium/patient-center/patient-charges-by-id.interface';
import { PatientCharges } from '../../../../shared/interfaces/auxilium/patient-center/patient-charges.interface';
import { Patient } from '../../../../shared/interfaces/auxilium/patient-center/patient.interface';

const LoadCharges = createAction('[Patient LoadCharges/API] Load Charges', props<{ patientId: Patient['id'] }>());
const LoadChargesSuccess = createAction(
    '[Patient LoadCharges/API] Load Charges Success',
    props<{ data: PatientCharges[] }>()
);
const LoadChargesFailure = createAction('[Patient LoadCharges/API] Load Charges Failure', props<{ error: Error }>());

const LoadChargesById = createAction('[Patient LoadCharges/API] Load LoadChargesById', props<{ chargeId: number }>());
const LoadChargesByIdSuccess = createAction(
    '[Patient LoadCharges/API] Load LoadChargesById Success',
    props<{ chargesData: PatientChargesById }>()
);
const LoadChargesByIdFailure = createAction(
    '[Patient LoadCharges/API] Load LoadChargesById Failure',
    props<{ error: Error }>()
);

const AddCharges = createAction('[charges Create/API] Add Charges', props<{ charges: PatientChargesById }>());
const AddChargesSuccess = createAction(
    '[charges Create/API] Add Charges Success',
    props<{ charges: PatientChargesById }>()
);
const AddChargesFailure = createAction('[charges Create/API] Add Charges Failure', props<{ error: Error }>());

const EditGroupCharges = createAction(
    '[Patient EditGroupCharges/API] Edit GroupCharges',
    props<{ chargesData: any }>()
);
const EditGroupChargesSuccess = createAction('[Patient EditGroupCharges/API] Edit GroupCharges Success');
const EditGroupChargesFailure = createAction(
    '[Patient EditGroupCharges/API] Edit GroupCharges Failure',
    props<{ error: Error }>()
);

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());

const Refresh = createAction('[PatientCharges Table/API] Refresh');

export const PatientChargesActions = {
    LoadCharges,
    LoadChargesSuccess,
    LoadChargesFailure,
    LoadChargesById,
    LoadChargesByIdSuccess,
    LoadChargesByIdFailure,
    AddCharges,
    AddChargesSuccess,
    AddChargesFailure,
    EditGroupCharges,
    EditGroupChargesSuccess,
    EditGroupChargesFailure,
    Navigate,
    Refresh,
};
