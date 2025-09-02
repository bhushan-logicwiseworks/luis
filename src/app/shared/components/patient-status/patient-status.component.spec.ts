import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientStatusComponent } from './patient-status.component';

describe('PatientStatusComponent', () => {
    let component: PatientStatusComponent;
    let fixture: ComponentFixture<PatientStatusComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientStatusComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
