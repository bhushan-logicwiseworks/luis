import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientRefundsComponent } from './patient-refunds.component';

describe('PatientRefundsComponent', () => {
    let component: PatientRefundsComponent;
    let fixture: ComponentFixture<PatientRefundsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientRefundsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientRefundsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
