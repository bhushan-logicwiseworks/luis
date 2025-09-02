export interface Job {
    id?: number;
    name?: string;
    scheduleType?: string;
    lastRun?: Date;
    lastStatus?: string;
    commandText?: string;
    exeName?: string;
    isEnabled: boolean;
    start?: Date;
    end?: Date;
    minute?: number;
    hour?: number;
    repeatDays?: number;
    repeatWeeks?: number;
    daysOfWeek?: number[];
    daysOfMonth?: number[];
    weekOfMonth?: number;
    months?: number[];
}
