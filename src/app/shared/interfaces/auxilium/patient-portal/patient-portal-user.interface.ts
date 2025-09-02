export interface PatientPortalUserDisplay {
    id: number;
    patientId: number;
    guid: string;
    registeredEmail: string;
    userEmail: string;
    isEmailConfirmed: boolean;
    isElectronicConsent: boolean;
    electronicConsentDate: string;
    createdDate: string;
    createdBy: string;
    modifiedDate: string;
    modifiedBy: string;
    code: string;
    codeDate: string;
}

export type GetPatientPortalUserResponse = PatientPortalUserDisplay[];

// export interface PatientPortalUserResponse {
//     id: number;
//     patientId: number;
//     guid: string;
//     registeredEmail: string;
//     userEmail: string;
//     isEmailConfirmed: boolean;
//     isElectronicConsent: boolean;
//     electronicConsentDate: string;
//     createdDate: string;
//     createdBy: string;
//     modifiedDate: string;
//     modifiedBy: string;
//     code: string;
//     codeDate: string;
//   }
