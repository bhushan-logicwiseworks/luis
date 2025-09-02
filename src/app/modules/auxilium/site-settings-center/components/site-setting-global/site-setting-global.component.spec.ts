import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteSettingGlobalComponent } from './site-setting-global.component';

describe('SiteSettingGlobalComponent', () => {
    let component: SiteSettingGlobalComponent;
    let fixture: ComponentFixture<SiteSettingGlobalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SiteSettingGlobalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SiteSettingGlobalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
