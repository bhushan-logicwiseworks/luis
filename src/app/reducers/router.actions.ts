import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

const Navigate = createAction('[Router] Navigate', props<{ commands: any[]; extras?: NavigationExtras }>());
const NavigateHome = createAction('[Router] Navigate Dashboards');
const NavigateLogin = createAction('[Router] Navigate Login');

export const RouterActions = {
    Navigate,
    NavigateHome,
    NavigateLogin,
};
