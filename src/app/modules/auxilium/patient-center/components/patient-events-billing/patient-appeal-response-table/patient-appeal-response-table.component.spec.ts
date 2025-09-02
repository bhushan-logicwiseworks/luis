import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientAppealResponseTableComponent } from './patient-appeal-response-table.component';

describe('PatientAppealResponseTableComponent', () => {
    let component: PatientAppealResponseTableComponent;
    let fixture: ComponentFixture<PatientAppealResponseTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientAppealResponseTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientAppealResponseTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
