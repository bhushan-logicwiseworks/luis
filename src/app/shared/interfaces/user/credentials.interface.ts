export interface Credentials {
    email: string;
    password: string;
}

export interface ForgotPassword {
    email: string;
}

export interface ResetPassword {
    email: string;
    app: string;
}

export interface RegisterCredentials extends Credentials {
    name: string;
}

export interface Profile {
    name: string;
    email: string;
}
