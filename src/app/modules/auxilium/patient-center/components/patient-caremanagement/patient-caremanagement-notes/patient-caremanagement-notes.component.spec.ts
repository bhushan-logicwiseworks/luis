import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCaremanagementNotesComponent } from './patient-caremanagement-notes.component';

describe('PatientCaremanagementNotesComponent', () => {
    let component: PatientCaremanagementNotesComponent;
    let fixture: ComponentFixture<PatientCaremanagementNotesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientCaremanagementNotesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientCaremanagementNotesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
