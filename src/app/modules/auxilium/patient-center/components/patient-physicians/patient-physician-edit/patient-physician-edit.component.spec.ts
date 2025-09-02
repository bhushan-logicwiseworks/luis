import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPhysicianEditComponent } from './patient-physician-edit.component';

describe('PatientPhysicianEditComponent', () => {
    let component: PatientPhysicianEditComponent;
    let fixture: ComponentFixture<PatientPhysicianEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPhysicianEditComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPhysicianEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
