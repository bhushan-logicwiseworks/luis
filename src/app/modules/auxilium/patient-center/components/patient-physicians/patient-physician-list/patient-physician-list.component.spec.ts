import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPhysicianListComponent } from './patient-physician-list.component';

describe('PatientPhysicianListComponent', () => {
    let component: PatientPhysicianListComponent;
    let fixture: ComponentFixture<PatientPhysicianListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPhysicianListComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPhysicianListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
