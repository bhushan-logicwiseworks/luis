import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportingCenterComponent } from './reporting-center.component';

describe('PatientCenterComponent', () => {
    let component: ReportingCenterComponent;
    let fixture: ComponentFixture<ReportingCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ReportingCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportingCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
