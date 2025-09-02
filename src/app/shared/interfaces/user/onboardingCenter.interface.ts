export interface OBC {
    total: number;
}

export interface Patient {
    id: number;
    entryDate: string;
    name: string;
    dob: string;
    state: string;
    repName: string;
    referralName: string;
    refState: string;
    lastNoteDate: string;
    noteAddedBy: string;
    lastContactNote: string;
}

export type GetPatientListResponse = Patient[];
