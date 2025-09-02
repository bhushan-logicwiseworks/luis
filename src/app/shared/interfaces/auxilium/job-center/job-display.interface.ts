export interface JobDisplay {
    jobId?: number;
    jobName?: string;
    schedule?: string;
    lastRun?: Date;
    lastStatus?: string;
    nextRun?: string;
    isToday?: boolean;
}
