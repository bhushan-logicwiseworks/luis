import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientCenterComponent } from './patient-center.component';

describe('PatientCenterComponent', () => {
    let component: PatientCenterComponent;
    let fixture: ComponentFixture<PatientCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
