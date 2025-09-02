import { SafeHtml } from '@angular/platform-browser';

export interface PatientNote {
    id: 0;
    entityType: string;
    entityID: number;
    contactType: string | number;
    note: string | SafeHtml;
    addUserId: string;
    addDate: Date;
    priority: string;
    message?: string;
    description: string;
}
