import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicenseCenterComponent } from './license-center.component';

describe('LicenseCenterComponent', () => {
    let component: LicenseCenterComponent;
    let fixture: ComponentFixture<LicenseCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [LicenseCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LicenseCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
