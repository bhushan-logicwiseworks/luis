import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPhysiciansComponent } from './patient-physicians.component';

describe('PatientPhysiciansComponent', () => {
    let component: PatientPhysiciansComponent;
    let fixture: ComponentFixture<PatientPhysiciansComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPhysiciansComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPhysiciansComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
