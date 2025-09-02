import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInQuiryChangesTableComponent } from './patient-inquiry-changes-table.component';

describe('PatientInQuiryChangesTableComponent', () => {
    let component: PatientInQuiryChangesTableComponent;
    let fixture: ComponentFixture<PatientInQuiryChangesTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientInQuiryChangesTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientInQuiryChangesTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
