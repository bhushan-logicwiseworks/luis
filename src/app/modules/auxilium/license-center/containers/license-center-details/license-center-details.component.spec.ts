import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCenterDetailsComponent } from './license-center-details.component';

describe('LicenseCenterDetailsComponent', () => {
    let component: LicenseCenterDetailsComponent;
    let fixture: ComponentFixture<LicenseCenterDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [LicenseCenterDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(LicenseCenterDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
