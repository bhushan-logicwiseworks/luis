import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientGroupEditInquiryChangesComponent } from './patient-group-edit-inquiry-changes.component';

describe('PatientGroupEditInquiryChangesComponent', () => {
    let component: PatientGroupEditInquiryChangesComponent;
    let fixture: ComponentFixture<PatientGroupEditInquiryChangesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientGroupEditInquiryChangesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientGroupEditInquiryChangesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
