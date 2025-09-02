import { Icon } from '@abhinavakhil/iconify-angular';
import { Observable } from 'rxjs';

export type NavigationItem = NavigationLink | NavigationDropdown | NavigationSubheading;

export interface NavigationLink {
    type: 'link';
    route: string | any;
    fragment?: string;
    label: string;
    icon?: Icon;
    routerLinkActiveOptions?: { exact: boolean };
    badge?: {
        value: string;
        bgClass: string;
        textClass: string;
    };
    displayFn$?: (item: NavigationItem) => Observable<boolean>;
}

export interface NavigationDropdown {
    type: 'dropdown';
    label: string;
    icon?: Icon;
    children: Array<NavigationLink | NavigationDropdown>;
    badge?: {
        value: string;
        bgClass: string;
        textClass: string;
    };
    displayFn$?: (item: NavigationItem) => Observable<boolean>;
}

export interface NavigationSubheading {
    type: 'subheading';
    label: string;
    children: Array<NavigationLink | NavigationDropdown>;
    displayFn$?: (item: NavigationItem) => Observable<boolean>;
}
