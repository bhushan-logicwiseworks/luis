import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCaremanagementTableComponent } from './patient-caremanagement-table.component';

describe('PatientCaremanagementTableComponent', () => {
    let component: PatientCaremanagementTableComponent;
    let fixture: ComponentFixture<PatientCaremanagementTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientCaremanagementTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientCaremanagementTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
