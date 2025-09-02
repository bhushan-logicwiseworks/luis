export interface EOBPatientDisplay {
    id: number;
    eobid: number;
    patientControlNumber: string;
    patientName: string;
    patientId: string;
    claimAmount: number;
    claimStatusCode: string;
    rawData: string;
    createdDate: string;
}
export type getEOBPatientResponse = EOBPatientDisplay[];
