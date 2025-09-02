export interface User {
    _id?: string; // Firebase Database Key
    id?: number;
    datecreated: string;
    email: string;
    name: string;
    lastsignin: string;
    image: string;
    salesid: string;
    role: string;
    actions: string;
}

export interface NewUser {
    name: string;
    email: string;
    password: string;
}
