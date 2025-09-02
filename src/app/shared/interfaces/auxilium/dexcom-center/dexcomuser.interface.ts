export interface DexcomUserDisplay {
    id: number;
    email: string;
    zipcodes: string;
}

export type GetDexcomUserResponse = DexcomUserDisplay[];
