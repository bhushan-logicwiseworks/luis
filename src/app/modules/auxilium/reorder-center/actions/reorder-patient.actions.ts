import { createAction, props } from '@ngrx/store';
import {
    MixedDatesForMultipleReturnedObjects,
    ReorderPatient,
    ReorderPatientAlternateShipping,
    ReorderPatientDoctor,
    ReorderPatientInsurance,
    ReorderPatientNotes,
    ReorderProducts,
} from '../interfaces/reorderPatient';

export const loadReorderPatientData = createAction(
    '[ReorderPatientActions/API] Load All Reorder Patient Data from all the endpoints',
    props<{ id: string | number }>()
);
export const loadReorderPatientDataSuccess = createAction(
    '[ReorderPatientActions/API] Load All Reorder Patient Data from all the endpoints Success',
    props<{
        // prismAuthorization: PrismAuthorize;
        patient: ReorderPatient;
        insurance: ReorderPatientInsurance[];
        alternateShipToAddress: ReorderPatientAlternateShipping;
        doctor: ReorderPatientDoctor;
        datesEtc: MixedDatesForMultipleReturnedObjects;
        patientNotes: ReorderPatientNotes[];
        reorderProducts: ReorderProducts[];
    }>()
);
export const loadReorderPatientDataFailure = createAction(
    '[ReorderPatientActions/API] Load All Reorder Patient Data from all the endpoints Failure',
    props<{ error: Error }>()
);

export const openPatientNotes = createAction('[ReorderPatientActions] Open Patient Notes Sidebar');

export const loadReorderPatient = createAction(
    '[ReorderPatientActions] Load ReorderPatient',
    props<{ id: string | number }>()
);

export const loadReorderPatientSuccess = createAction(
    '[ReorderPatientActions] Load ReorderPatient Success',
    props<{ patient: ReorderPatient }>()
);

export const loadReorderPatientFailure = createAction(
    '[ReorderPatientActions] Load ReorderPatient Failure',
    props<{ error: Error }>()
);

export const loadReorderPatientInsurance = createAction(
    '[ReorderPatientActions] Load ReorderPatient Insurance',
    props<{ id: string | number }>()
);

export const loadReorderPatientInsuranceSuccess = createAction(
    '[ReorderPatientActions] Load ReorderPatientInsurance Success',
    props<{ insurance: any }>()
);

export const loadReorderPatientInsuranceFailure = createAction(
    '[ReorderPatientActions] Load ReorderPatientInsurance Failure',
    props<{ error: Error }>()
);

export const loadReorderPatientDoctor = createAction(
    '[ReorderPatientActions] Load ReorderPatient Doctor',
    props<{ id: string | number }>()
);

export const loadReorderPatientDoctorSuccess = createAction(
    '[ReorderPatientActions] Load ReorderPatient Doctor Success',
    props<{ doctor: any }>()
);

export const loadReorderPatientDoctorFailure = createAction(
    '[ReorderPatientActions] Load ReorderPatient Doctor Failure',
    props<{ error: Error }>()
);

export const loadReorderPatientAltAddress = createAction('[ReorderPatientActions] Load ReorderPatient AltAddress');

export const loadReorderPatientAltAddressSuccess = createAction(
    '[ReorderPatientActions] Load ReorderPatient AltAddress Success',
    props<{ shipToAddress: any }>()
);

export const loadReorderPatientAltAddressFailure = createAction(
    '[ReorderPatientActions] Load ReorderPatient AltAddress Failure',
    props<{ error: Error }>()
);

export const prismAuthorization = createAction(
    '[ReorderPatientActions] Prism Authorization',
    props<{ id: string | number }>()
);

export const prismAuthorizationSuccess = createAction(
    '[ReorderPatientActions] Prism Authorization Success',
    props<{ id: string | number }>()
);

export const prismAuthorizationFailure = createAction(
    '[ReorderPatientActions] Prism Authorization Failure',
    props<{ error: Error }>()
);
