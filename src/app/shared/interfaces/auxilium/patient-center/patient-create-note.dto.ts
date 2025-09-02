import { Patient } from './patient.interface';

export interface PatientCreateNoteDto {
    patientId: Patient['id'];
    note: string;
    addedby: string;
}
