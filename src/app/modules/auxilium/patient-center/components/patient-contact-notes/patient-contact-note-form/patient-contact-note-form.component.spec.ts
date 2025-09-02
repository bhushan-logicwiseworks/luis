import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientContactNoteFormComponent } from './patient-contact-note-form.component';

describe('PatientContactNoteFormComponent', () => {
    let component: PatientContactNoteFormComponent;
    let fixture: ComponentFixture<PatientContactNoteFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientContactNoteFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientContactNoteFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
