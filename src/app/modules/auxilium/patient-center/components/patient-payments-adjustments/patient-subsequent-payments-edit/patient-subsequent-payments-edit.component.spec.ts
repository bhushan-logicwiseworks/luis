import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSubsequentPaymentsEditComponent } from './patient-subsequent-payments-edit.component';

describe('PatientSubsequentPaymentsEditComponent', () => {
    let component: PatientSubsequentPaymentsEditComponent;
    let fixture: ComponentFixture<PatientSubsequentPaymentsEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientSubsequentPaymentsEditComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientSubsequentPaymentsEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
