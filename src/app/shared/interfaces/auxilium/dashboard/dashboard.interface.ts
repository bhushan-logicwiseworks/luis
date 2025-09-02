export interface ActiveCMGPatientLongevityDisplay {
    source: string;
    total: number;
    all: number;
    percent: number;
}

export type GetActiveCMGPatientLongevityResponse = ActiveCMGPatientLongevityDisplay[];
