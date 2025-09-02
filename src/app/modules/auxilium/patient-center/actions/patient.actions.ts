import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { PatientOrder } from 'app/shared/interfaces/auxilium/patient-center/patient-order.interface';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';

export const loadPatients = createAction('[Patient/API] Load Patients', props<{ screen?: string }>());
export const loadPatientsSuccess = createAction(
    '[Patient/API] Load Patients Success',
    props<{ patient: PatientEntity }>()
);
export const loadPatientsFailure = createAction('[Patient/API] Load Patients Failure', props<{ error: Error }>());

export const addPatient = createAction('[Patient/API] Upsert Patient', props<{ patients: PatientEntity }>());
export const addPatientSuccess = createAction(
    '[Patient/API] Upsert Patient Success',
    props<{ patients: PatientEntity }>()
);
export const addPatientFailure = createAction('[Patient/API] Upsert Patient Failure', props<{ error: Error }>());

export const updatePatient = createAction('[Patient/API] Update Patient', props<{ patients: PatientEntity }>());
export const updatePatientSuccess = createAction(
    '[Patient/API] Update Patient Success',
    props<{ patients: PatientEntity }>()
);
export const updatePatientFailure = createAction('[Patient/API] Update Patient Failure', props<{ error: Error }>());

export const loadOrder = createAction('[Patient Orders/API] Load Orders', props<{ patientId: number }>());
export const loadOrdersSuccess = createAction(
    '[Patient Orders/API] Load Orders Success',
    props<{ orders: PatientOrder[] }>()
);
export const loadOrdersFailure = createAction('[Patient Orders/API] Load Orders Failure', props<{ error: Error }>());

export const searchPatients = createAction('[Patient/API] Search Patients', props<{ search: string }>());

export const setLoading = createAction('[Patient] Set Loading', props<{ loading: boolean }>());
export const setAdvancedSearchOpen = createAction('[Patient] Set Advanced Search open', props<{ open?: boolean }>());
export const setVisibleColumns = createAction('[Patient] Set Visible Columns', props<{ columns: any[] }>());
export const setScreen = createAction('[Patient] Set Screen', props<{ screen: string }>());
export const setSearchValues = createAction('[Patient] Set Search Values', props<{ values: any }>());

export const addPatients = createAction('[Patient/API] Add Patients', props<{ patients: PatientEntity[] }>());

export const upsertPatients = createAction('[Patient/API] Upsert Patients', props<{ patients: PatientEntity[] }>());

export const updatePatients = createAction(
    '[Patient/API] Update Patients',
    props<{ patients: Update<PatientEntity>[] }>()
);

export const deletePatient = createAction('[Patient/API] Delete Patient', props<{ id: string }>());

export const deletePatients = createAction('[Patient/API] Delete Patients', props<{ ids: string[] }>());

export const clearPatients = createAction('[Patient/API] Clear Patients');
