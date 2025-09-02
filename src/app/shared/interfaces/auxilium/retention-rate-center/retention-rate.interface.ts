export interface RetentionRate {
    createdBy: string;
    createdDate: string;
    id: number;
    initial: number;
    modifiedBy: string;
    modifiedDate: string;
    month: number;
    new: number;
    total: number;
    year: number;
}

export type GetRetentionRateResponse = RetentionRate[];
