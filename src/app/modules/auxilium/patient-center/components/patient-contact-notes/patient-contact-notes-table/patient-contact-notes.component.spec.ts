import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientContactNotesComponent } from './patient-contact-notes.component';

describe('PatientContactNotesComponent', () => {
    let component: PatientContactNotesComponent;
    let fixture: ComponentFixture<PatientContactNotesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
    imports: [PatientContactNotesComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientContactNotesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
