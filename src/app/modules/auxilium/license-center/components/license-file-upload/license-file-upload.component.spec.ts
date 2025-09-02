import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseFileUploadComponent } from './license-file-upload.component';

describe('LicenseFileUploadComponent', () => {
    let component: LicenseFileUploadComponent;
    let fixture: ComponentFixture<LicenseFileUploadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [LicenseFileUploadComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LicenseFileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
