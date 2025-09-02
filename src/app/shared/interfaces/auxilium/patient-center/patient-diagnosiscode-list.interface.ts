export class PatientDiagnosisCodesList {
    id: number;
    code: string;
    codetype: string;
    description: string;
    adduserid: string;
    adddate: string;
    syslock: boolean;
    effectivedate: string;
    expiredate: string;
    path: string;
    action: string;
    notes: string;
    miscflag1: boolean;
}
export type GetDiagnosisCodesListResponse = PatientDiagnosisCodesList[];
