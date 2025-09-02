export interface IdentityDisplay {
    userUID?: string;
    displayName: string;
    email: string;
    password: string;
    emailVerified: boolean;
    created?: string;
    lastSignIn?: string;
}

export type GetIdentityResponse = IdentityDisplay[];
