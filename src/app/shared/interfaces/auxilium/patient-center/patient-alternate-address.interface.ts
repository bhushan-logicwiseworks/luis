import { Moment } from 'moment';

export class PatientOtherAddress {
    id: number;
    addresstype: string;
    entityid: number;
    entitytype: string;
    firstname: string;
    middlename: string;
    lastname: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    relationship: string;
    email: string;
    effectivedate: string | Date | Moment;
    expiredate: string | Date | Moment;
    adddate: string | Date | Moment;
    adduserid: string;
}
