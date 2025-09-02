export class PatientEmergencyContact {
    id: number;
    patientId: number;
    rank: number;
    lastname: string;
    firstname: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    cell: string;
    email: string;
    type: string;
    relationship: string;
    addedby: string;
    addeddate: string;
    modifiedby: string;
    modifieddate: string;
    isactive: boolean;
    isdeleted: boolean;
    isEmergency: boolean;
    isAuthorized: boolean;
}

export const TranFormInputValuesUpperCase = [
    'lastname',
    'firstname',
    'address',
    'address2',
    'city',
    'state',
    'email',
    'type',
    'relationship',
];

export type GetPatientEmergencyContact = PatientEmergencyContact[];
