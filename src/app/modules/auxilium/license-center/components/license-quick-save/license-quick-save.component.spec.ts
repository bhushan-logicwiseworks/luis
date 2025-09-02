import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseQuickSaveComponent } from './license-quick-save.component';

describe('LicenseQuickSaveComponent', () => {
    let component: LicenseQuickSaveComponent;
    let fixture: ComponentFixture<LicenseQuickSaveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [LicenseQuickSaveComponent],
}).compileComponents();

        fixture = TestBed.createComponent(LicenseQuickSaveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
