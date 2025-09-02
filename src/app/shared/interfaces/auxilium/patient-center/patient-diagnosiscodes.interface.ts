export class PatientDiagnosisCodes {
    id: number;
    patientId: number;
    icdCodeId: number;
    order: number;
    icd10code: string;
    description: string;
}
export type GetDiagnosisCodesResponse = PatientDiagnosisCodes[];
