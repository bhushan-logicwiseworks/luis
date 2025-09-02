export interface NextDosRequest {
    lastDos: string;
    supplyDays: number;
}

export interface NextDosResponse {
    lastDos: string;
    supplyDays: number;
    nexttDos: string;
}

export type GetNextDosResponse = NextDosResponse[];
