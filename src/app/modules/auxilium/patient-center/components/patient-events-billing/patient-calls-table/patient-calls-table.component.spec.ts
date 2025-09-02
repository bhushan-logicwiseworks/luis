import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientCallsTableComponent } from './patient-calls-table.component';

describe('PatientCallsTableComponent', () => {
    let component: PatientCallsTableComponent;
    let fixture: ComponentFixture<PatientCallsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientCallsTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientCallsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
