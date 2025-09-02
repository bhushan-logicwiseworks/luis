import { Routes } from '@angular/router';
import { CombinedComponent } from './combined.component';
import providers from './combined.providers';
import { CombinedResolver } from './combined.resolvers';

export default [
    {
        path: '',
        component: CombinedComponent,
        providers: providers,
        resolve: {
            data: CombinedResolver,
        },
    },
] as Routes;
