export interface CreateEmailDto {
    patientId: number;
    from: string;
    subject: string;
    taskdate: string;
    label: string;
    body: string;
    owner: string;
}
