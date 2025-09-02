import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCallsAddComponent } from './patient-calls-add.component';

describe('PatientCallsAddComponent', () => {
    let component: PatientCallsAddComponent;
    let fixture: ComponentFixture<PatientCallsAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientCallsAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientCallsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
