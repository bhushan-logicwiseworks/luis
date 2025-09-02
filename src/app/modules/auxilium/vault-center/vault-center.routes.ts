import { Route } from '@angular/router';
import { FileVaultComponent } from './containers/vault-center.component';
import { VaultGuard } from './guards/vault.guard';
import providers from './vault-center.providers';

export default [
    {
        path: '',
        component: FileVaultComponent,
        providers: providers,
        canActivate: [VaultGuard],
    },
    {
        path: ':vaultId',
        component: FileVaultComponent,
        providers: providers,
        canActivate: [VaultGuard],
    },
] as Route[];
