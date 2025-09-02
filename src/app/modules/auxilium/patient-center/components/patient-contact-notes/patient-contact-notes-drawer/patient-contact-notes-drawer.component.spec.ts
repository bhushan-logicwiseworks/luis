import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientContactNotesDrawerComponent } from './patient-contact-notes-drawer.component';

describe('PatientContactNotesDrawerComponent', () => {
    let component: PatientContactNotesDrawerComponent;
    let fixture: ComponentFixture<PatientContactNotesDrawerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientContactNotesDrawerComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientContactNotesDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
