import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientCenterTableComponent } from './patient-center-table.component';

describe('PatientCenterTableComponent', () => {
    let component: PatientCenterTableComponent;
    let fixture: ComponentFixture<PatientCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
