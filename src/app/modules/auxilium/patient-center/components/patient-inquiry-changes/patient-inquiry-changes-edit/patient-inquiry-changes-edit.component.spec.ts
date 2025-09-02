import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInquiryChangesEditComponent } from './patient-inquiry-changes-edit.component';

describe('PatientInquiryChangesEditComponent', () => {
    let component: PatientInquiryChangesEditComponent;
    let fixture: ComponentFixture<PatientInquiryChangesEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientInquiryChangesEditComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientInquiryChangesEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
