export interface Remits835Display {
    id: number;
    originalFileName: string;
    newFileName: string;
    dateAdded: string;
    dateIssued: string;
    payorName: string;
    checkNumber: string;
    eftTraceNumber: string;
    totalAmount: number;
}

export type GetRemits835Response = Remits835Display[];
