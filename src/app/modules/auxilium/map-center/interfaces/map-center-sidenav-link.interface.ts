import { Icon } from '@abhinavakhil/iconify-angular';

export interface MapListSidenavLink {
    label: string;
    route: string[];
    icon: Icon;
    classes?: {
        color?: string;
    };
    routerLinkActiveOptions?: { exact: boolean };
}
