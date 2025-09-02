import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEmergencyContactsTableComponent } from './patient-emergency-contacts-table.component';

describe('PatientEmergencyContactsTableComponent', () => {
    let component: PatientEmergencyContactsTableComponent;
    let fixture: ComponentFixture<PatientEmergencyContactsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientEmergencyContactsTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientEmergencyContactsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
