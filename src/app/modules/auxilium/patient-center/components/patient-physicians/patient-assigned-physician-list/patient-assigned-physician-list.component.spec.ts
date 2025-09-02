import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAssignedPhysicianListComponent } from './patient-assigned-physician-list.component';

describe('PatientAssignedPhysicianListComponent', () => {
    let component: PatientAssignedPhysicianListComponent;
    let fixture: ComponentFixture<PatientAssignedPhysicianListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientAssignedPhysicianListComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientAssignedPhysicianListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
