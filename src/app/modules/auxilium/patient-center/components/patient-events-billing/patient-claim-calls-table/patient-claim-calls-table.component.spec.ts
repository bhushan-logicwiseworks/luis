import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientClaimCallsTableComponent } from './patient-claim-calls-table.component';

describe('PatientClaimCallsTableComponent', () => {
    let component: PatientClaimCallsTableComponent;
    let fixture: ComponentFixture<PatientClaimCallsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientClaimCallsTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientClaimCallsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
