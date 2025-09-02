import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSettingPlanComponent } from './site-setting-plan.component';

describe('SiteSettingPlanComponent', () => {
    let component: SiteSettingPlanComponent;
    let fixture: ComponentFixture<SiteSettingPlanComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [SiteSettingPlanComponent],
}).compileComponents();

        fixture = TestBed.createComponent(SiteSettingPlanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
