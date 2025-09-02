import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseFileDetailComponent } from './license-file-detail.component';

describe('LicenseFileDetailComponent', () => {
    let component: LicenseFileDetailComponent;
    let fixture: ComponentFixture<LicenseFileDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [LicenseFileDetailComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LicenseFileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
