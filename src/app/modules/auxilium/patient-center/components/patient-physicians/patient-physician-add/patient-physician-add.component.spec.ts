import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPhysicianAddComponent } from './patient-physician-add.component';

describe('PatientPhysicianAddComponent', () => {
    let component: PatientPhysicianAddComponent;
    let fixture: ComponentFixture<PatientPhysicianAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPhysicianAddComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPhysicianAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
