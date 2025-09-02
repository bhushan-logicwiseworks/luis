import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSiteSettingsComponent } from './aux-global-site-settings.component';

describe('GlobalSiteSettingsComponent', () => {
    let component: GlobalSiteSettingsComponent;
    let fixture: ComponentFixture<GlobalSiteSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [GlobalSiteSettingsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(GlobalSiteSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
