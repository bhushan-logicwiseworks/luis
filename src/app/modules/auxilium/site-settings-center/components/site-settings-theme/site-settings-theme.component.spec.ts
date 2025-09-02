import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSettingsThemeComponent } from './site-settings-theme.component';

describe('SiteSettingsThemeComponent', () => {
    let component: SiteSettingsThemeComponent;
    let fixture: ComponentFixture<SiteSettingsThemeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [SiteSettingsThemeComponent],
}).compileComponents();

        fixture = TestBed.createComponent(SiteSettingsThemeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
