import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCaremanagementAddRequestComponent } from './patient-caremanagement-add-request.component';

describe('PatientCaremanagementAddRequestComponent', () => {
    let component: PatientCaremanagementAddRequestComponent;
    let fixture: ComponentFixture<PatientCaremanagementAddRequestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientCaremanagementAddRequestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientCaremanagementAddRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
