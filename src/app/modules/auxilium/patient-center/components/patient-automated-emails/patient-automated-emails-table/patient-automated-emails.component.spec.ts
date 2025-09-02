import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAutomatedEmailsComponent } from './patient-automated-emails.component';

describe('PatientAutomatedEmailsComponent', () => {
    let component: PatientAutomatedEmailsComponent;
    let fixture: ComponentFixture<PatientAutomatedEmailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientAutomatedEmailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientAutomatedEmailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
