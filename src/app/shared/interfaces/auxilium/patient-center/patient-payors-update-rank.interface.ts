export interface PayorRank {
    patientId: number;
    payorId: number;
    rank: number;
}

export interface PayorObject {
    payorRanks: PayorRank[];
}
