import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRefundsAddComponent } from './patient-refunds-add.component';

describe('PatientRefundsAddComponent', () => {
    let component: PatientRefundsAddComponent;
    let fixture: ComponentFixture<PatientRefundsAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientRefundsAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientRefundsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
