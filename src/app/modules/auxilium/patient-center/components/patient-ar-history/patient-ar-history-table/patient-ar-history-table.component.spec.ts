import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientArHistoryTableComponent } from './patient-ar-history-table.component';

describe('PatientArHistoryTableComponent', () => {
    let component: PatientArHistoryTableComponent;
    let fixture: ComponentFixture<PatientArHistoryTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientArHistoryTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientArHistoryTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
