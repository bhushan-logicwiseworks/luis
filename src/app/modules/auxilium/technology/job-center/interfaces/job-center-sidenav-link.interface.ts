import { Icon } from '@abhinavakhil/iconify-angular';

export interface JobListSidenavLink {
    label: string;
    route: string[];
    icon: Icon;
    classes?: {
        color?: string;
    };
    routerLinkActiveOptions?: { exact: boolean };
}
