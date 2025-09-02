import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPrefilledEditableSwoComponent } from './patient-prefilled-editable-swo.component';

describe('PatientPrefilledEditableSwoComponent', () => {
    let component: PatientPrefilledEditableSwoComponent;
    let fixture: ComponentFixture<PatientPrefilledEditableSwoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientPrefilledEditableSwoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientPrefilledEditableSwoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
