import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportingCenterTableComponent } from './reporting-center-table.component';

describe('PatientCenterTableComponent', () => {
    let component: ReportingCenterTableComponent;
    let fixture: ComponentFixture<ReportingCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ReportingCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportingCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
