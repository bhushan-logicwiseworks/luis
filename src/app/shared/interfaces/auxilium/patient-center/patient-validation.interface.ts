export interface PatientValidation {
    patientId: number;
    percent: number;
    physicianIsValid: boolean;
    payorIsValid: boolean;
    diagnosisCodeIsValid: boolean;
    docsAreValid: boolean;
    categoryIsValid: boolean;
}
