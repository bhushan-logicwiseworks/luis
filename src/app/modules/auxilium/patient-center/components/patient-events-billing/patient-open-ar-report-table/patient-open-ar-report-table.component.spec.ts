import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientOpenArReportTableComponent } from './patient-open-ar-report-table.component';

describe('PatientOpenArReportTableComponent', () => {
    let component: PatientOpenArReportTableComponent;
    let fixture: ComponentFixture<PatientOpenArReportTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientOpenArReportTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientOpenArReportTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
