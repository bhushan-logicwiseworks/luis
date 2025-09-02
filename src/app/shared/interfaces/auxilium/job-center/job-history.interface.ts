export interface JobHistory {
    id?: number;
    jobId?: number;
    jobTitle: string;
    machineName: string;
    message: string;
    returnText?: string;
    startTime?: Date;
    status?: string;
    endTime?: Date;
    historyId: number;
}
