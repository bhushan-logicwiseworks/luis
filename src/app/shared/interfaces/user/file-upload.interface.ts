import { DateTime } from 'luxon';

export interface FileUpload {
    id: number;
    fileName: string;
    progress: number;
    status: 'running' | 'success' | 'cancelled' | 'error';
    createdAt: DateTime;
}
