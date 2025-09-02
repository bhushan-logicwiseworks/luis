import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientRefundsTableComponent } from './patient-refunds-table.component';

describe('PatientRefundsTableComponent', () => {
    let component: PatientRefundsTableComponent;
    let fixture: ComponentFixture<PatientRefundsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientRefundsTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientRefundsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
