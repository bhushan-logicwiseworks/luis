import { Component } from '@angular/core';
import { GlobalSiteSettingsComponent } from '../../../../../shared/components/auxilium/aux-global-site-settings/aux-global-site-settings.component';

@Component({
    selector: 'app-site-settings-theme',
    templateUrl: './site-settings-theme.component.html',
    styleUrls: ['./site-settings-theme.component.scss'],
    imports: [GlobalSiteSettingsComponent],
})
export class SiteSettingsThemeComponent {}
